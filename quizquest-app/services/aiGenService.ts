// AI Generation Service

import { AudienceLevel } from '@/lib/types/general/General';
import { Subject } from '@/lib/types/curriculum/Curriculum';
import {
  createNewStoryGenerationModel,
  getNewStoryGenPrompt,
  StoryGenerationResponse,
} from '@/lib/ai/newStoryGeneration';

/**
 * Generate new story curriculum  using AI
 */
export const generateStoryContent = async (
  subject: Subject,
  level: AudienceLevel
): Promise<StoryGenerationResponse> => {
  try {
    const model = createNewStoryGenerationModel();
    const prompt = getNewStoryGenPrompt(subject, level);

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const response = JSON.parse(responseText) as StoryGenerationResponse;

    return response;
  } catch (error) {
    console.error('Error in story generation:', error);
    throw error;
  }
};
