import { shuffleArray } from '@/lib/utils/arrayUtils';
import { QuestionItem, QuestionItemKind } from '@/lib/types/curriculum/Curriculum';
import { getQuestionReadTimeConfig } from '@/lib/content';

export type QuizPhaseType = 'q-only' | 'q-and-a' | 'answered';

export interface QuizState {
  currentPhase: QuizPhaseType;
  processedQuestions: QuestionItem[];
  totalNumQuestions: number;
  currentQIndex: number;
  currentQuestion: QuestionItem | null;
  isLastQuestion: boolean;
  selectedAnswer: number[] | null;
  showFeedback: boolean;
  isCorrect: boolean;
  showContinuePrompt: boolean;
  questionReadTime: number; // Duration (ms) to read show q-only phase

  // For Multi-select questions
  isMultiSelect: boolean;
  isComplete: boolean;
  selectedCount: number;
  requiredCount: number;
}

/**
 * Process all questions in a question bank (and shuffle question order)
 */
export const processQuestionBank = (questions: QuestionItem[]): QuestionItem[] => {
  let questionsProcessed = questions.map(processQuestion);
  return shuffleArray(questionsProcessed);
};

/**
 * Process a single question (shuffle the wrong options and correct options)
 */
const processQuestion = (questionItem: QuestionItem): QuestionItem => {
  const { kind, choices, correctAnswerIndex } = questionItem;

  // Return true/false questions as they are
  if (kind === 'trueFalse') {
    return questionItem;
  }

  // For singleSelect = 4 options and multiSelect = 5 options
  const optionsLimit = kind === 'singleSelect' ? 4 : 5;

  // Get the correct choices text (as array)
  const correctChoices = correctAnswerIndex.map((index) => choices[index]);

  // Get all incorrect choices text (by removing the correct ones)
  const incorrectChoices = choices.filter((_, index) => !correctAnswerIndex.includes(index));

  // Random shuffle incorrect choices and limit to the number of options
  const shuffledIncorrect = shuffleArray(incorrectChoices);
  const neededIncorrect = optionsLimit - correctChoices.length;
  const selectedIncorrect = shuffledIncorrect.slice(0, neededIncorrect);

  // Combine correct & incorrect and shuffle
  const allOptions = [...correctChoices, ...selectedIncorrect];
  const shuffledOptions = shuffleArray(allOptions);

  // Find where each correct choice now appears in the shuffled options
  const newCorrectIndexes = correctChoices.map((originalChoice) => {
    return shuffledOptions.findIndex((option) => option === originalChoice);
  });

  return {
    ...questionItem,
    choices: shuffledOptions,
    correctAnswerIndex: newCorrectIndexes,
  };
};

/**
 * Calculate question-specific properties for a given question
 */
const getQuestionProperties = (
  question: QuestionItem,
  index: number,
  totalNumQuestions: number
) => ({
  currentQuestion: question,
  isLastQuestion: isLastQuestion(index, totalNumQuestions),
  isMultiSelect: question.kind === 'multiSelect',
  requiredCount: getNumOfPossibleCorrectAnswers(question),
  questionReadTime: calcQuestionReadTime(question.question),
});

/**
 * Get a quiz state ready for a given question index
 */
export const getQuizStateReadyByQIndex = (
  processedQuestions: QuestionItem[],
  index: number
): QuizState => {
  const question = processedQuestions[index];
  const questionProps = getQuestionProperties(question, index, processedQuestions.length);

  return {
    currentPhase: 'q-only' as QuizPhaseType,
    currentQIndex: index,
    selectedAnswer: null,
    showFeedback: false,
    isCorrect: false,
    processedQuestions: processedQuestions,
    showContinuePrompt: false,
    isComplete: false,
    selectedCount: 0,
    totalNumQuestions: processedQuestions.length,
    ...questionProps,
  };
};

/**
 * Update quiz state for answer selection (for single, truefalse and multi select questions)
 */
