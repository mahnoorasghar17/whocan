'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALL_FAVORS = Array.from({ length: 30 }, (_, i) => ({
  id: `favor-${i}`,
  image: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=500&q=80',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&w=500&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&w=500&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&w=500&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&w=500&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&w=500&q=80',
  ][i % 6],
  title: ['Deep Home Cleaning', 'Electrical Repairs', 'Furniture Assembly', 'Garden Landscaping', 'Interior Painting', 'Plumbing Fix'][i % 6],
  price: [253, 180, 95, 120, 300, 150][i % 6] + (i > 15 ? 20 : 0),
  badge: i % 3 === 0 ? 'Pro' : 'Team',
  rating: (4.6 + (i % 4) * 0.1).toFixed(1),
  reviews: (100 + i * 37).toLocaleString(),
  category: ['Cleaning', 'Electrical', 'Assembly', 'Gardening', 'Painting', 'Plumbing'][i % 6],
  sellerAvatar: [
    'https://www.figma.com/api/mcp/asset/365e78fd-64a3-4ca4-8ff5-37881d84c909',
    'https://www.figma.com/api/mcp/asset/5b492be2-d1f4-4f61-910d-997a1856c652',
    'https://www.figma.com/api/mcp/asset/a3b4ae63-d5ed-4287-bcf6-0d976e78c83b',
  ][i % 3],
  seller: ['Alfonzo S.', 'James T.', 'Maria R.', 'David K.', 'Sarah M.', 'Tom W.'][i % 6],
}));

