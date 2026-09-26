# AssignmentHub

Assignment & Review Dashboard built as part of the Joineazy Frontend Developer Internship technical assignment.

## Features

### Student
- View assigned assignments
- View due dates
- Open external Drive submission link
- Confirm assignment submission
- Double-confirmation flow
- Track submission progress

### Admin
- View created assignments
- Create new assignments
- Attach Drive submission links
- View student submission status
- View individual student progress
- View overall assignment progress

## Tech Stack

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide React
- LocalStorage

## Architecture

The application follows a component-based architecture.

Pages contain screen-level functionality while reusable UI elements are maintained inside the components directory.

Context API is used for shared application state.

LocalStorage is used to persist assignment and user state because no backend is required for this assignment.

## Folder Structure

src/
├── components/
├── context/
├── data/
├── pages/
├── App.jsx
├── main.jsx
└── index.css

## Installation

Clone the repository:

git clone YOUR_REPOSITORY_URL

Install dependencies:

npm install

Start development server:

npm run dev

## Demo Login

Student:
Aneesha C.K

Admin:
Dr. Priya Menon

The project uses mock authentication for demonstration purposes.

## Design Decisions

The UI uses a responsive card-based dashboard layout.

Tailwind CSS is used for responsive styling.

Reusable components such as StatCard, ProgressBar, AssignmentCard and ConfirmationModal reduce duplication.

The Context API keeps shared assignment and user state centralized.

LocalStorage provides persistence across browser refreshes.

## Limitations

This is a frontend-only implementation. Authentication, database operations and backend APIs are simulated using local data and browser localStorage.