export const selectAnswer = (state: QuizState, selectedIndex: number): Partial<QuizState> => {
  const currentQuestion = state.currentQuestion;
  if (!currentQuestion) return {};

  if (currentQuestion.kind === 'multiSelect') {
    // Get current selected answers (empty array if null)
    const currentSelected = state.selectedAnswer || [];
    const maxSelections = currentQuestion.correctAnswerIndex.length;

    // If already at max selections, prevent any further interaction
    if (currentSelected.length >= maxSelections) {
      return {}; // No state change - user must tap to continue
    }

    const newSelectedAnswers = currentSelected.includes(selectedIndex)
      ? currentSelected.filter((index) => index !== selectedIndex)
      : [...currentSelected, selectedIndex];

    const isComplete = newSelectedAnswers.length === currentQuestion.correctAnswerIndex.length;
    const isCorrect =
      isComplete &&
      newSelectedAnswers.every((index) => currentQuestion.correctAnswerIndex.includes(index));

    return {
      selectedAnswer: newSelectedAnswers,
      isCorrect,
      showFeedback: isComplete, // Only show feedback when multi-select is complete
      currentPhase: (isComplete ? 'answered' : 'q-and-a') as QuizPhaseType,
      showContinuePrompt: isComplete,
      selectedCount: newSelectedAnswers.length,
    };
  } else {
    // Single select or true/false - store as single-element array
    const isCorrect = checkAnswer(selectedIndex, currentQuestion.correctAnswerIndex);
    return {
      currentPhase: 'answered' as QuizPhaseType,
      selectedAnswer: [selectedIndex],
      isCorrect,
      showFeedback: true,
      showContinuePrompt: true,
    };
  }
};

/**
 * Reset feedback state
 */
export const resetFeedback = (): Partial<QuizState> => {
  return {
    currentPhase: 'q-only' as QuizPhaseType,
    selectedAnswer: null,
    showFeedback: false,
    isCorrect: false,
    showContinuePrompt: false,
  };
};

/**
 * Update timing for new question
 */
export const updateQuestionTiming = (state: QuizState): Partial<QuizState> => {
  if (!state.currentQuestion) return {};

  return {
    questionReadTime: calcQuestionReadTime(state.currentQuestion.question),
  };
};

/**
 * Move to next question
 */
export const moveToNextQuestion = (state: QuizState): Partial<QuizState> => {
  if (isLastQuestion(state.currentQIndex, state.processedQuestions.length)) {
    return {};
  }

  const newIndex = state.currentQIndex + 1;
  const newQuestion = state.processedQuestions[newIndex];

  return {
    currentQIndex: newIndex,
    ...getQuestionProperties(newQuestion, newIndex, state.processedQuestions.length),
  };
};

/**
 * Check if an answer is correct
 */
export const checkAnswer = (selectedIndex: number, correctAnswerIndexes: number[]): boolean => {
  return correctAnswerIndexes.includes(selectedIndex);
};

/**
 * Get the current question from processed questions
 */
export const getCurrentQuestion = (
  processedQuestions: QuestionItem[],
  currentIndex: number
): QuestionItem | null => {
  return processedQuestions[currentIndex] || null;
};

export const isLastQuestion = (currentIndex: number, totalNumQuestions: number): boolean => {
  return currentIndex >= totalNumQuestions - 1;
};

const getNumOfPossibleCorrectAnswers = (question: QuestionItem): number => {
  return question.correctAnswerIndex.length;
};

/**
 * Calculate reading time based on question length
 */
export const calcQuestionReadTime = (question: string): number => {
  const charCount = question.length;
  const config = getQuestionReadTimeConfig();

  return (
    config.baseTime + Math.floor(charCount / config.charactersPerIncrement) * config.incrementTime
  );
};

