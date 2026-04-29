const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(1).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(1).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).min(1).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).min(1).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        Always include a numeric matchScore between 0 and 100.
                        Return at least 3 technicalQuestions, at least 3 behavioralQuestions, at least 3 skillGaps, and at least a 3-day preparationPlan.
                        Do not return empty arrays.
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    const parsed = JSON.parse(response.text)
    return normalizeInterviewReport(parsed)


}

function normalizeInterviewReport(report) {
    const normalized = { ...report }

    normalized.matchScore = normalizeMatchScore(normalized.matchScore)

    normalized.technicalQuestions = normalizeQuestionList(
        normalized.technicalQuestions,
        "Provide a sample intention",
        "Provide a sample answer approach"
    )
    normalized.behavioralQuestions = normalizeQuestionList(
        normalized.behavioralQuestions,
        "Provide a sample intention",
        "Provide a sample answer approach"
    )
    normalized.skillGaps = normalizeSkillGaps(normalized.skillGaps)
    normalized.preparationPlan = normalizePreparationPlan(normalized.preparationPlan)

    return normalized
}

function normalizeMatchScore(value) {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) {
        return 50
    }

    return Math.max(0, Math.min(100, parsed))
}

function normalizeQuestionList(value, fallbackIntention, fallbackAnswer) {
    if (!value) {
        return []
    }

    const list = Array.isArray(value) ? value : [ value ]
    return list.map((item) => {
        if (typeof item === "string") {
            return {
                question: item,
                intention: fallbackIntention,
                answer: fallbackAnswer
            }
        }

        return {
            question: item.question,
            intention: item.intention || fallbackIntention,
            answer: item.answer || fallbackAnswer
        }
    })
}

function normalizeSkillGaps(value) {
    if (!value) {
        return []
    }

    const list = Array.isArray(value) ? value : [ value ]
    return list.map((item) => {
        if (typeof item === "string") {
            return {
                skill: item,
                severity: "medium"
            }
        }

        return {
            skill: item.skill,
            severity: item.severity || "medium"
        }
    })
}

function normalizePreparationPlan(value) {
    if (!value) {
        return []
    }

    const list = Array.isArray(value) ? value : [ value ]
    return list.map((item, index) => {
        if (typeof item === "string") {
            return {
                day: index + 1,
                focus: "General preparation",
                tasks: [ item ]
            }
        }

        return {
            day: item.day ?? index + 1,
            focus: item.focus || "General preparation",
            tasks: Array.isArray(item.tasks) && item.tasks.length > 0 ? item.tasks : [ "Review fundamentals" ]
        }
    })
}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }