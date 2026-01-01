import { GoogleGenAI } from "@google/genai";

// Initialize the client
// IMPORTANT: process.env.API_KEY is handled by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// For Create Post (Caption rewriting)
export const generateVibeCheck = async (inputText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a trendy social media assistant for Gen Z. 
      The user will give you a raw thought or sentence. 
      Rewrite it into a cool, engaging social media caption (Turkish language).
      Add relevant emojis and 3 trending hashtags.
      Keep it short, punchy, and modern. 
      
      User input: "${inputText}"`,
      config: {
        temperature: 0.9,
      }
    });

    return response.text || "Vibe oluşturulamadı, tekrar dene ✨";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Şu an bağlantıda sorun var, birazdan tekrar dene 🔌";
  }
};

// For Spark View (General Assistant)
export const askVibraAI = async (inputText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sen "Vibra AI" adında, gençlere hitap eden, çok havalı, esprili ve yardımsever bir yapay zeka asistanısın.
      
      Kullanıcı sana sorular soracak veya tavsiye isteyecek.
      Cevapların kısa, öz ve samimi olsun. 
      Robot gibi konuşma, bir arkadaş ("kanka") gibi konuş.
      Emojileri bol kullan.
      
      Kullanıcı Girdisi: "${inputText}"`,
      config: {
        temperature: 0.8,
      }
    });

    return response.text || "Şu an evrenle bağlantım koptu, tekrar dener misin? 🌌";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Bağlantı hatası... Enerjim düşük. 🔋";
  }
};