import { useQuestions, useSubmitAudit } from "../hooks/useAuditQueries";
import { CheckCircle, XCircle, AlertCircle, Edit3 } from "lucide-react";
import { useAuditStore } from "../hooks/useAuditStore";

export const ChecklistView = () => {
  const { data: questions = [], isLoading, error } = useQuestions();
  const submitAuditMutation = useSubmitAudit();

  const {
    draftResponses,
    updateStatus,
    openReasonModal,
    auditTitle,
    auditorName,
  } = useAuditStore();
  
  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">
        Loading checklist templates...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load system questions.
      </div>
    );
  if (!questions && questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-white shadow-md rounded-lg mt-8 border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">
          No audit questions found in the database.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Please seed your database or add questions via the admin panel.
        </p>
      </div>
    );
  }
  const handleSubmit = () => {
    const formattedResponses = Object.entries(draftResponses).map(
      ([questionId, data]) => ({
        questionId,
        status: data.status,
        reason: data.reason,
      }),
    );

    submitAuditMutation.mutate({
      title: auditTitle,
      auditor: auditorName || "System Auditor",
      responses: formattedResponses,
      status: "submitted",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        {auditTitle}
      </h2>

      <div className="space-y-4">
        {questions &&
          questions?.map((q) => {
            const userSelection = draftResponses[q._id]?.status;
            const userReason = draftResponses[q._id]?.reason;

            return (
              <div
                key={q._id}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex flex-col md:flex-row justify-between items-start  gap-4">
                  <div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase tracking-wide">
                      {q.category}rt
                    </span>
                    <p className="mt-2 text-gray-700 font-medium">{q.text}</p>
                    {userReason && (
                      <p className="mt-1 text-xs text-amber-600 bg-amber-50 inline-block px-2 py-0.5 rounded">
                        Reason: {userReason}
                      </p>
                    )}
                  </div>

                  {/* Audit Checklist State Buttons */}
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => updateStatus(q._id, "pass")}
                      className={`p-2 rounded-md border transition ${
                        userSelection === "pass"
                          ? "bg-emerald-500 text-white border-emerald-600"
                          : "border-gray-200 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => updateStatus(q._id, "fail")}
                      className={`p-2 rounded-md border transition ${
                        userSelection === "fail"
                          ? "bg-rose-500 text-white border-rose-600"
                          : "border-gray-200 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => updateStatus(q._id, "na")}
                      className={`p-2 rounded-md border transition ${
                        userSelection === "na"
                          ? "bg-gray-400 text-white border-gray-500"
                          : "border-gray-200 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => openReasonModal(q._id)}
                      className="p-2 rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitAuditMutation.isPending}
        className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 transition"
      >
        {submitAuditMutation.isPending
          ? "Saving Assessment..."
          : "Submit Compliance Audit"}
      </button>
    </div>
  );
};
