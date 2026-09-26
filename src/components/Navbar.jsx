import { LogOut, GraduationCap } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { currentUser, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <GraduationCap size={22} />
          </div>

          <div>
            <h1 className="font-bold text-slate-900">
              AssignmentHub
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Assignment Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {currentUser?.name}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {currentUser?.role}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
