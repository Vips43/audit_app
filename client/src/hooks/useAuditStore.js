import { create } from "zustand";

export const useAuditStore = create((set) => ({
  auditTitle: `Audit Assessment - ${new Date().toLocaleDateString()}`,
  auditorName: "",
  draftResponses: {},
  activeReasonQuestionId: null,

  setAuditMetadata: (title, name) =>
    set({ auditTitle: title, auditorName: name }),

  updateStatus: (questionId, status) =>
    set((state) => {
      const current = state.draftResponses[questionId] || {
        status: "na",
        reason: "",
      };
      return {
        draftResponses: {
          ...state.draftResponses,
          [questionId]: { ...current, status },
        },
        activeReasonQuestionId:
          status === "fail" ? questionId : state.activeReasonQuestionId,
      };
    }),

  updateReason: (questionId, reason) =>
    set((state) => {
      const current = state.draftResponses[questionId] || {
        status: "na",
        reason: "",
      };
      return {
        draftResponses: {
          ...state.draftResponses,
          [questionId]: { ...current, reason },
        },
      };
    }),

  openReasonModal: (questionId) => set({ activeReasonQuestionId: questionId }),
  closeReasonModal: () => set({ activeReasonQuestionId: null }),

  clearDraft: () => set({ draftResponses: {}, activeReasonQuestionId: null }),
}));
