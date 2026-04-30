import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../style/interview.scss'
import { getInterviewReportById } from '../services/interview.api'

const Interview = ({ data }) => {
  const { interviewId } = useParams()
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState("")
  const [interviewData, setInterviewData] = useState(data ?? null)
  const [section, setSection] = useState("technical")

  useEffect(() => {
    if (data) {
      setInterviewData(data)
      setStatus("success")
      return
    }

    if (!interviewId) {
      setStatus("empty")
      return
    }

    const fetchReport = async () => {
      try {
        setStatus("loading")
        const response = await getInterviewReportById(interviewId)
        setInterviewData(response?.interviewReport ?? null)
        setStatus("success")
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load report.")
        setStatus("error")
      }
    }

    fetchReport()
  }, [data, interviewId])

  const technicalQuestions = interviewData?.technicalQuestions ?? []
  const behavioralQuestions = interviewData?.behavioralQuestions ?? []
  const preparationPlan = interviewData?.preparationPlan ?? []
  const skillGaps = interviewData?.skillGaps ?? []
  const matchScore = interviewData?.matchScore ?? 0

  const sectionTitle = useMemo(() => {
    if (section === "behavioral") return "Behavioral Questions"
    if (section === "roadmap") return "Preparation Plan"
    return "Technical Questions"
  }, [section])

  const sectionCount = useMemo(() => {
    if (section === "behavioral") return behavioralQuestions.length
    if (section === "roadmap") return preparationPlan.length
    return technicalQuestions.length
  }, [behavioralQuestions.length, preparationPlan.length, section, technicalQuestions.length])

  return (
    <main className="interview">
      <aside className="interview-sidebar">
        <div className="sidebar-title">Sections</div>
        <button
          className={`sidebar-item ${section === "technical" ? "active" : ""}`}
          type="button"
          onClick={() => setSection("technical")}
        >
          Technical Questions
        </button>
        <button
          className={`sidebar-item ${section === "behavioral" ? "active" : ""}`}
          type="button"
          onClick={() => setSection("behavioral")}
        >
          Behavioral Questions
        </button>
        <button
          className={`sidebar-item ${section === "roadmap" ? "active" : ""}`}
          type="button"
          onClick={() => setSection("roadmap")}
        >
          Road Map
        </button>
      </aside>

      <section className="interview-main">
        {status === "loading" && (
          <div className="panel-state">Loading interview report...</div>
        )}

        {status === "error" && (
          <div className="panel-state error">{error}</div>
        )}

        {status === "empty" && (
          <div className="panel-state">No interview report selected.</div>
        )}

        {status === "success" && (
          <>
            <div className="section-header">
              <div>
                <h1>{sectionTitle}</h1>
                <p className="section-sub">{sectionCount} items</p>
              </div>
              <div className="section-pill">Focused</div>
            </div>

            {section === "roadmap" ? (
              <div className="roadmap-list">
                {preparationPlan.map((plan) => (
                  <div className="roadmap-card" key={`${plan.day}-${plan.focus}`}>
                    <div className="roadmap-day">Day {plan.day}</div>
                    <div className="roadmap-focus">{plan.focus}</div>
                    <ul className="roadmap-tasks">
                      {plan.tasks?.map((task, taskIndex) => (
                        <li key={`${plan.day}-${taskIndex}`}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="question-list">
                {(section === "technical" ? technicalQuestions : behavioralQuestions).map((item, index) => (
                  <div className="question-card" key={item.question}>
                    <div className="question-index">{String(index + 1).padStart(2, '0')}</div>
                    <div className="question-text">{item.question}</div>
                    <div className="question-chevron">▾</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <aside className="interview-summary">
        <div className="summary-card">
          <div className="summary-title">Match Score</div>
          <div className="score-ring" style={{ '--score': matchScore }}>
            <div className="score-value">{matchScore}</div>
          </div>
          <div className="score-note">Strong match for this role</div>
        </div>

        <div className="summary-card">
          <div className="summary-title">Skill Gaps</div>
          <div className="gap-list">
            {skillGaps.map((gap) => (
              <div className="gap-item" key={gap.skill}>
                <span className={`gap-pill ${gap.severity}`}>{gap.severity}</span>
                <span className="gap-text">{gap.skill}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  )
}

export default Interview
