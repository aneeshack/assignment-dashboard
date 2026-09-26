import {
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AssignmentCard from "../components/AssignmentCard";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";

export default function StudentDashboard() {
  const {
    assignments,
    currentUser,
    submitAssignment,
  } = useApp();

  const studentAssignments = assignments.map(
    (assignment) => ({
      assignment,
      student: assignment.students.find(
        (student) => student.id === currentUser.id
      ),
    })
  );

  const submittedCount = studentAssignments.filter(
    ({ student }) => student?.submitted
  ).length;

  const pendingCount =
    studentAssignments.length - submittedCount;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-semibold text-indigo-600">
                Student Dashboard
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Welcome back, {currentUser.name.split(" ")[0]} 👋
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Track your assignments and confirm your submissions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                title="Total Assignments"
                value={studentAssignments.length}
                subtitle="Assigned to you"
                icon={FileText}
              />

              <StatCard
                title="Submitted"
                value={submittedCount}
                subtitle="Successfully submitted"
                icon={CheckCircle2}
              />

              <StatCard
                title="Pending"
                value={pendingCount}
                subtitle="Awaiting submission"
                icon={Clock3}
              />
            </div>

            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  My Assignments
                </h3>

                <p className="text-sm text-slate-500">
                  View your assignments and update your submission status.
                </p>
              </div>

              <div className="space-y-4">
                {studentAssignments.map(
                  ({ assignment, student }) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      student={student}
                      onSubmit={submitAssignment}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}