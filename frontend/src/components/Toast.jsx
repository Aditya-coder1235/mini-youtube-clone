import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const styles = {
  success: { icon: CheckCircle2, ring: "text-ion-400", glow: "shadow-[0_0_24px_-6px_rgba(61,214,237,0.55)]" },
  error: { icon: XCircle, ring: "text-ember-400", glow: "shadow-[0_0_24px_-6px_rgba(255,77,109,0.55)]" },
  info: { icon: Info, ring: "text-plasma-400", glow: "shadow-[0_0_24px_-6px_rgba(124,92,255,0.55)]" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  const toast = {
    success: (m) => push(m, "success"),
    error: (m) => push(m, "error"),
    info: (m) => push(m, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2.5 w-[min(360px,calc(100vw-2rem))]">
        {toasts.map((t) => {
          const s = styles[t.type] || styles.info;
          const Icon = s.icon;
          return (
            <div
              key={t.id}
              role="status"
              className={`glass-strong animate-rise flex items-start gap-3 rounded-2xl px-4 py-3 ${s.glow}`}
            >
              <Icon size={19} className={`mt-0.5 shrink-0 ${s.ring}`} />
              <p className="flex-1 text-sm text-mist-200 leading-snug">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="text-mist-500 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
