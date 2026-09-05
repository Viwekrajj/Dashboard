# React Redux Saga Starter

A clean JavaScript starter for a React application using Vite, React Router, Redux Toolkit, Redux Saga and Axios.

## Stack

- React
- Vite
- React Router
- Redux Toolkit + React Redux
- Redux Saga
- Axios
- ESLint

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173.

## Project structure

```text
src/
├── app/
│   └── store.js
├── components/
├── pages/
│   ├── Home.jsx
│   ├── Game.jsx
│   └── NotFound.jsx
├── routes/
│   └── AppRoutes.jsx
├── services/
│   └── api.js
├── store/
│   ├── slices/
│   │   └── gameSlice.js
│   └── sagas/
│       ├── gameSaga.js
│       └── rootSaga.js
├── utils/
├── main.jsx
└── styles.css
```

## API integration

The sample saga calls:

```text
POST http://localhost:8080/game/startGame
```

and expects a response shaped like:

```json
{
  "message": "Game created successfully",
  "data": 1
}
```

Change `VITE_API_BASE_URL` in `.env` if your backend runs elsewhere.
# Dashboard
