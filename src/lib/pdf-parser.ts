import { PDFParse } from "pdf-parse";

export interface PDFExtractionResult {
  text: string;
  pageCount: number;
}

export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error("The uploaded file is empty.");
  }

  // Check 5MB limit
  const MAX_SIZE = 5 * 1024 * 1024;
  if (buffer.length > MAX_SIZE) {
    throw new Error("File exceeds the maximum 5MB limit. Please upload a smaller PDF.");
  }

  let parser: PDFParse | null = null;
  try {
    const uint8Array = new Uint8Array(buffer);
    parser = new PDFParse({ data: uint8Array });
    const textResult = await parser.getText();

    const rawText = textResult.text || "";
    // Clean and normalize text
    const cleanedText = rawText
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!cleanedText || cleanedText.length < 30) {
      throw new Error(
        "Could not extract sufficient text from the PDF. It may be scanned, image-only, or empty. Please paste your resume text instead."
      );
    }

    return {
      text: cleanedText,
      pageCount: textResult.total || 1,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to parse PDF document.";
    throw new Error(message);
  } finally {
    if (parser) {
      try {
        await parser.destroy();
      } catch {
        // ignore cleanup error
      }
    }
  }
}
