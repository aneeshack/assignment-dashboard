import { GraduationCap, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (user) => {
    login(user);

    navigate(
      user.role === "admin"
        ? "/admin"
        : "/student"
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
            <GraduationCap size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            AssignmentHub
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Assignment & Review Dashboard
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">
            Choose your role
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Demo login for the technical assignment.
          </p>

          <div className="mt-6 space-y-3">
            {users.map((user) => {
              const isAdmin = user.role === "admin";

              return (
                <button
                  key={user.id}
                  onClick={() => handleLogin(user)}
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    {isAdmin ? (
                      <ShieldCheck size={21} />
                    ) : (
                      <UserRound size={21} />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {user.role === "admin"
                        ? "Professor / Admin"
                        : "Student"}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-indigo-600">
                    Continue →
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
            <strong className="text-slate-700">
              Demo note:
            </strong>{" "}
            This frontend uses mock data and localStorage because the assignment does not require a backend.
          </div>
        </div>
      </div>
    </div>
  );
}