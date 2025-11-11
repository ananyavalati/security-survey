import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  // Load the last computed result from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("survey:lastResult");
      if (!raw) {
        // No result stored — send the user to take the survey
        navigate("/survey", { replace: true });
        return;
      }
      setResult(JSON.parse(raw));
    } catch {
      navigate("/survey", { replace: true });
    }
  }, [navigate]);

  if (!result) return null;

  const { overall, byCategory } = result;

  const handleRetake = () => {
    // Clear any saved answers so the form starts fresh
    localStorage.removeItem("survey:lastAnswers");
    navigate("/survey");
  };

  return (
    <div style={{ maxWidth: 720, margin: "60px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Your results</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        This summary is based on your most recent survey.
      </p>

      <div style={{ border: "1px solid #333", borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>
          Overall Score: <strong>{overall}%</strong>
        </div>
        {byCategory && (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {Object.entries(byCategory).map(([cat, val]) => (
              <li key={cat} style={{ lineHeight: 1.8 }}>
                {cat}: <strong>{val}%</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleRetake} style={{ padding: "10px 16px", cursor: "pointer" }}>
        Take it again
      </button>
    </div>
  );
}
