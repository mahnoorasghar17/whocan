'use client';

import { StarIcon, HeartIcon } from './Icons';

const FAVORS = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=600&q=80',
    title: 'I will deep clean your home',
    price: '$253',
    sellerAvatar: 'https://www.figma.com/api/mcp/asset/365e78fd-64a3-4ca4-8ff5-37881d84c909',
    seller: 'Alfonzo Schuessler',
    sellerBadge: 'Pro',
    rating: '4.8',
    reviews: '8,89',
  },
  {
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&w=600&q=80',
    title: 'I will fix all your electrical issues',
    price: '$180',
    sellerAvatar: 'https://www.figma.com/api/mcp/asset/5b492be2-d1f4-4f61-910d-997a1856c652',
    seller: 'James Thornton',
    sellerBadge: 'Team',
    rating: '4.9',
    reviews: '5,214',
  },
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&w=600&q=80',
    title: 'Professional furniture assembly service',
    price: '$95',
    sellerAvatar: 'https://www.figma.com/api/mcp/asset/a3b4ae63-d5ed-4287-bcf6-0d976e78c83b',
    seller: 'Maria Santos',
    sellerBadge: 'Pro',
    rating: '4.7',
    reviews: '3,102',
  },
];

export default function TopFavorsSection() {
  return (
    <section id="favors" style={{ padding: '96px 0', background: '#ffffff' }}>
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#F8F0FF'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            View All Favors
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#A54AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
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
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(165, 74, 255, 0.3)';
                el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#EAECF0';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', padding: '10px 10px 0' }}>
                <div style={{ height: '200px', borderRadius: '14px', overflow: 'hidden' }}>
                  <img
                    src={favor.image}
                    alt={favor.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                </div>
                {/* Badge overlaid on image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: favor.sellerBadge === 'Pro'
                      ? 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 100%)'
                      : 'linear-gradient(135deg, #34D399 0%, #079455 100%)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.03em',
                  }}
                >
                  {favor.sellerBadge}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Seller row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <img
                    src={favor.sellerAvatar}
                    alt={favor.seller}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '9999px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      flexShrink: 0,
                      border: '2px solid #DFBAFF',
                    }}
                  />
                  <div>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', lineHeight: '1.2' }}>
                      {favor.seller}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <StarIcon size={12} color="#F79009" />
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#F79009' }}>
                        {favor.rating}
                      </span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#98A2B3' }}>
                        ({favor.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#101828',
                    lineHeight: '1.4',
                    flex: 1,
                    marginBottom: '16px',
                  }}
                >
                  {favor.title}
                </h3>

                {/* Bottom: heart + price */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #EAECF0',
                  }}
                >
                  <button
                    style={{
                      width: '36px',
                      height: '36px',
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
                      el.style.borderColor = '#F43F5E';
                      el.style.background = '#FFF1F2';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = '#EAECF0';
                      el.style.background = '#ffffff';
                    }}
                  >
                    <HeartIcon size={16} color="#98A2B3" />
                  </button>

                  <p
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 800,
                      fontSize: '26px',
                      background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: '1',
                    }}
                  >
                    {favor.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
