// AI Validation Service
// Handles subject normalization, soft matching, existence checking, and AI validation

import { AudienceLevel } from '@/lib/types/general/General';
import { getValidationPrompt } from '@/lib/ai/subjectValidation';
import { ValidationResponse } from '@/lib/ai/subjectValidation';
import { createValidationModel } from '@/lib/ai/subjectValidation';
import { getSubjectsDocIds } from './curriculumServices';

// Validate Subject
export const validateSubject = async (
  subject: string,
  level: AudienceLevel
): Promise<ValidationResponse> => {
  try {
    // Get stored subject doc ids (for existence check in prompt)
    const storedSubjectDocIds = await getSubjectsDocIds();
    try {
      const model = createValidationModel();
      const prompt = getValidationPrompt(subject, level, storedSubjectDocIds);

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const response = JSON.parse(responseText) as ValidationResponse;

      return response;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
