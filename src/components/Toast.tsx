"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X, Sparkles } from "lucide-react";

export interface ToastProps {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, message, type = "success", duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div
      role="alert"
      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm sm:max-w-md w-full ${
        isSuccess
          ? "bg-[#0d1326]/90 border-gold-500/40 text-slate-100 shadow-[0_10px_35px_-5px_rgba(245,197,66,0.25)]"
          : isError
          ? "bg-[#1f0e13]/90 border-rose-500/40 text-slate-100 shadow-[0_10px_35px_-5px_rgba(244,63,94,0.25)]"
          : "bg-[#0e172a]/90 border-sky-500/40 text-slate-100 shadow-xl"
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
          isSuccess
            ? "bg-gold-500/15 text-gold-400 border border-gold-500/30"
            : isError
            ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
            : "bg-sky-500/15 text-sky-400 border border-sky-500/30"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-gold-400" />
        ) : isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400" />
        ) : (
          <Sparkles className="w-5 h-5 text-sky-400" />
        )}
      </div>

      <div className="flex-1 text-sm font-medium text-slate-200">{message}</div>

      <button
        onClick={() => onClose(id)}
        aria-label="Đóng thông báo"
        className="flex-shrink-0 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
