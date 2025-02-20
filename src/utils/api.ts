declare const self: { ai?: any };

export async function detectLanguage(text: string): Promise<string> {
  const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
  const canDetect: string = languageDetectorCapabilities.available;

  if (canDetect === 'no') {
    return 'en'; // Default to 'en' if detection is unavailable.
  }

  let detector;
  if (canDetect === 'readily') {
    detector = await self.ai.languageDetector.create();
  } else {
    detector = await self.ai.languageDetector.create({
      monitor(m: any) {
        m.addEventListener('downloadprogress', (e: any) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    await detector.ready;
  }

  const results = await detector.detect(text);
  return results.length > 0 ? results[0].detectedLanguage : 'en';
}

export async function summarizeText(
  text: string, 
  filterData: {
    selectedType: string,
    selectedLength: string,
    selectedFormat: string,
  }
): Promise<string | null> {
  const options = {
    sharedContext: 'This is a scientific article',
    type: filterData?.selectedType,
    format: filterData?.selectedFormat,
    length: filterData?.selectedLength,
  };

  try {
    // Check if summarizer is available
    const available = (await self.ai.summarizer.capabilities()).available;

    if (available === 'no') {
      return null; // Return null if summarizer isn't available
    }

    let summarizer;
    if (available === 'readily') {
      summarizer = await self.ai.summarizer.create(options);
    } else {
      summarizer = await self.ai.summarizer.create(options);
      summarizer.addEventListener('downloadprogress', (e: any) => {
        console.log(`Download Progress: ${e.loaded} / ${e.total}`);
      });
      await summarizer.ready; // Ensure the summarizer is ready before proceeding
    }

    // Perform the summarization
    const summary = await summarizer.summarize(text);

    // Add a new line before each bullet point
    const formattedSummary = summary.replace(/\*/g, '\n*');
    console.log(formattedSummary);
    
    
    return formattedSummary;
  } catch (error) {
    console.error("Error during summarization:", error);
    return null; // Return null on error
  }
}


export async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> {
  try {
    const translatorCapabilities = await self.ai.translator.capabilities();

    // Ensure `languagePairAvailable` is properly awaited if it's a function
    if (typeof translatorCapabilities.languagePairAvailable === 'function') {
      const isAvailable = await translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage);
      if (!isAvailable) {
        throw new Error(`Language pair from ${sourceLanguage} to ${targetLanguage} not supported.`);
      }
    }

    const translator = await self.ai.translator.create({
      sourceLanguage,
      targetLanguage,
      monitor(m: any) {
        m.addEventListener('downloadprogress', (e: any) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });

    return await translator.translate(text);
  } catch (error) {
    console.error("Error during translation:", error);
    throw error;
  }
}

  