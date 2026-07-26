'use client';

import { StarIcon } from './Icons';

const SELLERS = [
  {
    image: 'https://www.figma.com/api/mcp/asset/365e78fd-64a3-4ca4-8ff5-37881d84c909',
    name: 'John Doe',
    badge: 'Team',
    rating: '4.8',
    reviews: '8,89',
    completedJobs: 387,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/5b492be2-d1f4-4f61-910d-997a1856c652',
    name: 'Chris Gale',
    badge: 'Pro',
    rating: '4.9',
    reviews: '5,214',
    completedJobs: 259,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/a3b4ae63-d5ed-4287-bcf6-0d976e78c83b',
    name: 'Olivia Rhye',
    badge: 'Team',
    rating: '4.9',
    reviews: '721',
    completedJobs: 198,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/ef4c66ca-0d53-45b3-bcf3-249656d7bfbd',
    name: 'Sam Smith',
    badge: 'Pro',
    rating: '4.7',
    reviews: '612',
    completedJobs: 174,
  },
];

export default function TopSellersSection() {
  return (
    <section
      style={{
        padding: '96px 0',
        background: '#F8F0FF',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50px',
      }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(rgba(165, 74, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
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
              Our Providers
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
              Top Sellers on{' '}
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
              Hire the top talent from our amazing pool of sellers.
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
              background: '#ffffff',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#F8F0FF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#ffffff';
            }}
          >
            View All Sellers
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#A54AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}
        >
          {SELLERS.map((seller, i) => (
            <div
              key={seller.name}
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
              {/* Photo — inset with padding on top + sides */}
              <div style={{ padding: '10px 10px 0' }}>
                <div
                  style={{
                    height: '220px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#F8F0FF',
                  }}
                >
                  <img
                    src={seller.image}
                    alt={seller.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center bottom',
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px 18px 18px' }}>
                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#101828',
                    marginBottom: '6px',
                  }}
                >
                  {seller.name}
                </h3>

                {/* Rating row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '10px',
                  }}
                >
                  <StarIcon size={16} color="#F79009" />
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#101828',
                    }}
                  >
                    {seller.rating}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      color: '#98A2B3',
                    }}
                  >
                    |
                  </span>
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      color: '#667085',
                    }}
                  >
                    {seller.reviews} reviews
                  </span>
                </div>

                {/* Badge + Jobs row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: seller.badge === 'Pro' ? '#A54AFF' : '#079455',
                      background: seller.badge === 'Pro' ? '#F8F0FF' : '#ECFDF3',
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      border: seller.badge === 'Pro'
                        ? '1px solid #DFBAFF'
                        : '1px solid #A7F3D0',
                    }}
                  >
                    {seller.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px',
                      color: '#667085',
                    }}
                  >
                    {seller.completedJobs} jobs
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
