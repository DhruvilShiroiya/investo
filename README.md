# Investo

**Investo** is a personal investment portfolio guidance platform that helps users make informed decisions between **stocks** and **metals** investments. It leverages historical news data, market trends, and AI/ML-powered models to provide portfolio insights and guidance through an intelligent chatbot interface.  

---

## Table of Contents

- [Features](#features)  
- [Architecture](#architecture)  
- [Technologies](#technologies)  
- [Folder Structure](#folder-structure)  
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  

---

## Features

- **User Authentication** using Clerk Auth  
- **Portfolio Management** for tracking stocks and metals  
- **AI-Powered Guidance** through an intelligent chatbot  
- **Historical Data Analysis** using news sentiment and market trends  
- **Real-Time Charts** and portfolio summaries  
- **Secure Database** using NeonDB with Prisma ORM  
- **Type-Safe Frontend** using Next.js + TypeScript  

---

## Architecture

Investo follows a **modular, monorepo structure**:  

- **Web (Next.js)** – Frontend, Clerk auth, Prisma ORM, API routes  
- **Backend (FastAPI)** – AI/ML services, portfolio analysis, news & market data processing  
- **NeonDB** – Postgres-based database for users, investments, and transactions  

**Data Flow**:

1. User logs in via Clerk (Next.js frontend).  
2. Portfolio data is stored/retrieved from NeonDB via Prisma.  
3. For AI analysis, the frontend calls FastAPI endpoints.  
4. FastAPI backend processes historical data, runs ML/GenAI models, and returns guidance.  
5. Chatbot or dashboard updates dynamically with insights.  

---

## Technologies

**Frontend (Web)**:  
- Next.js (App Router)  
- TypeScript  
- TailwindCSS  
- shadcn/ui (Reusable components)  
- Prisma ORM  
- Clerk Auth  

**Backend**:  
- FastAPI  
- Python 3.11+  
- Pydantic & SQLAlchemy  
- ML/DL frameworks (TensorFlow / PyTorch / Hugging Face)  
- Uvicorn / Gunicorn  

**Database**:  
- NeonDB (Postgres)  

**Deployment / Dev Tools**:  
- Docker / Docker Compose  
- Git & GitHub  
- Node.js / npm  

---

## Folder Structure

```text
investo/
├── web/                        # Next.js frontend
│   ├── app/                    # Routes & pages (page.tsx + layout.tsx)
│   ├── components/             # Reusable React components
│   ├── features/               # Feature-based modules (auth, portfolio, chat)
│   ├── lib/                    # Utils (Prisma client, API wrappers, helpers)
│   ├── prisma/                 # Prisma schema & migrations
│   ├── hooks/                  # Custom React hooks
│   ├── shadcn/                 # shadcn UI components
│   └── styles/                 # Tailwind / CSS
│
├── backend/                     # FastAPI backend
│   ├── app/
│   │   ├── api/                # REST endpoints (news, metals, stocks, portfolio, AI)
│   │   ├── core/               # Config, constants, middleware
│   │   ├── models/             # Pydantic / SQLAlchemy models
│   │   ├── services/           # ML/DL / AI logic
│   │   ├── utils/              # Helper functions
│   │   └── main.py             # FastAPI entrypoint
│   ├── tests/                  # Backend tests
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile              # Containerization
│
├── docker-compose.yml           # Optional: run web + backend + DB locally
├── .env.local                   # Environment variables (frontend + backend)
└── README.md

```

---

## Setup & Installation

### Frontend (Next.js)

1. **Clone the repository**
git clone <repo_url>
cd investo/web

2. **Install dependencies**
npm install

3. **Run the development server**
npm run dev

Open your browser at http://localhost:3000 to view the frontend.

---

### Backend (FastAPI)

1. **Navigate to the backend folder**
cd investo/backend

2. **Create a virtual environment**
python -m venv venv

3. **Activate the virtual environment**
- On Linux/Mac: source venv/bin/activate
- On Windows: venv\Scripts\activate

4. **Install backend dependencies**
pip install -r requirements.txt

5. **Run FastAPI server**
uvicorn app.main:app --reload

The backend will now run at http://localhost:8000.

---

### Database (NeonDB + Prisma)

1. Ensure your NeonDB Postgres database is set up.  

2. **Configure environment variables**
- Frontend: .env.local  
- Backend: .env

3. **Run Prisma migrations**
cd investo/web
npx prisma migrate dev

This will create all necessary tables and schema in your NeonDB database.

---

## Usage

1. Open the app in your browser: http://localhost:3000  
2. Sign up or log in using **Clerk Auth**  
3. Add investments to your portfolio (stocks or metals)  
4. Go to **Dashboard → Chat** to get AI-powered guidance on your portfolio  
5. View real-time charts, portfolio summaries, and historical performance  

---

## API Endpoints (FastAPI)

| Endpoint                | Method               | Description                                  |
|-------------------------|--------------------|----------------------------------------------|
| `/api/news`             | GET                | Fetch historical news data                  |
| `/api/metals`           | GET                | Fetch metal rates                           |
| `/api/stocks`           | GET                | Fetch stock prices                           |
| `/api/portfolio`        | GET / POST / PUT / DELETE | Manage user portfolio                     |
| `/api/ai/guidance`      | POST               | Get AI-powered investment guidance          |