const ALL_SELLERS = Array.from({ length: 20 }, (_, i) => ({
  id: `seller-${i}`,
  image: [
    'https://www.figma.com/api/mcp/asset/365e78fd-64a3-4ca4-8ff5-37881d84c909',
    'https://www.figma.com/api/mcp/asset/5b492be2-d1f4-4f61-910d-997a1856c652',
    'https://www.figma.com/api/mcp/asset/a3b4ae63-d5ed-4287-bcf6-0d976e78c83b',
    'https://www.figma.com/api/mcp/asset/ef4c66ca-0d53-45b3-bcf3-249656d7bfbd',
  ][i % 4],
  name: ['John Doe', 'Chris Gale', 'Olivia Rhye', 'Sam Smith', 'Emma Brown', 'Liam Jones', 'Sophie Lee', 'Ava Davis'][i % 8],
  badge: i % 3 === 0 ? 'Pro' : 'Team',
  rating: (4.6 + (i % 4) * 0.1).toFixed(1),
  reviews: `${(500 + i * 123).toLocaleString()}`,
  jobs: 150 + i * 23,
  specialty: ['Cleaning Expert', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Gardener'][i % 6],
}));

const CATEGORIES = ['All Categories', 'Gardening', 'Cleaning', 'Repairing', 'Electrical', 'Assembly'];
const COLS_FAVORS = 3;
const ROWS_PER_PAGE = 5;
const PAGE_FAVORS = COLS_FAVORS * ROWS_PER_PAGE;    // 15
const COLS_SELLERS = 4;
const PAGE_SELLERS = COLS_SELLERS * ROWS_PER_PAGE;  // 20

// ─── Component ────────────────────────────────────────────────────────────────

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchType, setSearchType] = useState<'favors' | 'sellers'>(
    (searchParams.get('type') as 'favors' | 'sellers') || 'favors'
  );
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All Categories');
  const [sortBy, setSortBy] = useState<'relevance' | 'price'>('relevance');
  const [typeDropOpen, setTypeDropOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_FAVORS);
  const [likedFavors, setLikedFavors] = useState<Set<string>>(new Set());
  const loaderRef = useRef<HTMLDivElement>(null);

  // Reset visible count when type or filters change
  useEffect(() => { setVisibleCount(searchType === 'favors' ? PAGE_FAVORS : PAGE_SELLERS); }, [searchType, activeCategory, sortBy]);

  // IntersectionObserver — auto-loads when loader sentinel is in view
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const handleSearch = () => {
    const params = new URLSearchParams({ q: query, type: searchType, ...(activeCategory !== 'All Categories' ? { category: activeCategory } : {}) });
    router.push(`/explore/search?${params.toString()}`);
  };

  const filteredFavors = ALL_FAVORS.filter(f =>
    (activeCategory === 'All Categories' || f.category === activeCategory) &&
    (!query || f.title.toLowerCase().includes(query.toLowerCase()) || f.category.toLowerCase().includes(query.toLowerCase()))
  );
  const sortedFavors = [...filteredFavors].sort((a, b) => sortBy === 'price' ? a.price - b.price : 0);

  const filteredSellers = ALL_SELLERS.filter(s =>
    (!query || s.name.toLowerCase().includes(query.toLowerCase()) || s.specialty.toLowerCase().includes(query.toLowerCase()))
  );
  const sortedSellers = [...filteredSellers].sort((a, b) => sortBy === 'price' ? a.jobs - b.jobs : 0);

  const items = searchType === 'favors' ? sortedFavors : sortedSellers;
  const visibleItems = items.slice(0, visibleCount);
  const colCount = searchType === 'favors' ? COLS_FAVORS : COLS_SELLERS;
  const rowsSize = colCount;
  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + rowsSize * ROWS_PER_PAGE, items.length));
  };

  const toggleLike = (id: string) => {
    setLikedFavors(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  // Calculate which "show more" checkpoints we need
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: '88px' }}>
        {/* ── Search bar row ── */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #EAECF0', padding: '20px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '24px', color: '#101828', marginRight: '8px', flexShrink: 0 }}>Explore</h1>

            {/* Search input */}
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', background: '#F9FAFB', border: '1.5px solid #EAECF0', borderRadius: '12px', padding: '10px 14px', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#98A2B3" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" /></svg>
              <input
                type="text"
                placeholder={`Search ${searchType}...`}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#101828', background: 'transparent' }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#98A2B3', lineHeight: 0, padding: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>

            {/* Type dropdown */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => setTypeDropOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: '#344054', background: '#F9FAFB', border: '1.5px solid #EAECF0', borderRadius: '12px', padding: '10px 14px', cursor: 'pointer' }}
              >
                {searchType === 'favors' ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> Favors</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="#667085" strokeWidth="2" /></svg> Sellers</>
                )}
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: typeDropOpen ? 'rotate(180deg)' : 'none' }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {typeDropOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#ffffff', border: '1px solid #EAECF0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(16,24,40,0.1)', zIndex: 100, overflow: 'hidden', minWidth: '130px' }}>
                  {(['favors', 'sellers'] as const).map(t => (
                    <button key={t} onClick={() => { setSearchType(t); setTypeDropOpen(false); }} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: searchType === t ? '#A54AFF' : '#344054', background: searchType === t ? '#F8F0FF' : 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}>
                      {t === 'favors'
                        ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
                      }{' '}{t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', border: 'none', borderRadius: '12px', padding: '11px 24px', cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Search
            </button>

            {/* Filters icon */}
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: '#344054', background: '#F9FAFB', border: '1.5px solid #EAECF0', borderRadius: '12px', padding: '10px 14px', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M8 12h8M12 18h0" stroke="#667085" strokeWidth="2" strokeLinecap="round" /></svg>
              Filters
            </button>
          </div>
        </div>

        {/* ── Category pills ── */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #EAECF0', padding: '12px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '13px', whiteSpace: 'nowrap', padding: '7px 16px', borderRadius: '9999px', border: '1.5px solid', cursor: 'pointer', transition: 'all 0.15s ease', flexShrink: 0, ...(activeCategory === cat ? { background: '#F4EBFF', borderColor: '#A54AFF', color: '#A54AFF' } : { background: 'transparent', borderColor: '#EAECF0', color: '#344054' }) }}
              >
                {cat}
              </button>
            ))}
            <button style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '13px', color: '#A54AFF', background: 'transparent', border: '1.5px solid #A54AFF', borderRadius: '9999px', padding: '7px 14px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#A54AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
          {/* Sort tabs + count */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#667085' }}>
              <span style={{ fontWeight: 600, color: '#101828' }}>{items.length}</span> {searchType} found
            </p>
            <div style={{ display: 'flex', gap: '4px', background: '#F2F4F7', borderRadius: '9999px', padding: '4px' }}>
              {(['relevance', 'price'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 500, padding: '7px 16px', borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', ...(sortBy === s ? { background: '#ffffff', color: '#A54AFF', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : { background: 'transparent', color: '#667085' }) }}
                >
                  By {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {visibleItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 600, color: '#344054', marginBottom: '8px' }}>No results found</p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#667085' }}>Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 1fr)`, gap: '20px' }}>
                {searchType === 'favors'
                  ? (visibleItems as typeof sortedFavors).map(favor => {
                      const liked = likedFavors.has(favor.id);
                      return (
                        <div key={favor.id} style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #EAECF0', overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>
                          <div style={{ position: 'relative', padding: '8px 8px 0' }}>
                            <div style={{ height: '160px', borderRadius: '14px', overflow: 'hidden' }}>
                              <img src={favor.image} alt={favor.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
                            </div>
                            <div style={{ position: 'absolute', top: '18px', right: '18px', background: favor.badge === 'Pro' ? 'linear-gradient(135deg,#BF75FF,#A54AFF)' : 'linear-gradient(135deg,#34D399,#079455)', borderRadius: '8px', padding: '3px 8px', fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
                              {favor.badge}
                            </div>
                          </div>
                          <div style={{ padding: '12px 14px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <img src={favor.sellerAvatar} alt={favor.seller} style={{ width: '28px', height: '28px', borderRadius: '9999px', objectFit: 'cover', objectPosition: 'top', flexShrink: 0 }} />
                              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#344054' }}>{favor.seller}</span>
                              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#F79009', marginLeft: 'auto' }}>★ {favor.rating}</span>
                            </div>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', lineHeight: '1.4', marginBottom: '12px' }}>{favor.title}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #EAECF0', paddingTop: '10px' }}>
                              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }} onClick={e => { e.stopPropagation(); toggleLike(favor.id); }}>
                                <svg viewBox="0 0 24 24" width="24" height="24">
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={liked ? '#F43F5E' : '#98A2B3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={liked ? '#F43F5E' : 'none'} style={{ transition: 'all 0.2s' }} />
                                </svg>
                              </button>
                              <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '20px', background: 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${favor.price}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : (visibleItems as typeof sortedSellers).map(seller => (
                      <div key={seller.id} style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #EAECF0', overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>
                        <div style={{ position: 'relative', padding: '8px 8px 0' }}>
                          <div style={{ height: '180px', borderRadius: '14px', overflow: 'hidden' }}>
                            <img src={seller.image} alt={seller.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                          </div>
                          <div style={{ position: 'absolute', top: '18px', right: '18px', background: seller.badge === 'Pro' ? 'linear-gradient(135deg,#BF75FF,#A54AFF)' : 'linear-gradient(135deg,#34D399,#079455)', borderRadius: '8px', padding: '3px 8px', fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
                            {seller.badge}
                          </div>
                        </div>
                        <div style={{ padding: '12px 14px 14px' }}>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#101828', marginBottom: '4px' }}>{seller.name}</p>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', marginBottom: '6px' }}>{seller.specialty}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                            <svg viewBox="0 0 24 24" width="12" height="12"><polygon fill="#F79009" stroke="none" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#101828' }}>{seller.rating}</span>
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#D0D5DD' }}>|</span>
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#667085' }}>{seller.reviews} reviews</span>
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#D0D5DD' }}>/</span>
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#667085' }}>{seller.jobs} jobs</span>
                          </div>
                        </div>
                      </div>
                    ))
                }
              </div>

              {/* Show More button */}
              {hasMore && (
                <div ref={loaderRef} style={{ marginTop: '36px', textAlign: 'center' }}>
                  <button
                    onClick={loadMore}
                    style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: '#ffffff', border: '1.5px solid #A54AFF', borderRadius: '9999px', padding: '12px 36px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F8F0FF'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#ffffff'; }}
                  >
                    Show More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3', marginTop: '8px' }}>
                    Showing {visibleItems.length} of {items.length}
                  </p>
                </div>
              )}

              {!hasMore && items.length > 0 && (
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#98A2B3', textAlign: 'center', marginTop: '36px' }}>
                  All {items.length} results shown
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAFAFA' }} />}>
      <SearchContent />
    </Suspense>
  );
}
