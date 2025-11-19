// src/pages/SurveyPage.jsx
"use client";
import { useMemo, useState } from "react";
import { CATEGORIES, QUESTIONS } from "../securitySurvey/questions";
import { computeScores } from "../securitySurvey/score";
import { createClient } from "@supabase/supabase-js";
import { saveSurveyResult } from "../db/surveyResults/crud";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export default function SurveyPage() {
  // answers[q.id] MUST be the option INDEX (0,1,2,3...)
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // Every question must be answered
  const allAnswered = useMemo(
    () => QUESTIONS.every((q) => answers[q.id] != null),
    [answers]
  );

  const answeredCount = useMemo(
    () => QUESTIONS.reduce((n, q) => n + (answers[q.id] != null ? 1 : 0), 0),
    [answers]
  );

  // store the INDEX of the selected option
  const onChange = (qid, idx) =>
    setAnswers((prev) => ({ ...prev, [qid]: Number(idx) }));

  const onSubmit = async (e) => {
    e.preventDefault();

    const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

    if (!allAnswered) {
      alert(`Please answer all questions (${answeredCount}/${QUESTIONS.length}).`);
      const firstMissing = QUESTIONS.find((q) => answers[q.id] == null);
      if (firstMissing) {
        const el = document.querySelector(`input[name="${firstMissing.id}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Compute results (percentages 0..100)
    const computed = computeScores(QUESTIONS, answers);
    console.log("DEBUG computed:", computed);
    setResult(computed);

    const byCat = computed.byCategory || {};
    const surveyResult = {
      overall_score: computed.overall,
      phishing_awareness: byCat[CATEGORIES.PHISHING] ?? null,
      basic_hygiene: byCat[CATEGORIES.HYGIENE] ?? null,
    };

    // Save to Supabase (make sure table columns match these names)
    const saved = await saveSurveyResult(supabase, surveyResult);
    console.log("DEBUG saved row:", saved);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retake = () => {
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render results view
  if (result) {
    const entries = Object.entries(result.byCategory || {}).sort((a, b) => a[1] - b[1]);
    return (
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
        <h1 style={{ marginBottom: 8 }}>Your Security Self-Assessment</h1>
        <p style={{ color: "#666", marginTop: 0 }}>Here’s a quick summary.</p>

        <section
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            Overall Score: <strong>{result.overall}%</strong>
          </div>

          {entries.length > 0 && (
            <>
              <h3 style={{ marginTop: 16, marginBottom: 8 }}>By Category</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {entries.map(([cat, score]) => (
                  <li key={cat} style={{ lineHeight: 1.8 }}>
                    {cat}: <strong>{score}%</strong>
                  </li>
                ))}
              </ul>
            </>
          )}

          {Array.isArray(result.suggestions) && result.suggestions.length > 0 && (
            <>
              <h3 style={{ marginTop: 16, marginBottom: 8 }}>Top Fixes</h3>
              <ol style={{ marginTop: 0 }}>
                {result.suggestions.slice(0, 3).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </>
          )}
        </section>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={retake}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Take it again
          </button>
        </div>
      </div>
    );
  }

  // Render survey form (multiple-choice)
  return (
    <div style={{ maxWidth: 840, margin: "40px auto", padding: 16 }}>
      <h1>Security Self-Assessment</h1>
      <p>Pick the best answer for each question.</p>
      <p>
        Progress: {answeredCount}/{QUESTIONS.length}
      </p>

      <form onSubmit={onSubmit}>
        {/** group by category */}
        {[CATEGORIES.PHISHING, CATEGORIES.HYGIENE].map((cat) => {
          const items = QUESTIONS.filter((q) => q.category === cat);
          return (
            <fieldset
              key={cat}
              style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 16 }}
            >
              <legend style={{ padding: "0 8px", fontWeight: 600 }}>{cat}</legend>

              {items.map((q) => (
                <div key={q.id} style={{ padding: "12px 8px", borderBottom: "1px solid #f6f6f6" }}>
                  <div style={{ marginBottom: 8, fontWeight: 500 }}>{q.text}</div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {q.options.map((opt, idx) => (
                      <label key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={idx}
                          checked={answers[q.id] === idx}
                          onChange={() => onChange(q.id, idx)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </fieldset>
          );
        })}

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: allAnswered ? "#111" : "#bbb",
            color: "#fff",
            cursor: allAnswered ? "pointer" : "not-allowed",
            fontWeight: 600,
          }}
          disabled={!allAnswered}
        >
          Calculate score
        </button>
      </form>
    </div>
  );
}
