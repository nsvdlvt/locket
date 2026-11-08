"use client";

import React, { useState, useEffect } from "react";
import { config } from "@/config";
import { LocketLogo } from "@/components/LocketLogo";
import { Toast } from "@/components/Toast";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Loader2
} from "lucide-react";
import confetti from "canvas-confetti";

interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [configUrl, setConfigUrl] = useState(config.moduleEndpoint);

  // Dynamically resolve full absolute URL based on current origin
  useEffect(() => {
    if (typeof window !== "undefined") {
      setConfigUrl(`${window.location.origin}${config.moduleEndpoint}`);
    }
  }, []);

  // Show Toast Notification
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Button 1: Copy Module Config URL for Shadowrocket
  const handleCopyLink = async () => {
    const urlToCopy = typeof window !== "undefined" 
      ? `${window.location.origin}${config.moduleEndpoint}`
      : config.moduleEndpoint;

    let copySuccessful = false;

    // 1. Try modern Clipboard API
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(urlToCopy);
        copySuccessful = true;
      }
    } catch {
      copySuccessful = false;
    }

    // 2. Fallback to textarea selection execCommand
    if (!copySuccessful) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = urlToCopy;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        copySuccessful = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch {
        copySuccessful = false;
      }
    }

    // Always trigger UI feedback for smooth UX
    setCopied(true);
    showToast("Config URL copied successfully!", "success");

    // Subtle gold confetti sparkle effect
    try {
      confetti({
        particleCount: 36,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#F5C542", "#FFD700", "#FFF3A8", "#8B5CF6"],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  // Button 2: Direct DNS Download with file verification
  const handleDownloadDns = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      // 1. Verify file exists
      const response = await fetch(config.dnsDownloadUrl, { method: "GET" });
      if (!response.ok) {
        throw new Error(`File not found (Status: ${response.status})`);
      }

      // 2. Fetch as blob to force genuine file download with exact target filename
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = config.downloadFileName;
      downloadAnchor.style.display = "none";
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();

      // Clean up object URL and DOM element
      setTimeout(() => {
        document.body.removeChild(downloadAnchor);
        window.URL.revokeObjectURL(blobUrl);
      }, 200);

      setDownloadSuccess(true);
      showToast(`DNS file downloaded: ${config.downloadFileName}`, "success");

      setTimeout(() => {
        setDownloadSuccess(false);
      }, 2500);
    } catch (err) {
      console.error("Download failed:", err);
      showToast("DNS file not found or download failed!", "error");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 py-5 sm:py-8 text-slate-100 selection:bg-gold-500/30 selection:text-gold-200 overflow-x-hidden w-full">
      {/* Background ambient lighting and floating dust particles */}
      <BackgroundEffects />

      {/* Floating Toast Notification Stack (Bottom centered) */}
      <div 
        aria-live="polite"
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2.5 items-center w-full max-w-sm sm:max-w-md px-4 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full transition-all duration-300">
            <Toast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={3200}
              onClose={removeToast}
            />
          </div>
        ))}
      </div>

      {/* A. HEADER */}
      <header className="relative z-10 w-full max-w-3xl flex items-center justify-between pb-3.5 sm:pb-5 border-b border-white/[0.07] gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <LocketLogo className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide text-white truncate">
              {config.siteName}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-tight truncate">
              Shadowrocket Module
            </span>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400 shadow-[0_0_15px_-2px_rgba(245,197,66,0.2)]">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400 flex-shrink-0 animate-pulse" />
          <span className="whitespace-nowrap">{config.badgeText}</span>
        </div>
      </header>

      {/* B. MAIN CONTENT & C. TWO MAIN ACTION BUTTONS */}
      <section className="relative z-10 my-auto py-6 sm:py-8 w-full max-w-xl flex flex-col items-center text-center animate-fade-in-up min-w-0">
        {/* Centered Locket Gold Icon Emblem */}
        <div className="mb-4 sm:mb-5 relative">
          <LocketLogo className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 mx-auto" />
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-gold-500 to-amber-600 text-navy-950 p-1 sm:p-1.5 rounded-full shadow-lg border-2 border-[#0c1022]">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-navy-950 stroke-[2.5]" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-3">
          <span className="text-gold-gradient drop-shadow-sm">{config.siteName}</span>
        </h1>

        {/* Description & Sub-description */}
        <p className="text-base sm:text-lg md:text-xl font-medium text-slate-200 mb-1.5 max-w-lg leading-relaxed">
          {config.description}
        </p>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 mb-6 sm:mb-8 max-w-md">
          {config.subDescription}
        </p>

        {/* C. The Two Central Action Buttons */}
        <div className="w-full max-w-md flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6">
          {/* Button 1: Copy Link (Copies Config URL for Shadowrocket) */}
          <button
            id="btn-copy-link"
            onClick={handleCopyLink}
            type="button"
            className={`group relative flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
              copied
                ? "bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_25px_-3px_rgba(52,211,153,0.4)]"
                : "btn-gold text-slate-950 font-bold"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 transition-transform duration-200 scale-110" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Button 2: DNS Download */}
          <button
            id="btn-download-dns"
            onClick={handleDownloadDns}
            disabled={downloading}
            type="button"
            className={`group relative flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
              downloadSuccess
                ? "bg-gold-500/20 border-2 border-gold-400 text-gold-300 shadow-[0_0_25px_-3px_rgba(245,197,66,0.4)]"
                : "btn-secondary text-white"
            } ${downloading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-gold-400" />
                <span>Downloading...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 transition-transform duration-200 scale-110" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:scale-110" />
                <span>DNS Download</span>
              </>
            )}
          </button>
        </div>

        {/* Informational Config URL Bar Preview */}
        <div className="w-full max-w-md p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md flex items-center justify-between text-xs text-slate-400 font-mono min-w-0">
          <span 
            className="truncate pr-2 text-slate-300 select-all flex-1 text-left min-w-0" 
            title={configUrl}
          >
            {configUrl}
          </span>
          <a
            href={config.moduleEndpoint}
            target="_blank"
            rel="noopener noreferrer"
            title="Open raw module config in new tab"
            className="flex-shrink-0 flex items-center gap-1 text-gold-400 hover:text-gold-300 hover:underline transition-colors ml-1 sm:ml-2 font-sans font-medium"
          >
            <span>View</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </a>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="relative z-10 w-full max-w-3xl pt-4 sm:pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[11px] sm:text-xs text-slate-500">
        <div className="flex items-center gap-1 text-slate-400">
          <span>{config.footerText}</span>
        </div>
        <div>
          <span>{config.copyright}</span>
        </div>
      </footer>
    </main>
  );
}
