import { useState, useRef } from "react";

type AlertType = "success" | "danger";

type AlertState = {
  type: AlertType;
  message: string;
} | null;

export const useAlert = (defaultTimeout: number = 3000) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAlert = (
    type: AlertType,
    message: string,
    timeout: number = defaultTimeout,
  ): void => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    setAlert({ type, message });

    timeRef.current = setTimeout(() => {
      setAlert(null);
      timeRef.current = null;
    }, timeout);
  };

  return {
    alert,
    success: (msg: string, timeout?: number) =>
      showAlert("success", msg, timeout),
    error: (msg: string, timeout?: number) => showAlert("danger", msg, timeout),
    clear: (): void => setAlert(null),
  };
};
