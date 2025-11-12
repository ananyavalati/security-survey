"use client"
import { useMemo, useState } from 'react';
import { CATEGORIES, QUESTIONS, SCALE } from '../securitySurvey/questions';
import { computeScores } from '../securitySurvey/score';
import { createClient } from '@supabase/supabase-js';
import { saveSurveyResult } from '../db/surveyResults/crud';
const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export default function SurveyPage() {
  const [answers, setAnswers] = useState({});          
  const [result, setResult] = useState(null);  

  //every question must have an answer
  const allAnswered = useMemo(
    () => QUESTIONS.every(q => answers[q.id] != null),
    [answers]
  );

  const answeredCount = useMemo(
    () => QUESTIONS.reduce((n, q) => n + (answers[q.id] != null ? 1 : 0), 0),
    [answers]
  );

  const onChange = (qid, value) =>
    setAnswers(prev => ({ ...prev, [qid]: Number(value) }));

  const onSubmit = async (e) => {
    e.preventDefault();

    const supabase= await createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);         


    if (!allAnswered) {
      alert(`Please answer all questions (${answeredCount}/${QUESTIONS.length}).`);
      const firstMissing = QUESTIONS.find(q => answers[q.id] == null);
      if (firstMissing) {
        const el = document.querySelector(`input[name="${firstMissing.id}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Compute results
    const computed = computeScores(QUESTIONS, answers);

    // Show summary on this page
    setResult(computed);

    const surveyResult = {
      overall_score: 1.09,
      phishing_awareness: 1.0 ,
      basic_hygiene: 1.0
    }

    saveSurveyResult(supabase, surveyResult);






    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retake = () => {
    // Clear answers and results so the form is fresh
    setAnswers({});
    setResult(null);
    // also clear storage
   // localStorage.removeItem('survey:lastAnswers');

   // Keep lastResult if you want historical compare
    localStorage.removeItem('survey:lastResult');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cats = Object.values(CATEGORIES).filter(c => c !== CATEGORIES.OVERALL);
  const byCat = cats.map(cat => ({
    cat,
    items: QUESTIONS.filter(q => q.category === cat),
  }));

  // If we have a result, render the summary + retake prompt 
  if (result) {
    const byCategoryEntries = Object.entries(result.byCategory || {});
    // Sort weakest first so users see what to improve
    byCategoryEntries.sort((a, b) => (a[1] ?? 0) - (b[1] ?? 0));

    return (
      <div style={{ maxWidth: 800, margin: '40px auto', padding: 16 }}>
        <h1 style={{ marginBottom: 8 }}>Your Security Self-Assessment</h1>
        <p style={{ color: '#666', marginTop: 0 }}>
          Here’s a quick summary of your most recent answers.
        </p>

        <section
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: 16,
            marginBottom: 24
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            Overall Score: <strong>{result.overall}%</strong>
          </div>

          {byCategoryEntries.length > 0 && (
            <>
              <h3 style={{ marginTop: 16, marginBottom: 8 }}>By Category</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {byCategoryEntries.map(([cat, score]) => (
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

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={retake}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#111',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Take it again
          </button>
        </div>
      </div>
    );
  }

  // Default: render the survey form
  return (
    <div style={{ maxWidth: 840, margin: '40px auto', padding: 16 }}>
      <h1>Security Self-Assessment</h1>
      <p>
        Answer from {SCALE.labels[0]} (1) to {SCALE.labels[4]} (5).
      </p>
      <p>Progress: {answeredCount}/{QUESTIONS.length}</p>

      <form onSubmit={onSubmit}>
        {byCat.map(({ cat, items }) => (
          <fieldset
            key={cat}
            style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16 }}
          >
            <legend style={{ padding: '0 8px', fontWeight: 600 }}>{cat}</legend>

            {items.map((q) => (
              <div key={q.id} style={{ padding: '12px 8px', borderBottom: '1px solid #f6f6f6' }}>
                <div style={{ marginBottom: 8, fontWeight: 500 }}>{q.text}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label
                      key={val}
                      style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={val}
                        checked={answers[q.id] === val}
                        onChange={(e) => onChange(q.id, e.target.value)}
                    
                      />
                      <span style={{ fontSize: 13 }}>
                        {val} – {SCALE.labels[val - 1]}
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
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: allAnswered ? '#111' : '#bbb',
            color: '#fff',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            fontWeight: 600
          }}
        >
          Calculate score
        </button>
      </form>
    </div>
  );
}
