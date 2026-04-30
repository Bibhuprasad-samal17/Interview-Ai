import React from 'react'
import '../style/home.scss'

const Home = () => {
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
                ></textarea>
            </div>

            <div className="card">
                <h2>Self Description</h2>
                <p className="helper">Briefly describe yourself (Summary, Skills, Experience)</p>
                <textarea
                    name="selfDescription"
                    id="selfDescription"
                    placeholder="Briefly share your professional background... (Max 1000 chars)"
                ></textarea>
            </div>

            <div className="card upload-card">
                <h2>Upload Your Resume</h2>
                <div className="upload-area">
                    <div className="upload-icon" aria-hidden="true">⬆</div>
                    <p>Drag & Drop Resume (PDF, DOCX) or click to browse</p>
                    <label className="upload-button" htmlFor="resume">Browse File</label>
                    <input className="file-input" type="file" name="resume" id="resume" accept=".pdf" />
                    <span className="file-hint">No file selected</span>
                </div>
            </div>
        </section>

        <button className="generate-btn">Generate Report <span aria-hidden="true">→</span></button>
    </main>
  )
}

export default Home
