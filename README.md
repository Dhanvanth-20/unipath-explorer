# UniPath Explorer

UniPath Explorer is a comprehensive study abroad guidance platform that helps students make informed decisions about their international education journey.

## Application Overview

UniPath Explorer simplifies the complex process of studying abroad by providing all the essential tools in one unified platform. Whether you're trying to find the right university, compare countries, calculate costs, or check your eligibility, UniPath has you covered.

## Features

### 1. Country Comparison
Compare tuition fees, living costs, visa options, and PR (Permanent Residency) pathways across top study destinations including USA, UK, Canada, Australia, Germany, and more.

### 2. University Finder
Discover universities that match your budget, preferred course, and ranking expectations. Browse through detailed university profiles with rankings, tuition costs, and program offerings.

### 3. Cost Calculator
Estimate your total study abroad expenses including tuition, rent, food, transportation, and other living costs. Get a comprehensive breakdown tailored to your chosen lifestyle.

### 4. Eligibility Checker
Find out which countries and universities you qualify for based on your academic profile including GPA, GRE/GMAT scores, English proficiency tests, and budget constraints.

### 5. Dashboard
Access a personalized dashboard to track your applications, saved universities, and comparison lists.

### 6. User Authentication
Secure login and signup functionality to save your preferences and track your study abroad journey.

## Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Recharts** - Data visualization

### Backend (Coming Soon)
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **REST API** - For future database integration

## Project Structure

```
Field_Project/
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── layout/   # Layout components (Navbar, Footer, etc.)
│   │   │   └── ui/       # UI component library
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   ├── data/         # Mock data
│   │   ├── lib/          # Utility functions
│   │   └── test/         # Test files
│   ├── public/           # Static assets
│   ├── index.html        # Entry HTML
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite configuration
│
├── backend/              # Backend application (Coming Soon)
│   ├── server.js        # Express server entry point
│   └── package.json     # Backend dependencies
│
└── README.md            # This file
```

## Getting Started

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup (Future)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend API will be available at `http://localhost:3001`

## API Endpoints (Backend)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/countries` | GET | Get list of countries with details |
| `/api/universities` | GET | Get list of universities |
| `/api/eligibility` | POST | Check eligibility based on profile |
| `/api/calculate-cost` | POST | Calculate study abroad costs |

## Current Status

- ✅ Frontend - Fully functional with mock data
- 🔄 Backend - Basic server structure in place
- 📦 Database integration - Coming soon

## Contributing

This project was originally created with Lovable and uses modern web technologies. Feel free to explore the codebase and contribute to its development.

## License

This project is for educational purposes.

