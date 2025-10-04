import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useAppStore } from '@/lib/state/appStore';
import { capitaliseWord, unslugify } from '@/lib/utils/textUtils';
import Heading from '@/components/typography/Heading';
import {
  getContentRegistry,
  getDomain,
  getArrayOfEnvironmentIds,
  getCurriculumGenConfigByLevel,
} from '@/lib/content';
import { ValidationResponse } from '@/lib/ai/subjectValidation';
import { Domain } from '@/lib/types/content/ContentTypes';
import { Subject, Story, Chapter, QuizChunk } from '@/lib/types/curriculum/Curriculum';
import {
  createStoryWithId,
  createSubjectWithId,
  getSubjectById,
  updateSubjectDocById,
  createMultipleChaptersWithIds,
  createMultipleQuizChunksWithIds,
  checkSubjectExists,
} from '@/services/curriculumServices';
import { Timestamp } from 'firebase/firestore';
import {
  buildChapterId,
  buildQuizChunkId,
  buildStoryId,
  buildSubjectId,
} from '@/lib/utils/curriculumUtils';
import { generateStoryContent } from '@/services/aiGenService';
import { StoryGenerationResponse } from '@/lib/ai/newStoryGeneration';
import { shuffleArray } from '@/lib/utils/arrayUtils';

