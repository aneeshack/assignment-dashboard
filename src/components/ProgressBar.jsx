export default function ProgressBar({
  value,
  label,
  showValue = true,
}) {
  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-slate-700">
            {label}
          </span>

          {showValue && (
            <span className="font-semibold text-indigo-600">
              {value}%
            </span>
          )}
        </div>
      )}

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}