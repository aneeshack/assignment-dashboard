import {
  CheckCircle2,
  ClipboardList,
  Users,
  Clock3,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { assignments } = useApp();

  const allStudents = assignments.flatMap(
    (assignment) => assignment.students
  );

  const totalStudents = new Set(
    allStudents.map((student) => student.id)
  ).size;

  const totalSubmissions = allStudents.filter(
    (student) => student.submitted
  ).length;

  const totalExpected =
    assignments.length * totalStudents;

  const overallProgress =
    totalExpected === 0
      ? 0
      : Math.round(
          (totalSubmissions / totalExpected) * 100
        );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Admin Dashboard
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Assignment Overview
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Monitor assignments and student submissions.
                </p>
              </div>

              <Link
                to="/admin/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Assignment
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Assignments"
                value={assignments.length}
                subtitle="Created assignments"
                icon={ClipboardList}
              />

              <StatCard
                title="Students"
                value={totalStudents}
                subtitle="Active students"
                icon={Users}
              />

              <StatCard
                title="Submitted"
                value={totalSubmissions}
                subtitle="Completed submissions"
                icon={CheckCircle2}
              />

              <StatCard
                title="Overall Progress"
                value={`${overallProgress}%`}
                subtitle="Across all assignments"
                icon={Clock3}
              />
            </div>

            <div className="mt-8 space-y-5">
              {assignments.map((assignment) => {
                const submitted = assignment.students.filter(
                  (student) => student.submitted
                ).length;

                const total = assignment.students.length;

                const percentage =
                  total === 0
                    ? 0
                    : Math.round((submitted / total) * 100);

                return (
                  <div
                    key={assignment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {assignment.subject}
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          {assignment.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Due{" "}
                          {new Date(
                            assignment.dueDate
                          ).toLocaleDateString("en-IN")}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-bold text-slate-900">
                          {percentage}%
                        </p>

                        <p className="text-xs text-slate-500">
                          {submitted} of {total} submitted
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <ProgressBar value={percentage} />
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <h4 className="mb-4 text-sm font-bold text-slate-800">
                        Student Submission Status
                      </h4>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {assignment.students.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {student.name}
                              </p>

                              <p className="text-xs text-slate-500">
                                {student.email}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                student.submitted
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {student.submitted
                                ? "Submitted"
                                : "Not Submitted"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}