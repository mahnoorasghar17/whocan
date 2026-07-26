'use client';

import { StarIcon, BookmarkIcon } from './Icons';

const SERVICE_IMAGE =
  'https://www.figma.com/api/mcp/asset/f29e8f2b-625e-4088-b547-f71c3e47d009';

const FAVORS = [
  {
    image: SERVICE_IMAGE,
    title: 'I will deep clean your home',
    price: '$253',
    tags: ['Cleaning', 'Home cleaning', 'Gardening', '+2'],
    sellerAvatar: 'https://www.figma.com/api/mcp/asset/365e78fd-64a3-4ca4-8ff5-37881d84c909',
    seller: 'Alfonzo Schuessler',
    sellerBadge: 'Pro',
    rating: '4.8',
    reviews: '8,89',
  },
  {
    image: SERVICE_IMAGE,
    title: 'I will fix all your electrical issues',
    price: '$180',
    tags: ['Electrical', 'Wiring', 'Safety'],
    sellerAvatar: 'https://www.figma.com/api/mcp/asset/5b492be2-d1f4-4f61-910d-997a1856c652',
    seller: 'James Thornton',
    sellerBadge: 'Team',
    rating: '4.9',
    reviews: '5,214',
  },
  {
    image: SERVICE_IMAGE,
    title: 'Professional furniture assembly service',
    price: '$95',
    tags: ['Assembly', 'Furniture', 'IKEA'],
    sellerAvatar: 'https://www.figma.com/api/mcp/asset/a3b4ae63-d5ed-4287-bcf6-0d976e78c83b',
    seller: 'Maria Santos',
    sellerBadge: 'Pro',
    rating: '4.7',
    reviews: '3,102',
  },
];

function TagPill({ label }: { label: string }) {
  const isExtra = label.startsWith('+');
  return (
    <span
      style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px',
        fontWeight: 500,
        color: isExtra ? '#A54AFF' : '#344054',
        background: isExtra ? '#F8F0FF' : '#F2F4F7',
        borderRadius: '9999px',
        padding: '4px 12px',
        whiteSpace: 'nowrap',
        border: isExtra ? '1px solid #DFBAFF' : '1px solid #EAECF0',
      }}
    >
      {label}
    </span>
  );
}

export default function TopFavorsSection() {
  return (
    <section
      id="favors"
      style={{ padding: '96px 0', background: '#ffffff' }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
          }}
        >
          <div>
            <p
              data-animate="fade"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: '#A54AFF',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Most Requested
            </p>
            <h2
              data-animate
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '1.2',
                color: '#101828',
                letterSpacing: '-0.01em',
              }}
            >
              Top Favors on{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                WhoCan
              </span>
            </h2>
            <p
              data-animate
              data-delay="1"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                color: '#475467',
                marginTop: '8px',
              }}
            >
              People are requesting these favors the most
            </p>
          </div>

          <a
            href="#"
            data-animate="fade"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: '#A54AFF',
              padding: '10px 20px',
              borderRadius: '9999px',
              border: '1.5px solid #A54AFF',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#F8F0FF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            View All Favors
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#A54AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {FAVORS.map((favor, i) => (
            <div
              key={favor.title}
              data-animate
              data-delay={String(i + 1)}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #EAECF0',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(165, 74, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#EAECF0';
              }}
            >
              {/* Image — inset with padding on top + sides, rounded corners */}
              <div style={{ padding: '10px 10px 0' }}>
                <div
                  style={{
                    height: '200px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={favor.image}
                    alt={favor.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                    }}
                  />
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '16px 16px 18px' }}>

                {/* 1. Title */}
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#101828',
                    lineHeight: '1.4',
                    marginBottom: '10px',
                  }}
                >
                  {favor.title}
                </h3>

                {/* 2. Tags — regular tags clip on overflow, +N always pinned at end */}
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                    marginBottom: '12px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Regular tags: nowrap + overflow hidden so they never push +N down */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'nowrap',
                      overflow: 'hidden',
                      flex: 1,
                    }}
                  >
                    {favor.tags
                      .filter((t) => !t.startsWith('+'))
                      .map((tag) => (
                        <TagPill key={tag} label={tag} />
                      ))}
                  </div>
                  {/* +N pill — always visible, never wraps */}
                  {favor.tags.find((t) => t.startsWith('+')) && (
                    <TagPill
                      label={favor.tags.find((t) => t.startsWith('+'))!}
                    />
                  )}
                </div>

                {/* 3. Price — large, brand colour */}
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: '24px',
                    background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '14px',
                    lineHeight: '1',
                  }}
                >
                  {favor.price}
                </p>

                {/* 4. Seller row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #EAECF0',
                    marginBottom: '12px',
                  }}
                >
                  <img
                    src={favor.sellerAvatar}
                    alt={favor.seller}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '9999px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#101828',
                      flex: 1,
                    }}
                  >
                    {favor.seller}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: favor.sellerBadge === 'Pro' ? '#A54AFF' : '#079455',
                      background: favor.sellerBadge === 'Pro' ? '#F8F0FF' : '#ECFDF3',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      border: favor.sellerBadge === 'Pro' ? '1px solid #DFBAFF' : '1px solid #A7F3D0',
                    }}
                  >
                    {favor.sellerBadge}
                  </span>
                </div>

                {/* 5. Rating + bookmark */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <StarIcon size={14} color="#F79009" />
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#101828',
                      }}
                    >
                      {favor.rating}
                    </span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#98A2B3' }}>|</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#667085' }}>
                      {favor.reviews} reviews
                    </span>
                  </div>

                  <button
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1.5px solid #EAECF0',
                      borderRadius: '9999px',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '#A54AFF';
                      el.style.background = '#F8F0FF';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '#EAECF0';
                      el.style.background = '#ffffff';
                    }}
                  >
                    <BookmarkIcon size={15} color="#667085" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
