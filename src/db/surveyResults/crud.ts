import type { SupabaseClient } from "@supabase/supabase-js";

export interface SurveyResult {
    overall_score: number;
    phishing_awareness: number;
    basic_hygiene: number;
}

export async function saveSurveyResult(
    client: SupabaseClient,
    surveyResult: SurveyResult
): Promise<SurveyResult | null>
 {
    const {data, error} = await client
        .from("survey_results")
        .insert([surveyResult])
        .select()
        .single();

    if (error) {
        console.error("Error saving survey result:", error);
        return null;
    }
    return data as SurveyResult;
 }