/**
 * ContactForm — mailto variant for standalone actaclara.com.
 *
 * Original demo-app version POSTed to /api/contact (Kai backend). The
 * standalone website has no backend, so on submit we open a mailto: link
 * pre-filled with name/email/company/message and let the user's mail client
 * deliver it to contact@actaclara.com.
 *
 * Honeypot field retained for parity with the demo-app shape.
 */

import { useState } from 'react';

interface FieldStyle {
  label: React.CSSProperties;
  input: React.CSSProperties;
}

const fieldStyle: FieldStyle = {
  label: {
    display: 'block',
    fontFamily: "'DM Mono', monospace",
    fontWeight: 400,
    fontSize: 9,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: '#3a5888',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    background: '#040c1e',
    border: '1px solid var(--border-default)',
    borderRadius: 4,
    color: 'var(--brand-mist)',
    fontFamily: "'Newsreader', serif",
    fontSize: 16,
    padding: '10px 12px',
    outline: 'none',
  },
};

export default function ContactForm({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [nameBlurError, setNameBlurError] = useState(false);
  const [emailBlurError, setEmailBlurError] = useState(false);
  const canSubmit = name.trim().length > 0 && email.trim().length > 0;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      setNameBlurError(name.trim().length === 0);
      setEmailBlurError(email.trim().length === 0);
      return;
    }
    // Honeypot — silently no-op if bot filled it.
    if (website.trim().length > 0) return;
    const subject = `ActaClara inquiry from ${name}${company ? ` (${company})` : ''}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : '',
      '',
      message,
    ].filter(Boolean);
    const mailto =
      `mailto:contact@actaclara.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 560,
        margin: '0 auto',
        padding: '8px 0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* honeypot — visually hidden, bots fill */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: 1,
          height: 1,
          opacity: 0,
        }}
        aria-hidden="true"
      />

      <div>
        <label htmlFor="cf-name" style={fieldStyle.label}>Name</label>
        <input
          id="cf-name"
          type="text"
          required
          maxLength={120}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim().length > 0) setNameBlurError(false);
          }}
          onBlur={() => setNameBlurError(name.trim().length === 0)}
          style={fieldStyle.input}
        />
        {nameBlurError && (
          <div role="alert" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#e08a8a', marginTop: 4, letterSpacing: '0.04em' }}>
            Name is required.
          </div>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" style={fieldStyle.label}>Email</label>
        <input
          id="cf-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value.trim().length > 0) setEmailBlurError(false);
          }}
          onBlur={() => setEmailBlurError(email.trim().length === 0)}
          style={fieldStyle.input}
        />
        {emailBlurError && (
          <div role="alert" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#e08a8a', marginTop: 4, letterSpacing: '0.04em' }}>
            Email is required.
          </div>
        )}
      </div>

      <div>
        <label htmlFor="cf-company" style={fieldStyle.label}>Company</label>
        <input
          id="cf-company"
          type="text"
          maxLength={120}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={fieldStyle.input}
        />
      </div>

      <div>
        <label htmlFor="cf-message" style={fieldStyle.label}>Message</label>
        <textarea
          id="cf-message"
          minLength={10}
          maxLength={4000}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...fieldStyle.input, resize: 'vertical', fontSize: 15 }}
        />
      </div>

      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#3a5888', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Opens your email client &nbsp;·&nbsp; or write us directly at{' '}
        <a href="mailto:contact@actaclara.com" style={{ color: 'var(--brand-sky)' }}>
          contact@actaclara.com
        </a>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
        <button
          type="submit"
          disabled={!canSubmit}
          style={{
            background: 'var(--brand-blue)',
            color: 'var(--brand-mist)',
            border: 'none',
            borderRadius: 4,
            padding: '11px 22px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: !canSubmit ? 'not-allowed' : 'pointer',
            opacity: !canSubmit ? 0.6 : 1,
          }}
        >
          Send
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-default)',
              borderRadius: 4,
              padding: '11px 18px',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