const LoadingAiGenScreen = () => {
  const backgroundTexture = require('@/assets/textures/chainmail_grey.png');
  const { userDoc } = useAppStore();

  // Parameters from storyOptions, moreStoryOptions or subjectLevelsExists
  const params = useLocalSearchParams();
  const chosenSubject = JSON.parse(params.selectedSubject as string) as NonNullable<
    ValidationResponse['subjectOptions']
  >[0];
  const chosenLevel = params.selectedLevel as AudienceLevel;

  const [isGenerating, setIsGenerating] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = useMemo(
    () => [
      'Crafting your educational tale',
      'Summoning quiz questions from the void',
      'Weaving knowledge into adventure',
      'Consulting ancient scrolls of wisdom',
      'Polishing your story to perfection',
      'Ensuring every question teaches something new',
    ],
    []
  );

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        return (prev + 1) % loadingMessages.length;
      });
    }, 3000); // 3 seconds per message

    //

    const performNewCurriculumGen = async () => {
      try {
        let validDomain: Domain;
        let subjectForStoryGen: Subject | null = null;
        let createdStory: Story | null = null;
        let createdChapters: Chapter[] = [];
        let chapter1QuizChunks: QuizChunk[] = [];

        // Environment (themes) array for chapter creation (shuffled for randomness)
        const shuffledEnvironmentArray = shuffleArray(getArrayOfEnvironmentIds());

        // Check if domain is valid
        try {
          validDomain = getDomain(chosenSubject.domainId) as Domain;
        } catch (error) {
          console.error(`Couldn't find domain: ${chosenSubject.domainId}`, error);
          return;
        }

        // Check if subject exists
        const subjectExists = await checkSubjectExists(chosenSubject.subjectId);
        console.log('Subject exists:', subjectExists);

        if (subjectExists) {
          // Subject exists, get it and update
          try {
            subjectForStoryGen = await getSubjectById(chosenSubject.subjectId);
            console.log('Subject found:', subjectForStoryGen);

            // Add chosenLevel to levelsAvailable (only if not already present)
            const currentLevels = subjectForStoryGen.levelsAvailable || [];
            const updatedLevels = currentLevels.includes(chosenLevel)
              ? currentLevels
              : [...currentLevels, chosenLevel];

            await updateSubjectDocById(chosenSubject.subjectId, {
              levelsAvailable: updatedLevels,
              latestStoryUpdatedAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
          } catch (error) {
            console.error('Error updating existing subject:', error);
            return;
          }
        } else {
          // If subject doesn't exist, create it
          try {
            console.log('Creating new subject for:', chosenSubject);
            // Setup subject for creation
            const tempSubject: Subject = {
              domainId: validDomain.id,
              title: unslugify(chosenSubject.slug),
              titleLower: unslugify(chosenSubject.slug).toLowerCase(),
              slug: chosenSubject.slug,
              description: chosenSubject.description,
              levelsAvailable: [chosenLevel],
              latestStoryUpdatedAt: Timestamp.now(),
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            };

            subjectForStoryGen = await createSubjectWithId(
              tempSubject,
              buildSubjectId(validDomain.id, chosenSubject.slug)
            );
            console.log('Subject created successfully:', subjectForStoryGen);
          } catch (error) {
            console.error(`Couldn't create subject: ${chosenSubject.subjectId}`, error);
            return;
          }
        }

        // Generate the AI data for story, chapter and quiz chunks
        let aiGenData: StoryGenerationResponse | null = null;
        try {
          aiGenData = await generateStoryContent(subjectForStoryGen, chosenLevel);
        } catch (error) {
          console.error(`Couldn't generate story: ${chosenSubject.subjectId}`, error);
          return;
        }

        // If ai data gen successful
        if (aiGenData && subjectForStoryGen.subjectId && userDoc) {
          // Create the story
          try {
            // Calculate total question count for all chapters
            const questionsPerChunk =
              getCurriculumGenConfigByLevel(chosenLevel).questionsPerQuizChunk;
            let totalQuestionCount = 0;
            for (const chapter of aiGenData.chapters) {
              totalQuestionCount += chapter.chunkCount * questionsPerChunk;
            }

            const tempStory: Story = {
              subjectId: subjectForStoryGen.subjectId,
              subjectTitle: subjectForStoryGen.title,
              description: aiGenData.story.description,
              level: chosenLevel,
              source: 'gen',
              authorUid: userDoc.uid,
              chapterCount: aiGenData.chapters.length,
              questionCount: totalQuestionCount,
              isGenComplete: false,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            };

            createdStory = await createStoryWithId(
              tempStory,
              buildStoryId(subjectForStoryGen.subjectId, chosenLevel, 'gen')
            );
          } catch (error) {
            console.error(`Couldn't create story: ${chosenSubject.subjectId}`, error);
            return;
          }

          if (!createdStory || !createdStory.storyId) {
            console.error(`Created story is null or has no storyId`);
            return;
          }

          // Create the chapters
          let chapsToCreate: Chapter[] = [];
          let chapIdsToCreate: string[] = [];
          for (const [index, aiChapter] of aiGenData.chapters.entries()) {
            // Cycle through environment array if there are more chapters than environments
            const environmentIndex = index % shuffledEnvironmentArray.length;

            // Calculate question count based on chunkCount and questions per chunk
            const questionsPerChunk =
              getCurriculumGenConfigByLevel(chosenLevel).questionsPerQuizChunk;
            const questionCount = aiChapter.chunkCount * questionsPerChunk;

            const tempChapter: Chapter = {
              storyId: createdStory.storyId,
              title: aiChapter.title,
              description: aiChapter.description,
              seq: index + 1, // Start at 1
              environmentId: shuffledEnvironmentArray[environmentIndex],
              questionCount,
              chunkCount: aiChapter.chunkCount,
              isGenComplete: index === 0, // Only first chapter is complete (index of 0 = 0 is true)
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            };

            chapsToCreate.push(tempChapter);
            chapIdsToCreate.push(buildChapterId(createdStory.storyId, index + 1));
          }
          try {
            createdChapters = await createMultipleChaptersWithIds(chapsToCreate, chapIdsToCreate);
          } catch (error) {
            console.error(`Couldn't create chapters: ${chosenSubject.subjectId}`, error);
            return;
          }

          // Create the quiz chunks (for first chapter only)
          let quizChunksToCreate: QuizChunk[] = [];
          let quizChunkIdsToCreate: string[] = [];

          // Only create quiz chunks if we have the first chapter and quiz chunks data
          if (createdChapters[0]?.chapterId && aiGenData.firstChapterQuizChunks.length > 0) {
            for (const [index, aiQuizChunk] of aiGenData.firstChapterQuizChunks.entries()) {
              const tempQuizChunk: QuizChunk = {
                chapterId: createdChapters[0].chapterId,
                chunkSeqNum: index + 1,
                items: aiQuizChunk.items,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              };

              quizChunksToCreate.push(tempQuizChunk);
              quizChunkIdsToCreate.push(buildQuizChunkId(createdChapters[0].chapterId, index + 1));
            }
          }

          // Only create quiz chunks if successfully combined
          if (quizChunksToCreate.length > 0) {
            try {
              chapter1QuizChunks = await createMultipleQuizChunksWithIds(
                quizChunksToCreate,
                quizChunkIdsToCreate
              );
            } catch (error) {
              console.error(`Couldn't create quiz chunks: ${chosenSubject.subjectId}`, error);
              return;
            }
          } else {
            console.log('Something went wrong with combing the quiz chunks for creation');
            chapter1QuizChunks = [];
          }
        } else {
          console.error(
            `AiGenData / subjectForStoryGen.subjectId is null or user is not logged in`
          );
          return;
        }

        clearInterval(messageInterval);
        setIsGenerating(false);

        // Navigate to success screen
        console.log(' All created successfully, navigating to success screen');

        console.log('Created Story:', createdStory);
        console.log('Created Chapters:', createdChapters);
        console.log('Chapter 1 Quiz Chunks:', chapter1QuizChunks);

        router.replace({
          pathname: '/(app)/(story-creation)/storyCreateSuccess' as any,
          params: {
            story: JSON.stringify(createdStory),
            subject: JSON.stringify(subjectForStoryGen),
          },
        });
      } catch (error) {
        console.log(`Generation failed: ${(error as Error).message}`);
        clearInterval(messageInterval);
        setIsGenerating(false);

        router.back();
      }
    };

    // Start generation after a short delay
    const generationTimeout = setTimeout(performNewCurriculumGen, 500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(generationTimeout);
    };
  }, []);

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1 items-center justify-center">
        <View className="mb-8 items-center">
          {/* TODO: Possibly get a sprite asset of a crafting NPC / fun animations */}
          <PlayerSprite
            key={userDoc?.equipped?.characterId}
            variantId={userDoc?.equipped?.characterId ?? 'heavyKnight_blue'}
            defaultAnimation="walk"
            autoPlay={true}
            size={250}
            styles={{
              marginBottom: 16,
            }}
          />
          <Heading>Crafting Your Story</Heading>
          <Text className="text-center font-pixelify text-lg text-gray-300">
            {unslugify(chosenSubject.slug)} • {capitaliseWord(chosenLevel)} Level
          </Text>
        </View>

        <View className="h-32 items-center">
          <View className="flex-row items-center rounded-lg bg-zinc-800/50 p-4">
            <Text className="text-center font-pixelify text-lg text-white">
              {loadingMessages[currentMessageIndex]}
            </Text>
          </View>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LoadingAiGenScreen;
