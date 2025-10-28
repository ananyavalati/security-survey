// src/securitySurvey/score.js

/**
 * Input
 * - answers: an object of the form { [questionId]: number }, where the number
 *   is the selected option for that question.
 * - questions: the full array of survey questions defined.
 *
 * Output
 * - byCategory: a map of category -> score from 0 to 100.
 * - overall: a single score from 0 to 100 across all questions.
 * - details: per-question info { [questionId]: { category, weight, score } }.
 *   The score here is the weighted value used in the calculation.
 * - suggestions: up to three plain-English tips based on the weakest categories.
 */
export function computeScores(questions, answers) {
  // 1) collect per-category weighted totals
  const buckets = {}; // { cat: { weightSum, weightedScoreSum } }
  const details = {};

  for (const q of questions) {
    const cat = q.category || "Other";
    const weight = q.weight ?? 1;
    const score = normalizeScore(answers[q.id]);

    if (!buckets[cat]) buckets[cat] = { weightSum: 0, weightedScoreSum: 0 };
    buckets[cat].weightSum += weight;
    buckets[cat].weightedScoreSum += score * weight;

    details[q.id] = { category: cat, weight, score };
  }

  // 2) compute per-category % (0..100)
  const byCategory = {};
  let overallWeight = 0;
  let overallWeighted = 0;

  for (const [cat, { weightSum, weightedScoreSum }] of Object.entries(buckets)) {
    const pct = weightSum > 0 ? (weightedScoreSum / weightSum) : 0;
    byCategory[cat] = round0to100(pct);

    overallWeight += weightSum;
    overallWeighted += weightedScoreSum;
  }

  const overall = round0to100(overallWeight > 0 ? (overallWeighted / overallWeight) : 0);

  // 3) simple suggestions: weakest categories first
  const ranked = Object.entries(byCategory)
    .sort((a, b) => a[1] - b[1]); // ascending by score

  const suggestions = ranked
    .slice(0, 3)
    .map(([cat]) => suggestionFor(cat));

  return { byCategory, overall, details, suggestions };
}

/**
 * If  question choices directly store 0..100, accept that.
 * If undefined/null, treat as 0 (worst).
 */
function normalizeScore(v) {
  if (typeof v === "number" && isFinite(v)) {
    if (v >= 1 && v <= 5) return Math.round(((v - 1) / 4) * 100);
    return Math.max(0, Math.min(100, v));
  }
  return 0;
}

function round0to100(n) {
  return Math.round(Math.max(0, Math.min(100, n)));
}

function suggestionFor(category) {
  const tips = {
    "Basic Hygiene": "Enforce updates, MFA, and strong password policies; review device patching cadence.",
    "Phishing Awareness": "Run short phishing trainings and monthly simulations to build instinct for suspicious emails.",
    "Identity & Access": "Turn on MFA for all users and audit admin roles and third-party app access.",
    "Data Protection": "Enable backups/versioning and restrict sharing on sensitive folders.",
    "Endpoint Security": "Deploy disk encryption and EDR/antivirus on all laptops and desktops.",
    "Email & Collaboration": "Tighten spam/phish filtering, DKIM/DMARC, and external sender banner.",
    Other: "Do a quick controls review and set a 30-day remediation plan for the weakest area."
  };
  return tips[category] || tips.Other;
}
