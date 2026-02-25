"use client";

import React, { useEffect } from "react";
import css from "./ConfirmModal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.btnClose} onClick={onClose} aria-label="Close">
          <svg width="24" height="24">
            <use href="/sprite-final-opt.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={css.title}>{"Ви точно хочете вийти?"}</h2>
        <p className={css.message}>{"Ми будемо сумувати за вами!"}</p>
        <div className={css.actions}>
          <button className={css.btnCancel} onClick={onClose}>
            {"Відмінити"}
          </button>
          <button className={css.btnConfirm} onClick={onConfirm}>
            {"Вийти"}
          </button>
        </div>
      </div>
    </div>
  );
}
