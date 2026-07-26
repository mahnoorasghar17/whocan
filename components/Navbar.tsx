'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Explore', href: '#favors' },
  { label: 'My Bookings', href: '#' },
  { label: 'Custom Favor', href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="hero-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '12px 24px',
        transition: 'all 0.3s ease',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(26, 10, 46, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '9999px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled
            ? '0px 4px 24px rgba(165, 74, 255, 0.12)'
            : '0px 4px 24px rgba(0, 0, 0, 0.2)',
          border: scrolled
            ? '1px solid rgba(165, 74, 255, 0.15)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              color: scrolled ? '#101828' : '#ffffff',
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease',
            }}
          >
            WhoCan
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '4px',
            alignItems: 'center',
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: scrolled ? '#344054' : 'rgba(255,255,255,0.9)',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  transition: 'all 0.2s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = scrolled
                    ? 'rgba(165, 74, 255, 0.08)'
                    : 'rgba(255,255,255,0.1)';
                  el.style.color = scrolled ? '#A54AFF' : '#ffffff';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'transparent';
                  el.style.color = scrolled ? '#344054' : 'rgba(255,255,255,0.9)';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="#app"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: '#101828',
              background: '#FEC84B',
              padding: '8px 16px',
              borderRadius: '9999px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#FDB022';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#FEC84B';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get App
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: scrolled ? '#344054' : 'rgba(255,255,255,0.9)',
              padding: '8px 14px',
              borderRadius: '9999px',
              transition: 'color 0.2s ease',
            }}
          >
            Log in
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)',
              padding: '8px 20px',
              borderRadius: '9999px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 12px rgba(165, 74, 255, 0.35)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundImage =
                'linear-gradient(135deg, #C985FF 0%, #B05AFF 50%, #9040EE 100%)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 16px rgba(165, 74, 255, 0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundImage =
                'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 2px 12px rgba(165, 74, 255, 0.35)';
            }}
          >
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
}
