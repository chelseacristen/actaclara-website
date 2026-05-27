/**
 * LandingPage — actaclara.com root coming-soon page.
 *
 * Per Yuki amend spec briefs/yuki_landing_amend_tagline_contact_20260526.md (d2f44e6b):
 *   - tagline removed
 *   - single CTA "Contact" → opens ContactModal (header text-link removed per r2 amend 1)
 *   - footer minimal: "© 2026 ActaClara" (no LinkedIn / mailto / Privacy / Terms)
 *   - deep-link ?contact=open opens modal on page load
 * Per r2 amend (briefs/felix_landing_amend_r2_20260527.md):
 *   - header Contact link removed (hero CTA is the only Contact entry)
 *   - "Coming soon." → uppercase Syne "COMING SOON" micro-tagline
 */

import { useEffect, useState } from 'react';
import ChevronLogo from '../components/ChevronLogo';
import ContactModal from '../components/ContactModal';

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // Deep-link: ?contact=open opens the modal on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('contact') === 'open') setModalOpen(true);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-base)',
        color: 'var(--brand-mist)',
      }}
    >
      {/* Masthead — wordmark only (Contact link removed per r2 amend 1) */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '22px 52px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ChevronLogo width={28} height={22} />
          <span
            style={{
              fontFamily: "'Newsreader', serif",
              fontWeight: 400,
              fontSize: 18,
              letterSpacing: '0.03em',
              color: 'var(--brand-mist)',
            }}
          >
            ActaClara
          </span>
        </div>
      </header>

      {/* Hero */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          width: '100%',
          maxWidth: 880,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <ChevronLogo width={96} height={77} />

        <h1
          style={{
            marginTop: 28,
            fontFamily: "'Newsreader', serif",
            fontWeight: 400,
            fontSize: 56,
            letterSpacing: '0.05em',
            lineHeight: 1.05,
            color: 'var(--brand-mist)',
          }}
        >
          Acta
          <span style={{ fontStyle: 'italic', color: 'var(--brand-sky)' }}>
            Clara
          </span>
        </h1>

        <div
          style={{
            marginTop: 36,
            marginBottom: 24,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: '0.40em',
            textTransform: 'uppercase',
            color: 'var(--brand-mist)',
          }}
        >
          {/* Flip to "Quickly try it" via single string edit below if desired. */}
          COMING SOON
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            marginTop: 36,
            background: 'var(--brand-blue)',
            color: 'var(--brand-mist)',
            border: 'none',
            borderRadius: 4,
            padding: '13px 26px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 120ms ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'var(--brand-sky)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'var(--brand-blue)')
          }
        >
          Contact
        </button>
      </main>

      {/* Footer — minimal per Yuki amend §2.4 */}
      <footer
        style={{
          padding: '22px 52px 28px',
          textAlign: 'center',
          fontFamily: "'DM Mono', monospace",
          fontWeight: 400,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#3a5070',
        }}
      >
        © 2026 ActaClara
      </footer>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
