"use client";

import React from "react";
import { ShieldCheck, X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-xs animate-fade-in"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl text-gray-900">
        <button
          onClick={onClose}
          aria-label="Close privacy notice"
          className="absolute top-5 right-5 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 id="privacy-modal-title" className="text-lg font-bold text-gray-900">
              Data Privacy & Security
            </h3>
            <p className="text-xs text-gray-500">How SkillPath AI processes your resume</p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm text-gray-700 leading-relaxed">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
            <span className="font-semibold text-gray-900">1. Ephemeral In-Memory Processing:</span>
            <p className="mt-1 text-gray-600 text-xs leading-normal">
              Your resume PDF or text is analyzed directly in server memory. It is never stored on disk,
              never written to a database, and never cached after your session completes.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
            <span className="font-semibold text-gray-900">2. Server-Side Isolated AI Inference:</span>
            <p className="mt-1 text-gray-600 text-xs leading-normal">
              All AI inferences are performed strictly on the backend using Qwen-2.5 models via secure HTTPS
              endpoints. No API keys, credentials, or client tokens are ever exposed to browser bundles.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
            <span className="font-semibold text-gray-900">3. Zero Model Retraining:</span>
            <p className="mt-1 text-gray-600 text-xs leading-normal">
              Your inputs are treated as untrusted prompt data and are never used to train or fine-tune public foundation models.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
