'use client';
import React, { useEffect } from 'react';
import css from './AuthNavModal.module.css';
interface AuthNavModalProps {
  isOpen: boolean;
  onLogIn: () => void;
  onRegister: () => void;
  onClose: () => void;
  title: string;
  message: string;
  LoginText?: string;
  RegisterText?: string;
}
export default function AuthNavModal({
  isOpen,
  onLogIn,
  onRegister,
  onClose,
  title,
  message,
  LoginText = 'Увійти',
  RegisterText = 'Зареєструватись',
}: AuthNavModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className={css.backdrop}
      onClick={onClose}>
      {' '}
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}>
        {' '}
        <button
          className={css.btnClose}
          onClick={onClose}
          aria-label="Close">
          {' '}
          <svg
            width="24"
            height="24">
            {' '}
            <use href="/sprite-final-opt.svg#icon-close"></use>{' '}
          </svg>{' '}
        </button>{' '}
        <h2 className={css.title}>{title}</h2>{' '}
        <p className={css.message}>{message}</p>{' '}
        <div className={css.actions}>
          {' '}
          <button
            className={css.btnLogin}
            onClick={onLogIn}>
            {' '}
            {LoginText}{' '}
          </button>{' '}
          <button
            className={css.btnRegister}
            onClick={onRegister}>
            {' '}
            {RegisterText}{' '}
          </button>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
