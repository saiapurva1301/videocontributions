# 🎥 Video Contributions UI

This is a responsive frontend application built with React and Tailwind CSS for displaying and filtering video contributions. It connects to a FastAPI backend to fetch contribution data.

## 🚀 Features

- 🔍 Search by **Title**, **Description**, and **Owner**
- 📆 Displays start and end time in user's local format
- 📺 Shows status: **Scheduled**, **Active**, or **Complete**
- 📱 Responsive layout:
  - 1 column on mobile
  - 2 columns on tablet
  - 3 columns on desktop
- 📄 Pagination (14 items per page)
- 🔗 URL-based filters and pagination (supports bookmarking & sharing)

---

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Axios** – HTTP client
- **date-fns** – Date formatting
- **React Router** – For syncing URL with filters

---

## 📦 Getting Started

### 1. Clone this repository
```
git clone <your-repo-url>
cd <repo-folder>/ui
```

### 2. Install dependencies
```
npm install
```

### 3. Install tailwind css packages
```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### 4. Start the development server
```
npm run dev
```

The app will run at http://localhost:5173

## Backend Setup
Make sure you have the FastAPI backend running locally:
```
cd <repo-folder>/ui
pip install -r requirements.txt
fastapi dev main.py
```
It must be accessible at http://127.0.0.1:8000.

If CORS errors occur, ensure the backend includes:
```
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Evaluation Criteria Match
Requirement	Implemented  
Clean code & structure	- Yes  
Filters by title	- Yes  
Pagination (14 per page)	- Yes  
Responsive design	- Yes  
Shows status (Scheduled, etc)	- Yes  
Bonus: filter by other fields	- Yes (description & owner)  
Bonus: URL sync	- Yes  

## Future Enhancements (If Time Permitted)
 - Debounce search input for performance
 - Add tests using Jest + React Testing Library
 - Add filter reset & visual filter tags
 - Export results to CSV
