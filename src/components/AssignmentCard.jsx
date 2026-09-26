import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import ProgressBar from "./ProgressBar";

export default function AssignmentCard({
  assignment,
  student,
  onSubmit,
}) {
  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const submitted = student?.submitted;

  const handleConfirm = () => {
    onSubmit(assignment.id, student.id);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText size={22} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-900">
                  {assignment.title}
                </h3>

                {submitted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={13} />
                    Submitted
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-indigo-600">
                {assignment.subject}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />
            Due{" "}
            {new Date(assignment.dueDate).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          {assignment.description}
        </p>

        <div className="mt-5">
          <ProgressBar
            label="Your progress"
            value={submitted ? 100 : 50}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Open Submission Drive
            <ExternalLink size={16} />
          </a>

          {!submitted ? (
            <button
              onClick={() => setShowConfirmation(true)}
              className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Yes, I have submitted
            </button>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Submission confirmed ✓
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        description={`Please confirm that you have completed "${assignment.title}" and submitted your work through the provided Drive link.`}
      />
    </>
  );
}