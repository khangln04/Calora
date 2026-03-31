import { supabase } from "./supabase";

export interface AIAnalysisResult {
  type: "food" | "workout";
  name: string;
  kcal: number;
  protein_g: number;
  carb_g: number;
  fat_g: number;
  confidence: number;
  note: string;
}

export async function analyzeImage(
  imageUrl: string,
  description?: string
): Promise<AIAnalysisResult> {
  const { data, error } = await supabase.functions.invoke("analyze-image", {
    body: { image_url: imageUrl, description: description ?? "" },
  });

  if (error) throw new Error(error.message ?? "AI analysis failed");

  return data as AIAnalysisResult;
}

export async function uploadPostImage(
  userId: string,
  uri: string
): Promise<string> {
  const fileName = `${userId}/${Date.now()}.jpg`;
  const response = await fetch(uri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from("post-images")
    .upload(fileName, blob, { contentType: "image/jpeg" });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
