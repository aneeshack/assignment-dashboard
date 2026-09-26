import { createContext, useContext, useEffect, useState } from "react";
import { initialAssignments } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("assignments");

    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");

    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const submitAssignment = (assignmentId, studentId) => {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) => {
        if (assignment.id !== assignmentId) {
          return assignment;
        }

        return {
          ...assignment,
          students: assignment.students.map((student) =>
            student.id === studentId
              ? { ...student, submitted: true }
              : student
          ),
        };
      })
    );
  };

  const createAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: `assignment-${Date.now()}`,
      createdBy: currentUser?.id,
      createdAt: new Date().toISOString(),
      students: [
        {
          id: "student-1",
          name: "Aneesha C.K",
          email: "aneesha@example.com",
          submitted: false,
        },
        {
          id: "student-2",
          name: "Rahul Kumar",
          email: "rahul@example.com",
          submitted: false,
        },
        {
          id: "student-3",
          name: "Anjali S",
          email: "anjali@example.com",
          submitted: false,
        },
        {
          id: "student-4",
          name: "Arjun P",
          email: "arjun@example.com",
          submitted: false,
        },
      ],
    };

    setAssignments((currentAssignments) => [
      newAssignment,
      ...currentAssignments,
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        assignments,
        currentUser,
        login,
        logout,
        submitAssignment,
        createAssignment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}