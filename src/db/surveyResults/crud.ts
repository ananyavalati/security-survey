
import type { SupabaseClient, PostgrestError, AuthError } from "@supabase/supabase-js";

export type SurveyResultRow = {
  id: string;
  created_at: string;
  user_id: string;
  overall_score: number | null;
  phishing_awareness: number | null;
  basic_hygiene: number | null;
};

export type NewSurveyResult = {
  overall_score: number;
  phishing_awareness: number;
  basic_hygiene: number;
};

export async function saveSurveyResult(
  client: SupabaseClient,
  surveyResult: NewSurveyResult
): Promise<SurveyResultRow | null> {
  const { data, error } = await client
    .from("survey_results")
    .insert([surveyResult])
    .select()
    .single();
  if (error) return null;
  return data as SurveyResultRow;
}

export type ListOpts = {
  startDate?: string; 
  endDate?: string;   
};


export async function listSurveyResults(
  client: SupabaseClient,
  opts: ListOpts = {}
): Promise<{ rows: SurveyResultRow[]; error: PostgrestError | AuthError | null }> {
  const { data: userData, error: userErr } = await client.auth.getUser();
  if (userErr || !userData?.user) {
    return { rows: [], error: userErr ?? (new Error("No user") as PostgrestError) };
  }

  let q = client
    .from("survey_results")
    .select("id, created_at, user_id, overall_score, phishing_awareness, basic_hygiene")
    .eq("user_id", userData.user.id);

  if (opts.startDate) q = q.gte("created_at", opts.startDate);
  if (opts.endDate)   q = q.lte("created_at", opts.endDate);

  q = q.order("created_at", { ascending: true });

  const { data, error } = await q;
  return { rows: (data as SurveyResultRow[]) ?? [], error };
}