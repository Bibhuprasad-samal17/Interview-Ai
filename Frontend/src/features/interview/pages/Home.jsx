import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/home.scss'
import { generateInterviewReport } from '../services/interview.api'

const Home = () => {
    const navigate = useNavigate()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resume, setResume] = useState(null)
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        setError("")

        if (!jobDescription.trim() || !selfDescription.trim()) {
            setError("Please fill in job description and self description.")
            setStatus("error")
            return
        }

        if (!resume) {
            setError("Please upload a PDF resume.")
            setStatus("error")
            return
        }

        try {
            setStatus("loading")
            const data = await generateInterviewReport({ jobDescription, selfDescription, resume })
            const interviewId = data?.interviewReport?._id

            if (!interviewId) {
                setStatus("error")
                setError("Failed to generate report. Please try again.")
                return
            }

            setStatus("success")
            navigate(`/interview/${interviewId}`)
        } catch (err) {
            setStatus("error")
            setError(err?.response?.data?.message || "Failed to generate report.")
        }
    }

  return (
    <main className="home">
        <header className="hero">
            <p className="hero-quote">“Unlock your potential. Bridge the gap between your resume and your dream job.”</p>
            <p className="hero-sub">— Elevate Your Career</p>
        </header>

        <section className="cards">
            <div className="card">
                <h2>Job Description</h2>
                <p className="helper">Paste the Job Description (Responsibilities, Requirements, Skills)</p>
                <textarea
                    name="jobDescription"
                    id="jobDescription"
                    placeholder="Enter the job description here... (Max 5000 chars)"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
            </div>

            <div className="card">
                <h2>Self Description</h2>
                <p className="helper">Briefly describe yourself (Summary, Skills, Experience)</p>
                <textarea
                    name="selfDescription"
                    id="selfDescription"
                    placeholder="Briefly share your professional background... (Max 1000 chars)"
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                ></textarea>
            </div>

            <div className="card upload-card">
                <h2>Upload Your Resume</h2>
                <div className="upload-area">
                    <div className="upload-icon" aria-hidden="true">⬆</div>
                    <p>Drag & Drop Resume (PDF) or click to browse</p>
                    <label className="upload-button" htmlFor="resume">Browse File</label>
                    <input
                        className="file-input"
                        type="file"
                        name="resume"
                        id="resume"
                        accept=".pdf"
                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                    />
                    <span className="file-hint">{resume?.name || "No file selected"}</span>
                </div>
            </div>
        </section>

        {status === "error" && <p className="status error">{error}</p>}
        {status === "success" && <p className="status success">Report generated. Redirecting...</p>}

        <button
            className="generate-btn"
            onClick={handleSubmit}
            disabled={status === "loading"}
        >
            {status === "loading" ? "Generating..." : "Generate Report"} <span aria-hidden="true">→</span>
        </button>
    </main>
  )
}

export default Home
