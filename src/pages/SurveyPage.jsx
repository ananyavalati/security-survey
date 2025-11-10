
import { useMemo, useState } from 'react'
import { CATEGORIES, QUESTIONS, SCALE } from '../securitySurvey/questions'
import { computeScores } from '../securitySurvey/score'

export default function SurveyPage() {
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers])
  const allAnswered = answeredCount === QUESTIONS.length
  console.log(localStorage.getItem('survey:lastAnswers'))

  const onChange = (qid, value) => setAnswers((prev) => ({ ...prev, [qid]: Number(value) }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!allAnswered) return
    const result = computeScores(QUESTIONS, answers)
    setScore(result.overall)
  }

  const cats = Object.values(CATEGORIES).filter((c) => c !== CATEGORIES.OVERALL)
  const byCat = cats.map((cat) => ({
    cat,
    items: QUESTIONS.filter((q) => q.category === cat),
  }))

  if (score) {
    return (
      <div style={{ maxWidth: 640, margin: '40px auto', padding: 16 }}>
        <h1>Score:{score}</h1>
      </div>
    )
  }
  return (
    <div style={{ maxWidth: 840, margin: '40px auto', padding: 16 }}>
      <h1>Security Self-Assessment</h1>
      <p>
        Answer from {SCALE.labels[0]} (1) to {SCALE.labels[4]} (5).
      </p>
      <p>
        Progress: {answeredCount}/{QUESTIONS.length}
      </p>

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
                        required
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
          disabled={!allAnswered}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: allAnswered ? '#111' : '#bbb',
            color: '#fff',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            fontWeight: 600,
          }}
        >
          Calculate score
        </button>
      </form>
    </div>
  )
}