// TODO: Replace with actual questions from the chapter
// Fake questions (just for now)
export const FAKE_QUESTION_BANK: QuestionItem[] = [
  {
    kind: 'singleSelect' as QuestionItemKind,
    question: 'What Order do rabbits belong to?',
    choices: [
      'Rodentia',
      'Lagomorpha',
      'Artiodactyla',
      'Perissodactyla',
      'Carnivora',
      'Primates',
      'Cetacea',
      'Marsupialia',
    ],
    correctAnswerIndex: [1],
    hint: 'Consider their unique dental structure and digestive system.',
    explanation:
      'Rabbits are classified under the Order Lagomorpha, distinct from Rodentia due to specific anatomical features, notably their two pairs of upper incisors.',
  },
  {
    kind: 'singleSelect' as QuestionItemKind,
    question: 'What is the largest planet in our solar system?',
    choices: ['Earth', 'Saturn', 'Jupiter', 'Neptune', 'Uranus', 'Venus', 'Mars', 'Mercury'],
    correctAnswerIndex: [2],
    hint: 'Think about which planet has the most mass and volume.',
    explanation:
      'Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined and a volume that could contain over 1,300 Earths.',
  },
  {
    kind: 'singleSelect' as QuestionItemKind,
    question: 'Who painted the Mona Lisa?',
    choices: [
      'Vincent van Gogh',
      'Pablo Picasso',
      'Leonardo da Vinci',
      'Michelangelo',
      'Raphael',
      'Donatello',
      'Titian',
      'Caravaggio',
    ],
    correctAnswerIndex: [2],
    hint: 'This Renaissance master was known for his scientific studies and inventions.',
    explanation:
      'Leonardo da Vinci painted the Mona Lisa between 1503-1519 during the Italian Renaissance. It is considered one of the most famous paintings in the world.',
  },
  {
    kind: 'singleSelect' as QuestionItemKind,
    question: 'What is the chemical symbol for gold?',
    choices: ['Go', 'Gd', 'Au', 'Ag', 'Al', 'As', 'At', 'Ar'],
    correctAnswerIndex: [2],
    hint: 'The symbol comes from the Latin word for gold.',
    explanation:
      'The chemical symbol for gold is Au, derived from the Latin word "aurum" meaning gold. Gold is a precious metal with atomic number 79.',
  },
  {
    kind: 'singleSelect' as QuestionItemKind,
    question: 'Which programming language was created by Brendan Eich?',
    choices: ['Python', 'Java', 'JavaScript', 'C++', 'C#', 'Ruby', 'PHP', 'Swift'],
    correctAnswerIndex: [2],
    hint: 'This language was originally created in just 10 days for web browsers.',
    explanation:
      'Brendan Eich created JavaScript in 1995 while working at Netscape. It was originally called Mocha, then LiveScript, before being renamed to JavaScript.',
  },
  {
    kind: 'multiSelect' as QuestionItemKind,
    question: 'Which of the following are primary colours?',
    choices: ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'Black', 'White'],
    correctAnswerIndex: [0, 1, 2],
    hint: 'Primary colours cannot be created by mixing other colours.',
    explanation:
      'Red, Blue, and Yellow are the primary colours in traditional colour theory. All other colours can be created by mixing these three.',
  },
  {
    kind: 'multiSelect' as QuestionItemKind,
    question: 'Which of the following are mammals?',
    choices: ['Dolphin', 'Shark', 'Whale', 'Eagle', 'Bat', 'Penguin', 'Platypus', 'Snake'],
    correctAnswerIndex: [0, 2, 4, 6],
    hint: 'Mammals are warm-blooded vertebrates that have hair or fur and produce milk.',
    explanation:
      'Dolphins, Whales, Bats, and Platypuses are all mammals. Sharks and snakes are not mammals, and while penguins and eagles are warm-blooded, they are birds, not mammals.',
  },
  {
    kind: 'trueFalse' as QuestionItemKind,
    question: 'The Great Wall of China is visible from space with the naked eye.',
    choices: ['True', 'False'],
    correctAnswerIndex: [1],
    hint: 'This is a common myth. The Great Wall is not visible from space without magnification.',
    explanation:
      'False. The Great Wall of China is not visible from space with the naked eye. This is a common misconception. While it is a massive structure, it is not wide enough to be seen from low Earth orbit without magnification.',
  },
  {
    kind: 'trueFalse' as QuestionItemKind,
    question: 'Sharks are mammals.',
    choices: ['True', 'False'],
    correctAnswerIndex: [1],
    hint: 'Sharks are fish, not mammals. They breathe through gills.',
    explanation:
      'False. Sharks are fish, not mammals. They breathe through gills, have scales, and are cold-blooded. Mammals are warm-blooded, have hair or fur, and breathe through lungs.',
  },
  {
    kind: 'trueFalse' as QuestionItemKind,
    question: "The human brain uses approximately 20% of the body's energy.",
    choices: ['True', 'False'],
    correctAnswerIndex: [0],
    hint: 'The brain is very energy-intensive despite being only about 2% of body weight.',
    explanation:
      "True. The human brain uses about 20% of the body's total energy consumption, even though it only represents about 2% of the body's weight. This high energy usage is due to the constant electrical activity of neurons.",
  },
];
