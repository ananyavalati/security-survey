// src/securitySurvey/score.js

/**
 * Works for BOTH styles:
 * - Multiple-choice: question has `options` and a `correct` index (0-based).
 *   -> score = 100 if selected index === correct, else 0.
 * - Likert / numeric: answer is a number (1..5 or 0..100)
 *   -> mapped to 0..100 as before.
 */
export function computeScores(questions, answers) {
  const buckets = {}; // { cat: { weightSum, weightedScoreSum } }
  const details = {};

  for (const q of questions) {
    const cat = q.category || "Other";
    const weight = q.weight ?? 1;

    let score = 0;
    if (typeof q.correct === "number" && Array.isArray(q.options)) {
      // Multiple-choice mode
      const selected = answers[q.id];
      const isCorrect = Number(selected) === q.correct;
      score = isCorrect ? 100 : 0;
    } else {
      // Likert / numeric fallback
      score = normalizeScore(answers[q.id]);
    }

    if (!buckets[cat]) buckets[cat] = { weightSum: 0, weightedScoreSum: 0 };
    buckets[cat].weightSum += weight;
    buckets[cat].weightedScoreSum += score * weight;

    details[q.id] = { category: cat, weight, score };
  }

  const byCategory = {};
  let overallWeight = 0;
  let overallWeighted = 0;

  for (const [cat, { weightSum, weightedScoreSum }] of Object.entries(buckets)) {
    const pct = weightSum > 0 ? weightedScoreSum / weightSum : 0;
    byCategory[cat] = round0to100(pct);
    overallWeight += weightSum;
    overallWeighted += weightedScoreSum;
  }

  const overall = round0to100(overallWeight > 0 ? overallWeighted / overallWeight : 0);

  // rank weakest categories
  const ranked = Object.entries(byCategory).sort((a, b) => a[1] - b[1]);
  const suggestions = ranked.slice(0, 3).map(([cat]) => suggestionFor(cat));

  return { byCategory, overall, details, suggestions };
}

// If answer is numeric (Likert 1..5 or raw 0..100)
function normalizeScore(v) {
  if (typeof v === "number" && Number.isFinite(v)) {
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
    "Basic Hygiene":
      "Enforce updates, MFA, and strong password policies; review device patching cadence.",
    "Phishing Awareness":
      "Run short phishing trainings and monthly simulations to build instinct for suspicious emails.",
    "Identity & Access":
      "Turn on MFA for all users and audit admin roles and third-party app access.",
    "Data Protection": "Enable backups/versioning and restrict sharing on sensitive folders.",
    "Endpoint Security": "Deploy disk encryption and EDR/antivirus on all laptops and desktops.",
    "Email & Collaboration":
      "Tighten spam/phish filtering, DKIM/DMARC, and external sender banner.",
    Other:
      "Do a quick controls review and set a 30-day remediation plan for the weakest area.",
  };
  return tips[category] || tips.Other;
}
