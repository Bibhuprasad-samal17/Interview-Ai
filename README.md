# Interview AI - AI-Powered Interview Preparation Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Architecture](#architecture)
- [Contributing](#contributing)

## 🎯 Project Overview

**Interview AI** is an innovative, AI-powered interview preparation platform that helps job candidates prepare for interviews intelligently. It leverages Google's Gemini AI to generate personalized interview preparation reports, including technical questions, behavioral questions, skill gap analysis, and a structured preparation plan.

The platform provides:
- User authentication and account management
- AI-generated, personalized interview reports
- Technical and behavioral question recommendations
- Skill gap identification
- Day-by-day preparation planning
- Secure token-based authentication

## ✨ Features

### 1. **User Authentication**
- User registration with email and password
- Secure login system
- JWT-based authentication
- Token blacklisting for secure logout
- Password hashing using bcrypt

### 2. **AI Interview Report Generation**
- Analyzes user resume, job description, and self-description
- Generates personalized technical interview questions
- Creates behavioral interview questions relevant to the role
- Identifies skill gaps with severity levels (low, medium, high)
- Provides structured preparation plan with daily tasks

### 3. **Interview Preparation Components**
- **Technical Questions**: Role-specific technical questions with:
  - Question text
  - Interviewer's intention
  - Detailed answer guidance
  
- **Behavioral Questions**: Scenario-based questions with:
  - Question text
  - Intention behind the question
  - Best practices for answering
  
- **Skill Gaps**: Analysis of missing skills with:
  - Skill name
  - Severity assessment
  
- **Preparation Plan**: Day-by-day breakdown with:
  - Focus area for each day
  - Specific tasks to complete
  - 7+ days of structured preparation

### 4. **Responsive User Interface**
- Modern React-based frontend
- Form validation
- Protected routes for authenticated users
- SCSS-based styling
- Smooth navigation with React Router
- Interview report view with sections (technical, behavioral, roadmap)

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.3.0)
- **Authentication**: 
  - JWT (jsonwebtoken v9.0.3)
  - bcryptjs (v6.0.0)
- **AI**: Google GenAI SDK (@google/genai v1.49.0)
- **Validation**: Zod (v4.3.6)
- **Utilities**:
  - Cookie Parser
  - CORS
  - dotenv

### Frontend
- **Framework**: React (v19.2.4)
- **Build Tool**: Vite (v8.0.1)
- **Routing**: React Router Dom (v7.13.1)
- **HTTP Client**: Axios (v1.13.6)
- **Styling**: SCSS/Sass (v1.98.0)
- **Linting**: ESLint (v9.39.4)

## 📁 Project Structure

```
Interview-Ai/
├── package.json                    # Backend dependencies
├── server.js                       # Server entry point
│
├── Frontend/                       # React frontend application
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── index.html                # HTML entry point
│   └── src/
│       ├── App.jsx               # Main React component
│       ├── app.route.jsx         # Route definitions
│       ├── main.jsx              # React DOM mount point
│       ├── style.scss            # Global styles
│       ├── features/
│       │   └── auth/
│       │       ├── auth.context.jsx     # Auth context provider
│       │       ├── auth.form.scss       # Form styling
│       │       ├── hooks/
│       │       │   └── useAuth.js       # Auth hook
│       │       ├── services/
│       │       │   └── auth.api.js      # Auth API calls
│       │       └── pages/
│       │           ├── login.jsx        # Login page
│       │           └── Register.jsx     # Registration page
│       ├── features/
│       │   └── interview/
│       │       ├── pages/
│       │       │   ├── Home.jsx         # Report generator
│       │       │   └── interview.jsx    # Report viewer
│       │       ├── services/
│       │       │   └── interview.api.js # Interview API calls
│       │       └── style/
│       │           ├── home.scss        # Home styles
│       │           └── interview.scss   # Interview styles
│       ├── components/
│       │   └── protected.jsx     # Protected route wrapper
│       └── style/
│           └── button.scss       # Button components
│
└── src/                           # Backend source code
    ├── app.js                    # Express app setup
    ├── config/
    │   └── database.js           # MongoDB connection
    ├── controllers/
    │   └── auth.controller.js    # Authentication logic
    ├── middlewares/
    │   └── auth.middleware.js    # JWT verification middleware
    ├── models/
    │   ├── user.models.js        # User schema
    │   ├── blacklist.model.js    # Token blacklist schema
    │   └── interviewReport.model.js  # Interview report schema
    ├── routes/
    │   ├── auth.routes.js        # Auth endpoints
    │   └── interview.routes.js   # Interview endpoints
    └── services/
        └── ai.services.js        # AI report generation
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Git**

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Bibhuprasad-samal17/Interview-Ai.git
cd Interview-Ai
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd Frontend
npm install
cd ..
```

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/neurohire
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/neurohire

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Google AI API
GEMINI_API_KEY=your_google_gemini_api_key_here

# Server Port
PORT=3000
```

### Environment Variables Explanation:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation and verification
- `GOOGLE_API_KEY`: API key for Google Gemini AI
- `PORT`: Server port (default: 3000)

## 📖 Running the Application

### Development Mode

#### Backend
```bash
npm run dev
```
The backend server will start on `http://localhost:3000`

