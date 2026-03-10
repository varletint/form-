import { fetchClient } from "./client";

// Shared interfaces that map to our backend schemas
export interface FormResponse {
  id: string;
  status: "draft" | "submitted";
  answers: Record<string, any>;
  started_at?: string;
  last_saved_at?: string;
  submitted_at?: string;
}

export const formsApi = {
  /**
   * Initializes a new form session
   * @param formId Optional ID of the form template if we had multiple forms
   */
  initSession: () => {
    return fetchClient<FormResponse>("", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  /**
   * Auto-saves the current draft answers
   * @param id The session UUID
   * @param answers The current record of answers
   */
  autoSave: (id: string, answers: Record<string, any>) => {
    return fetchClient<FormResponse>(`/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ answers }),
    });
  },

  /**
   * Submits the form wrapper
   * @param id The session UUID
   */
  submit: (id: string) => {
    return fetchClient<{ message: string; data: FormResponse }>(
      `/${id}/submit`,
      {
        method: "POST",
      }
    );
  },
};
