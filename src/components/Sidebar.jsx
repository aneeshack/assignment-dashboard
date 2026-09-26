import {
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { currentUser } = useApp();

  const links =
    currentUser?.role === "admin"
      ? [
          {
            to: "/admin",
            label: "Dashboard",
            icon: LayoutDashboard,
          },
          {
            to: "/admin/create",
            label: "Create Assignment",
            icon: PlusCircle,
          },
        ]
      : [
          {
            to: "/student",
            label: "My Assignments",
            icon: ClipboardList,
          },
        ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="sticky top-16 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <Icon size={19} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}