export async function detectLanguage(text: string): Promise<string> {
  const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
  const canDetect = languageDetectorCapabilities.available;

  if (canDetect === 'no') {
    // Language detection isn't usable.
    return 'en'; // Default to 'en' if detection is unavailable.
  }

  let detector;
  if (canDetect === 'readily') {
    detector = await self.ai.languageDetector.create();
  } else {
    detector = await self.ai.languageDetector.create({
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          // Removed log: console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    await detector.ready;
  }

  const results = await detector.detect(text);
  
  if (results.length > 0) {
    const detectedLanguage = results[0].detectedLanguage; // Get the most likely language
    return detectedLanguage; // Return the detected language
  }
  
  return 'en'; // Default if no language is detected.
}
  
export async function summarizeText(text: string): Promise<string> {
  const options = {
    sharedContext: 'This is a scientific article',
    type: 'key-points',
    format: 'markdown',
    length: 'medium',
  };

  const available = (await self.ai.summarizer.capabilities()).available;
  let summarizer;
  if (available === 'no') {
    // The Summarizer API isn't usable.
    return;
  }
  if (available === 'readily') {
    // The Summarizer API can be used immediately .
    summarizer = await self.ai.summarizer.create(options);
  } else {
    // The Summarizer API can be used after the model is downloaded.
    summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener('downloadprogress', (e) => {
      console.log(e.loaded, e.total);
    });
    await summarizer.ready;
  }
}
  
export async function translateText(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
  try {
    const translatorCapabilities = await self.ai.translator.capabilities();
    // Dynamically determine the source language if necessary (e.g., based on the message text or metadata)

    if (!translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage)) {
      throw new Error(`Language pair from ${sourceLanguage} to ${targetLanguage} not supported.`);
    }

    const translator = await self.ai.translator.create({
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    

    // Perform the translation
    const translatedText = await translator.translate(text);
    return translatedText; // Return the translated text
  } catch (error) {
    console.error("Error during translation:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
}
  