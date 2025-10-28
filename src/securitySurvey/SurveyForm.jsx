import { useMemo, useState } from "react";
import { QUESTIONS, SCALE, CATEGORIES } from "./questions";

/**
 * Renders a 1–5 Likert survey and returns the answers to a parent via onSubmit.
 * For now, it just collects answers. Scoring comes next step.
 */
export default function SurveyForm({ onSubmit }) {
  // answers shape: { [questionId]: number }
  const [answers, setAnswers] = useState({});

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  // pre-group questions by category (handy for layout or future sections)
  const questionsByCategory = useMemo(() => {
    const map = {};
    for (const q of QUESTIONS) {
      map[q.category] ||= [];
      map[q.category].push(q);
    }
    return map;
  }, []);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allAnswered) return;
    onSubmit?.(answers); // pass answers up; scoring will happen next step
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 840, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Security Self-Assessment</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        Answer each question from <strong>{SCALE.labels[1]}</strong> (1) to{" "}
        <strong>{SCALE.labels[5]}</strong> (5).
      </p>

      <div style={{ margin: "16px 0", fontSize: 14 }}>
        Progress: {answeredCount}/{totalQuestions}
      </div>

      {Object.values(CATEGORIES)
        .filter((c) => c !== CATEGORIES.OVERALL) // Overall is computed later
        .map((category) => (
          <fieldset key={category} style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <legend style={{ padding: "0 8px", fontWeight: 600 }}>{category}</legend>

            {questionsByCategory[category]?.map((q) => (
              <div key={q.id} style={{ padding: "12px 8px", borderBottom: "1px solid #f3f3f3" }}>
                <label htmlFor={q.id} style={{ display: "block", fontWeight: 500, marginBottom: 8 }}>
                  {q.text}
                </label>

                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label key={val} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <input
                        type="radio"
                        name={q.id}
                        value={val}
                        checked={answers[q.id] === val}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        required
                      />
                      <span style={{ fontSize: 13 }}>
                        {val} – {SCALE.labels[val]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        ))}

      <button
        type="submit"
        disabled={!allAnswered}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #222",
          background: allAnswered ? "#111" : "#bbb",
          color: "#fff",
          cursor: allAnswered ? "pointer" : "not-allowed",
        }}
      >
        Calculate score
      </button>
    </form>
  );
}
