/**
 * ContactModal — modal wrapper around ContactForm.
 *
 * Per Yuki amend §2.1 (briefs/yuki_landing_amend_tagline_contact_20260526.md d2f44e6b).
 * Native <dialog>, ~480px, scrim, Esc + scrim-click close, focus-trap by default.
 * CSS fade+lift (framer-motion not installed; spec permits CSS fallback).
 *
 * Reuses existing ContactForm.tsx component (Yuki §3). Headline locked to
 * "Get in touch." (Sub-copy removed per r2 amend 3.)
 */
import { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Esc + scrim-click → close. <dialog> emits 'cancel' on Esc; click on
  // dialog backdrop has target === dialog (form content stops propagation).
  function onCancel(e: React.SyntheticEvent<HTMLDialogElement>) {
    e.preventDefault();
    onClose();
  }
  function onClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel}
      onClick={onClick}
      aria-labelledby="contact-modal-heading"
      style={{
        padding: 0,
        border: 'none',
        borderRadius: 6,
        background: 'transparent',
        maxWidth: 480,
        width: 'calc(100% - 32px)',
      }}
    >
      <div
        style={{
          background: 'var(--bg-base, #060d1f)',
          color: 'var(--brand-mist)',
          border: '1px solid var(--border-default)',
          borderRadius: 6,
          padding: '28px 28px 22px',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 180ms ease, transform 180ms ease',
        }}
      >
        <h2
          id="contact-modal-heading"
          style={{
            fontFamily: "'Newsreader', serif",
            fontWeight: 400,
            fontSize: 22,
            letterSpacing: '0.02em',
            color: 'var(--brand-mist)',
            textAlign: 'center',
            margin: '0 0 6px',
          }}
        >
          Get in touch.
        </h2>
        <div style={{ marginBottom: 18 }} />
        <ContactForm onClose={onClose} />
      </div>
    </dialog>
  );
}
