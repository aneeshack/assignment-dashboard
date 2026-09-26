// import Navbar from './components/Navbar'
// import ProgressBar from './components/ProgressBar'
// import Sidebar from './components/Sidebar'

// const App = () => {
//   return (
//     <div>
//       <Navbar/>
//       <Sidebar/>
//       <ProgressBar/>
//     </div>
//   )
// }

// export default App


import { Navigate, Route, Routes } from "react-router-dom";
import { useApp } from "./context/AppContext";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAssignment from "./pages/CreateAssignment";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children, role }) {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (role && currentUser.role !== role) {
    return (
      <Navigate
        to={
          currentUser.role === "admin"
            ? "/admin"
            : "/student"
        }
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create"
        element={
          <ProtectedRoute role="admin">
            <CreateAssignment />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;