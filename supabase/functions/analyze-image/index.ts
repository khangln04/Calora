import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const PROMPT = `Bạn là chuyên gia dinh dưỡng. Phân tích ảnh này và trả về JSON.

Nếu là ĐỒ ĂN:
- Tên món ăn (tiếng Việt)
- Calo ước tính (kcal)
- Protein (gram), Carb (gram), Fat (gram)
- Sai số ước tính (%)
- Nhận xét ngắn 1-2 câu

Nếu là BÀI TẬP / DỤNG CỤ TẬP:
- Tên bài tập hoặc mô tả thiết bị
- Calo đốt ước tính dựa trên người 70kg (kcal)
- Sai số (%)
- Nhận xét ngắn

Chỉ trả về JSON, không giải thích thêm:
{
  "type": "food" | "workout",
  "name": "...",
  "kcal": 000,
  "protein_g": 00,
  "carb_g": 00,
  "fat_g": 00,
  "confidence": 00,
  "note": "..."
}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { image_url, description } = await req.json();

    if (!image_url) {
      return new Response(JSON.stringify({ error: "image_url is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch image and convert to base64
    const imageResponse = await fetch(image_url);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = btoa(
      String.fromCharCode(...new Uint8Array(imageBuffer))
    );
    const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";

    // Build prompt with optional description
    let finalPrompt = PROMPT;
    if (description) {
      finalPrompt += `\n\nThêm thông tin từ user: "${description}"`;
    }

    // Call Gemini
    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: finalPrompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Image,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 512,
        },
      }),
    });

    const geminiData = await geminiResponse.json();

    // Extract text from Gemini response
    const text =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Parse JSON from response (strip markdown code fences if present)
    const jsonStr = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(jsonStr);

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message ?? "Analysis failed" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
