# TMDB Movies App
Technical Challenge - Senior Frontend Developer

## 🚀 Tech Stack

- React
- TypeScript
- Redux Toolkit + RTK Query
- React Router
- TailwindCSS
- TanStack Table

## 📦 Installation

git clone https://github.com/JuniorMathias/TMDB-Movies.git

inside the project: 
 - npm install
 - npm run dev

Create a .env file:

VITE_TMDB_API_KEY=your_api_key_here

## 📦 Dependencies

npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install @tanstack/react-table
npm install axios
npm install tailwindcss postcss autoprefixer
npx tailwindcss init 


## 🧠 Technical Decisions

- RTK Query used for data fetching and caching.
- Favorites stored in Redux + LocalStorage for persistence.
- Query params are dynamically constructed to support filters and sorting.
- Strong typing applied to API responses.