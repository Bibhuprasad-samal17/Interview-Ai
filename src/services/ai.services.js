const { GoogleGenAI } = require("@google/genai")
const { z } =require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


const interviewReportSchema = z.object({

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked during the interview."),
        intention: z.string().describe("The intention of Interviewer behind asking the technical question."),
        answer: z.string().describe("How to answer this question ,what points to be covered in the answer."),
    }).describe("Technical question that can be asked during the interview. along with the intention behind asking this question and how to answer this question.")),
    
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked during the interview."),
        intention: z.string().describe("The intention of Interviewer behind asking the behavioral question."),
        answer: z.string().describe("How to answer this question ,what points to be covered in the answer."),
    }).describe("Behavioral question that can be asked during the interview along with the intention behind asking this question and how to answer this question.")),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking based on the resume, self description and job description."),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, indicating how critical it is for the candidate's performance."),
    }).describe("Skill gap that the candidate has based on the resume, self description and job description.")),

    preparationplan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1."),
        focus: z.string().describe("The main focus or theme for the preparation on that day, such as 'Data Structures', 'System Design', 'Behavioral Questions', etc."),
        tasks: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on that day to prepare for the interview, such as 'Solve 5 LeetCode problems on Arrays', 'Review common System Design patterns', 'Practice answering behavioral questions using the STAR method', etc."),
    }).describe("The preparation plan for the interview, including the day number and the activities for that day to prepare for the interview.")),

})
async function generateInterviewReport({resume, selfDescription, jobDescription}) {


    const prompt = `Generate a comprehensive interview preparation report for a candidate based on the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        Analyze the candidate's profile against the job requirements and provide:
                        1. Technical questions that are likely to be asked, the intention behind each question, and how to answer them
                        2. Behavioral questions relevant to the role, the interviewer's intention, and suggested answers
                        3. Skill gaps the candidate has compared to the job requirements, rated by severity (low, medium, high)
                        4. A detailed day-by-day preparation plan for the candidate to fill these gaps and prepare for the interview
                    `


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })
    return JSON.parse(response.text)

}

module.exports = {
    generateInterviewReport
}