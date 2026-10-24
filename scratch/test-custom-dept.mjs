import { extractAndParseJSON } from "../src/lib/huggingface.ts";
import { AnalysisResultSchema, AnalysisRequestSchema } from "../src/types/career.ts";
import { extractTextFromPDF } from "../src/lib/pdf-parser.ts";
import { DEMO_PROFILES } from "../src/lib/demo-data.ts";

async function runTests() {
  console.log("=== RUNNING SKILLPATH AI VERIFICATION TESTS ===");
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // TEST 1: Schema Validation on all DEMO_PROFILES (including custom 'Other')
  for (const [dept, profile] of Object.entries(DEMO_PROFILES)) {
    try {
      const parsed = AnalysisResultSchema.parse(profile.sampleResult);
      assert(
        parsed.overall_score >= 0 && parsed.overall_score <= 100,
        `${dept} demo profile matches AnalysisResultSchema with valid overall score (${parsed.overall_score})`
      );
      assert(parsed.next_30_days.length === 4, `${dept} next_30_days has exactly 4 weeks`);
      assert(parsed.missing_skills.length > 0, `${dept} missing_skills has prioritized items`);
    } catch (e) {
      assert(false, `${dept} demo profile validation failed: ${e.message}`);
    }
  }

  // TEST 2: Custom Academic Department Validation
  try {
    const customReq = AnalysisRequestSchema.parse({
      department: "Mechanical Engineering",
      semester: 6,
      targetRole: "CAD & Robotics Engineer",
      resumeText: "Mechanical engineering student with SolidWorks, MATLAB, and robotics coursework looking for engineering internships.",
    });
    assert(customReq.department === "Mechanical Engineering", "Custom department 'Mechanical Engineering' accepted and validated");
  } catch (e) {
    assert(false, `Custom department validation failed: ${e.message}`);
  }

  // TEST 3: AnalysisRequestSchema Input Limits
  try {
    AnalysisRequestSchema.parse({
      department: "CSE",
      semester: 5,
      targetRole: "Frontend Developer",
      resumeText: "Short", // should fail min 50
    });
    assert(false, "Short resume text should fail validation");
  } catch (e) {
    assert(true, "Short resume text properly rejected (< 50 chars)");
  }

  try {
    AnalysisRequestSchema.parse({
      department: "A", // too short min 2
      semester: 5,
      targetRole: "Frontend Developer",
      resumeText: "Valid length resume text that is definitely more than fifty characters long to pass the length constraint.",
    });
    assert(false, "Single letter department should fail validation");
  } catch (e) {
    assert(true, "Single letter department properly rejected (< 2 chars)");
  }

  try {
    AnalysisRequestSchema.parse({
      department: "CSE",
      semester: 10, // should fail max 8
      targetRole: "Frontend Developer",
      resumeText: "Valid length resume text that is definitely more than fifty characters long to pass the length constraint.",
    });
    assert(false, "Invalid semester should fail validation");
  } catch (e) {
    assert(true, "Invalid semester > 8 properly rejected");
  }

  // TEST 4: extractAndParseJSON Robustness
  const validJsonInMarkdown = 'Here is the analysis:\n```json\n{"overall_score": 80, "score_explanation": "Good"}\n```\nHope this helps!';
  try {
    const res = extractAndParseJSON(validJsonInMarkdown);
    assert(res.overall_score === 80, "extractAndParseJSON successfully unwraps markdown code fence and surrounding text");
  } catch (e) {
    assert(false, `extractAndParseJSON failed on markdown block: ${e.message}`);
  }

  const jsonWithTrailingCommas = '{"overall_score": 75, "items": ["a", "b",],}';
  try {
    const res = extractAndParseJSON(jsonWithTrailingCommas);
    assert(res.overall_score === 75, "extractAndParseJSON repairs trailing commas");
  } catch (e) {
    assert(false, `extractAndParseJSON failed on trailing commas: ${e.message}`);
  }

  // TEST 5: PDF extraction edge cases
  try {
    await extractTextFromPDF(Buffer.alloc(0));
    assert(false, "Empty buffer should be rejected");
  } catch (e) {
    assert(e.message.includes("empty"), "extractTextFromPDF properly rejects empty buffer");
  }

  try {
    await extractTextFromPDF(Buffer.alloc(6 * 1024 * 1024)); // 6MB
    assert(false, "6MB buffer should be rejected (>5MB)");
  } catch (e) {
    assert(e.message.includes("5MB"), "extractTextFromPDF properly enforces 5MB size limit");
  }

  console.log(`\nVerification complete: ${passed} passed, ${failed} failed.`);
}

runTests().catch(console.error);
