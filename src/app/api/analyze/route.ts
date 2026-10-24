import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { runCareerAnalysis } from "@/lib/huggingface";
import { AnalysisRequestSchema } from "@/types/career";
import { z } from "zod";

export const maxDuration = 90; // Allow up to 90 seconds for AI inference

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let department: string | null = null;
    let semester: string | number | null = null;
    let graduationYear: string | undefined = undefined;
    let careerLevel: string | undefined = undefined;
    let targetRole: string | null = null;
    let market: string | undefined = undefined;
    let weeklyHours: string | number | undefined = undefined;
    let learningStyle: string | undefined = undefined;
    let resumeText = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      department = formData.get("department") as string | null;
      semester = formData.get("semester") as string | null;
      graduationYear = (formData.get("graduationYear") as string) || undefined;
      careerLevel = (formData.get("careerLevel") as string) || undefined;
      targetRole = formData.get("targetRole") as string | null;
      market = (formData.get("market") as string) || undefined;
      weeklyHours = (formData.get("weeklyHours") as string) || undefined;
      learningStyle = (formData.get("learningStyle") as string) || undefined;

      const file = formData.get("resumeFile") as File | null;
      const textParam = formData.get("resumeText") as string | null;

      if (file && file.size > 0) {
        // Validate MIME type
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
          return NextResponse.json(
            { error: "Only PDF resumes are supported. Please upload a .pdf file." },
            { status: 400 }
          );
        }

        // Validate size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: "The resume PDF exceeds the 5MB size limit. Please upload a smaller file." },
            { status: 413 }
          );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const extraction = await extractTextFromPDF(buffer);
        resumeText = extraction.text;
      } else if (textParam && textParam.trim().length > 0) {
        resumeText = textParam.trim();
      } else {
        return NextResponse.json(
          { error: "Please upload a PDF resume or paste your resume text." },
          { status: 400 }
        );
      }
    } else if (contentType.includes("application/json")) {
      const json = await req.json();

      department = json.department;
      semester = json.semester;
      graduationYear = json.graduationYear;
      careerLevel = json.careerLevel;
      targetRole = json.targetRole;
      market = json.market;
      weeklyHours = json.weeklyHours;
      learningStyle = json.learningStyle;
      resumeText = json.resumeText || "";
    } else {
      return NextResponse.json(
        { error: "Unsupported Content-Type. Use multipart/form-data or application/json." },
        { status: 415 }
      );
    }

    // Validate inputs with Zod
    const validatedInput = AnalysisRequestSchema.parse({
      department,
      semester,
      graduationYear: graduationYear || undefined,
      careerLevel: careerLevel || "Entry-level",
      targetRole,
      resumeText,
      market: market || "Both",
      weeklyHours: weeklyHours ? Number(weeklyHours) : 15,
      learningStyle: learningStyle || "Mixed",
    });

    // Run live AI inference
    const analysis = await runCareerAnalysis(validatedInput);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      return NextResponse.json(
        { error: `Validation error: ${issues}`, issues: error.issues },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