#### Frontend (in a new terminal)
```bash
cd Frontend
npm run dev
```
The frontend will start on `http://localhost:5173` (Vite default)

### Production Build

#### Frontend Build
```bash
cd Frontend
npm run build
```

#### Preview Production Build
```bash
cd Frontend
npm run preview
```

## 🔌 API Routes

### Authentication Routes
Base URL: `http://localhost:3000/api/auth`

#### Register User
- **Endpoint**: `POST /register`
- **Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password"
  }
  ```
- **Response**: 
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Login User
- **Endpoint**: `POST /login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "secure_password"
  }
  ```
- **Response**: Returns user info and JWT token

#### Logout User
- **Endpoint**: `GET /logout`
- **Response**: `{ "message": "User logged out successfully" }`

#### Get Current User
- **Endpoint**: `GET /get-me`
- **Response**: `{ "message": "User details fetched successfully", "user": { "id": "...", "username": "...", "email": "..." } }`

### Interview Routes
Base URL: `http://localhost:3000/api/interview`

#### Generate Interview Report
- **Endpoint**: `POST /`
- **Auth**: Cookie-based (JWT)
- **Body**: `multipart/form-data`
  - `jobDescription` (string)
  - `selfDescription` (string)
  - `resume` (PDF file)
- **Response**: `{ "message": "Interview report generated successfully.", "interviewReport": { ... } }`

#### Get Interview Report by ID
- **Endpoint**: `GET /report/:interviewId`
- **Response**: `{ "message": "Interview report fetched successfully.", "interviewReport": { ... } }`

#### List Interview Reports
- **Endpoint**: `GET /`
- **Response**: `{ "message": "Interview reports fetched successfully.", "interviewReports": [ ... ] }`

#### Generate Resume PDF
- **Endpoint**: `POST /resume/pdf/:interviewReportId`
- **Response**: PDF file stream

## 💾 Database Models

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required, validated),
  password: String (hashed, min 6 chars, required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Interview Report Schema
```javascript
{
  userId: ObjectId (ref: User),
  resume: String,
  jobDescription: String,
  selfDescription: String,
  technicalQuestions: [{
    question: String,
    intention: String,
    answer: String
  }],
  behavioralQuestions: [{
    question: String,
    intention: String,
    answer: String
  }],
  skillGaps: [{
    skill: String,
    severity: "low" | "medium" | "high"
  }],
  preparationPlan: [{
    day: Number,
    focus: String,
    tasks: [String]
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Token Blacklist Schema
```javascript
{
  token: String (unique),
  expiresAt: Date,
  createdAt: Date
}
```

## 🏗️ Architecture

### Backend Architecture
```
Request → Middleware (CORS, JSON, Cookie Parser)
       ↓
Routes (Router)
       ↓
Controller (Business Logic)
       ↓
Service (External APIs, Complex Operations)
       ↓
Model (Database Operations)
       ↓
Response
```

### Frontend Architecture
```
App (Context Provider)
  ↓
Router
  ↓
Protected Routes
  ↓
Components
  ↓
Services (API Calls)
```

### Data Flow for Interview Report Generation
```
User Input (Resume, Job Desc, Self Desc)
           ↓
Frontend API Call
           ↓
Backend Route Handler
           ↓
AI Service (Gemini AI)
           ↓
Response Formatting (Zod Validation)
           ↓
Database Storage
           ↓
Frontend Display
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication
- **Token Blacklisting**: Secure logout implementation
- **CORS**: Cross-Origin Resource Sharing configured
- **Input Validation**: Zod schema validation
- **Protected Routes**: Frontend route protection
- **Middleware**: Authentication middleware on protected backends

## 📝 File Descriptions

### Key Files

| File | Purpose |
|------|---------|
| `server.js` | Application entry point, starts Express server |
| `src/app.js` | Express app configuration, middleware setup |
| `src/services/ai.services.js` | Google Gemini AI integration and report generation |
| `src/controllers/auth.controller.js` | Authentication logic and handlers |
| `src/middlewares/auth.middleware.js` | JWT verification middleware |
| `Frontend/src/App.jsx` | Main React component with routing |
| `Frontend/src/features/auth/auth.context.jsx` | Global auth state management |

## 🧪 Testing

*(To be implemented)*

```bash
npm test  # Backend tests
cd Frontend && npm test  # Frontend tests
```

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Google Gemini API](https://ai.google.dev/)
- [JWT Authentication](https://jwt.io/)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (local) or check Atlas credentials
- Verify `MONGO_URI` in `.env` file

### Port Already in Use
- Backend: Change `PORT` in server.js or `.env`
- Frontend: Vite uses port 5173 by default

### JWT Token Errors
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration time

### CORS Errors
- Verify frontend URL matches CORS configuration in `src/app.js`
- Default: `http://localhost:5173`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🚀 Future Features

- [ ] Video interview recording and playback
- [ ] AI-powered performance scoring
- [ ] Interview feedback analytics
- [ ] Real-time mock interview simulation
- [ ] Company-specific preparation packs
- [ ] Peer-to-peer mock interview feature
- [ ] Interview history and progress tracking
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Integration with LinkedIn

## 📈 Project Status

- **Current Version**: 1.0.0
- **Status**: In Active Development
- **Last Updated**: April 2026

---

**Made with ❤️ for better interview preparation**
