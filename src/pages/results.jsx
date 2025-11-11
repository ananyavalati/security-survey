import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const [result, setResult] = useState(null);

  // Load result from router state first, then fall back to localStorage
  useEffect(() => {
    if (state && state.result) {
      setResult(state.result);
      return;
    }
    try {
      const raw = localStorage.getItem("survey:lastResult");
      if (raw) setResult(JSON.parse(raw));
      else navigate("/survey", { replace: true });
    } catch {
      navigate("/survey", { replace: true });
    }
  }, [state, navigate]);

  const overall = result?.overall ?? null;
  const byCategory = useMemo(() => {
    if (!result?.byCategory) return [];
    return Object.entries(result.byCategory); 
  }, [result]);

  const retake = () => {
    localStorage.removeItem("survey:lastAnswers");
    // keep lastResult so users can compare if they navigate back later 
    navigate("/survey");
  };

  if (!result) return null;

  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Your results</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        Summary of your most recent security self-assessment.
      </p>

      <section
        style={{
          border: "1px solid #333",
          borderRadius: 8,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 18, marginBottom: 8 }}>
          Overall Score: <strong>{overall}%</strong>
        </div>

        {byCategory.length > 0 && (
          <>
            <h3 style={{ marginTop: 12, marginBottom: 8 }}>By category</h3>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {byCategory.map(([cat, score]) => (
                <li key={cat} style={{ lineHeight: 1.8 }}>
                  {cat}: <strong>{score}%</strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {Array.isArray(result?.suggestions) && result.suggestions.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 8 }}>Top fixes</h3>
          <ol>
            {result.suggestions.slice(0, 3).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      <button onClick={retake} style={{ padding: "10px 16px", cursor: "pointer" }}>
        Take it again
      </button>
    </div>
  );
}
