'use client';

const FOOTER_LINKS = {
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Services: ['Cleaning', 'Repairing', 'Electrical', 'Gardening'],
  Support: ['Help Center', 'Contact Us', 'Safety', 'Community'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
};

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 2.163c2.518 0 2.815.01 3.803.055.993.045 1.535.21 1.892.35.476.184.815.404 1.172.761.357.357.577.696.762 1.172.14.357.305.9.35 1.892.045.988.055 1.285.055 3.803s-.01 2.815-.055 3.803c-.045.993-.21 1.535-.35 1.892a3.155 3.155 0 01-.762 1.172 3.155 3.155 0 01-1.172.761c-.357.14-.9.305-1.892.35-.988.045-1.285.055-3.803.055s-2.815-.01-3.803-.055c-.993-.045-1.535-.21-1.892-.35a3.155 3.155 0 01-1.172-.761 3.155 3.155 0 01-.761-1.172c-.14-.357-.305-.9-.35-1.892C2.173 12.815 2.163 12.518 2.163 10s.01-2.815.055-3.803c.045-.993.21-1.535.35-1.892.185-.476.404-.815.761-1.172a3.155 3.155 0 011.172-.762c.357-.14.9-.305 1.892-.35C7.185 2.173 7.482 2.163 10 2.163zm0 1.838c-2.473 0-2.745.01-3.712.053-.895.04-1.381.19-1.704.316a2.83 2.83 0 00-1.049.682 2.83 2.83 0 00-.682 1.049c-.125.323-.275.809-.316 1.704-.043.967-.052 1.24-.052 3.712s.01 2.745.052 3.712c.041.895.191 1.381.316 1.704.166.43.39.75.682 1.049.3.3.619.516 1.049.682.323.125.809.275 1.704.316C7.255 17.99 7.527 18 10 18s2.745-.01 3.712-.052c.895-.041 1.381-.191 1.704-.316a2.83 2.83 0 001.049-.682 2.83 2.83 0 00.682-1.049c.125-.323.275-.809.316-1.704.043-.967.052-1.24.052-3.712s-.01-2.745-.052-3.712c-.041-.895-.191-1.381-.316-1.704a2.83 2.83 0 00-.682-1.049 2.83 2.83 0 00-1.049-.682c-.323-.125-.809-.275-1.704-.316C12.745 4.01 12.473 4 10 4zm0 3.135a3.865 3.865 0 110 7.73 3.865 3.865 0 010-7.73zm0 1.838a2.027 2.027 0 100 4.054 2.027 2.027 0 000-4.054zm3.965-3.098a.9.9 0 110 1.8.9.9 0 010-1.8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0D0120',
        borderTop: '1px solid rgba(165, 74, 255, 0.15)',
        padding: '64px 0 32px',
      }}
    >
      <div className="container">
        {/* Top row: logo + links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background:
                    'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                WhoCan
              </span>
            </div>

            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                lineHeight: '1.65',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '24px',
                maxWidth: '220px',
              }}
            >
              Your trusted marketplace for home services — find skilled
              handymen in your neighbourhood, fast.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <InstagramIcon />, label: 'Instagram' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(165, 74, 255, 0.2)';
                    el.style.borderColor = 'rgba(165, 74, 255, 0.4)';
                    el.style.color = '#CA90FF';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.06)';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                    el.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.45)',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = '#CA90FF';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          'rgba(255,255,255,0.45)';
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(165, 74, 255, 0.3), transparent)',
            marginBottom: '24px',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            © {new Date().getFullYear()} WhoCan. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    'rgba(255,255,255,0.7)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    'rgba(255,255,255,0.3)';
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
