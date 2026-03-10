import { useState, useEffect, useCallback, useRef } from "react";
import { formsApi, type FormResponse } from "../api/forms";

interface UseFormSessionOptions {
  autoSaveInterval?: number;
}

export const useFormSession = ({
  autoSaveInterval = 1500,
}: UseFormSessionOptions = {}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const [isInitializing, setIsInitializing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // We use a ref to track the latest answers without triggering the auto-save effect infinitely
  // or dealing with stale closures in the debounced function.
  const answersRef = useRef(answers);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // 1. Initialize Session
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setIsInitializing(true);
        // In a real app we might check localStorage for an existing session ID first
        const storedSession = localStorage.getItem("form_session_id");

        let response: FormResponse;
        if (!storedSession) {
          response = await formsApi.initSession();
          localStorage.setItem("form_session_id", response.id);
        } else {
          // Ideally we'd have a GET endpoint to fetch the draft, but since we don't,
          // we'll just use the stored ID. The auto-save PATCH will continue to work.
          response = { id: storedSession, status: "draft", answers: {} };
        }

        if (mounted) {
          setSessionId(response.id);
          // If we had a GET endpoint we would set initial answers here
          setIsInitializing(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Failed to initialize form session");
          setIsInitializing(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // 2. Debounced Auto-Save
  useEffect(() => {
    if (
      !sessionId ||
      isInitializing ||
      Object.keys(answersRef.current).length === 0
    ) {
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setIsSaving(true);
        setError(null);
        await formsApi.autoSave(sessionId, answersRef.current);
        setLastSaved(new Date());
      } catch (err: any) {
        setError(err.message || "Failed to auto-save draft");
      } finally {
        setIsSaving(false);
      }
    }, autoSaveInterval);

    return () => {
      clearTimeout(handler);
    };
  }, [answers, sessionId, autoSaveInterval, isInitializing]);

  // 3. Update Answers Function
  const updateAnswers = useCallback(
    (
      newAnswers:
        | Record<string, any>
        | ((prev: Record<string, any>) => Record<string, any>)
    ) => {
      setAnswers((prev) => {
        const updated =
          typeof newAnswers === "function" ? newAnswers(prev) : newAnswers;
        return { ...prev, ...updated };
      });
    },
    []
  );

  // 4. Submit Form Function
  const submitForm = useCallback(async () => {
    if (!sessionId) return false;

    try {
      setIsSubmitting(true);
      setError(null);
      // Ensure we auto-save the very latest before submitting, just in case
      await formsApi.autoSave(sessionId, answersRef.current);
      await formsApi.submit(sessionId);

      // Clear session after successful submission
      localStorage.removeItem("form_session_id");
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to submit form");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId]);

  const clearSession = useCallback(() => {
    localStorage.removeItem("form_session_id");
    setSessionId(null);
    setAnswers({});
  }, []);

  return {
    sessionId,
    answers,
    updateAnswers,
    submitForm,
    clearSession,

    isInitializing,
    isSaving,
    isSubmitting,
    error,
    lastSaved,
  };
};
