'use client';
import { useState } from 'react';

const CATS = ['Cleaning', 'Electrical', 'Plumbing', 'Carpentry', 'Painting', 'Gardening', 'Assembly', 'Moving'];
const SUBS: Record<string, string[]> = {
  Cleaning:   ['Dusting', 'Kitchen cleaning', 'Bathroom cleaning', 'Deep cleaning', 'Window cleaning'],
  Electrical: ['Wiring', 'Lighting', 'Panel upgrade', 'Outlet repair', 'Fan installation'],
  Plumbing:   ['Pipe repair', 'Drain cleaning', 'Faucet replacement', 'Water heater', 'Toilet repair'],
  Carpentry:  ['Furniture assembly', 'Cabinet installation', 'Door fitting', 'Shelving'],
  Painting:   ['Interior', 'Exterior', 'Touch-up', 'Wallpaper removal'],
  Gardening:  ['Lawn mowing', 'Tree trimming', 'Weeding', 'Planting'],
  Assembly:   ['IKEA assembly', 'Equipment setup', 'TV mounting'],
  Moving:     ['Local moving', 'Packing', 'Loading'],
};

const BRAND = '#A54AFF';
const BORDER = '#EAECF0';
const field: React.CSSProperties = {
  width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#344054',
  background: '#ffffff', border: `1.5px solid ${BORDER}`, borderRadius: '12px',
  padding: '11px 36px 11px 14px', outline: 'none', cursor: 'pointer',
  appearance: 'none', WebkitAppearance: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600,
  color: '#344054', display: 'block', marginBottom: '8px',
};
const ChevronDown = () => (
  <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
    width="16" height="16" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Props { onClose: () => void; }

export default function FiltersModal({ onClose }: Props) {
  const [onlineOnly, setOnlineOnly] = useState(true);
  const [cat, setCat]               = useState('Cleaning');
  const [subCats, setSubCats]       = useState<string[]>(['Dusting', 'Kitchen cleaning']);
  const [subOpen, setSubOpen]       = useState(false);
  const [sort, setSort]             = useState('Recommended');
  const [sellerType, setSellerType] = useState('All');
  const [rating, setRating]         = useState('Upto 4 stars');
  const [budget, setBudget]         = useState('Any');
  const [dist, setDist]             = useState(5);

  const addSub   = (s: string) => { if (!subCats.includes(s)) setSubCats(p => [...p, s]); setSubOpen(false); };
  const removeSub = (s: string) => setSubCats(p => p.filter(c => c !== s));
  const reset = () => { setOnlineOnly(false); setCat('Cleaning'); setSubCats([]); setSort('Recommended'); setSellerType('All'); setRating('Any rating'); setBudget('Any'); setDist(5); };

  const pct = ((dist - 1) / 49) * 100;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(16,24,40,0.52)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    >
      <div style={{ background: '#ffffff', borderRadius: '24px', width: '100%', maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.22)', padding: '28px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828' }}>More Filters</h2>
          <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F2F4F7', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#667085" strokeWidth="2.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Online toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 500, color: '#101828' }}>Show online sellers only</span>
          <button onClick={() => setOnlineOnly(o => !o)} style={{ width: '52px', height: '28px', borderRadius: '9999px', background: onlineOnly ? BRAND : '#D0D5DD', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0, padding: 0 }}>
            <span style={{ display: 'block', position: 'absolute', top: '3px', left: onlineOnly ? '27px' : '3px', width: '22px', height: '22px', borderRadius: '50%', background: '#ffffff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
          </button>
        </div>

        {/* Category */}
        <div style={{ marginBottom: '18px' }}>
          <label style={lbl}>Select Category</label>
          <div style={{ position: 'relative' }}>
            <select value={cat} onChange={e => { setCat(e.target.value); setSubCats([]); }} style={field}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Sub-Category */}
        <div style={{ marginBottom: '18px' }}>
          <label style={lbl}>Select Sub-Category</label>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSubOpen(o => !o)} style={{ width: '100%', textAlign: 'left', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#98A2B3', background: '#ffffff', border: `1.5px solid ${BORDER}`, borderRadius: '12px', padding: '11px 40px 11px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
              <span>Select one or multiple</span>
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {subOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#ffffff', border: `1px solid ${BORDER}`, borderRadius: '12px', boxShadow: '0 8px 24px rgba(16,24,40,0.1)', zIndex: 10, maxHeight: '180px', overflowY: 'auto' }}>
                {(SUBS[cat] || []).filter(s => !subCats.includes(s)).map(s => (
                  <button key={s} onClick={() => addSub(s)} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#344054', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F4EBFF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >{s}</button>
                ))}
                {(SUBS[cat] || []).filter(s => !subCats.includes(s)).length === 0 && (
                  <p style={{ padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#98A2B3' }}>All added</p>
                )}
              </div>
            )}
          </div>
          {subCats.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              {subCats.map(s => (
                <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F4EBFF', border: `1.5px solid ${BRAND}`, borderRadius: '9999px', padding: '4px 8px 4px 12px', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 500, color: BRAND }}>
                  {s}
                  <button onClick={() => removeSub(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', lineHeight: 0, display: 'flex', alignItems: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" /></svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div style={{ marginBottom: '18px' }}>
          <label style={lbl}>Sort by relevancy</label>
          <div style={{ position: 'relative' }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={field}>
              {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Most Reviews'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Seller type */}
        <div style={{ marginBottom: '18px' }}>
          <label style={lbl}>Seller type</label>
          <div style={{ position: 'relative' }}>
            <select value={sellerType} onChange={e => setSellerType(e.target.value)} style={field}>
              {['All', 'Individual', 'Agency', 'Verified Only'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: '18px' }}>
          <label style={lbl}>Filter by rating</label>
          <div style={{ position: 'relative' }}>
            <select value={rating} onChange={e => setRating(e.target.value)} style={field}>
              {['Any rating', 'Upto 4 stars', '4 stars & above', '4.5 stars & above', '5 stars only'].map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Budget */}
        <div style={{ marginBottom: '18px' }}>
          <label style={lbl}>Budget</label>
          <div style={{ position: 'relative' }}>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={field}>
              {['Any', 'Under $50', '$50 - $150', '$150 - $500', '$500+'].map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Distance */}
        <div style={{ marginBottom: '28px' }}>
          <label style={lbl}>Distance</label>
          <div style={{ position: 'relative', paddingTop: '28px' }}>
            <div style={{ position: 'absolute', top: 0, left: `clamp(0px, calc(${pct}% - 20px), calc(100% - 44px))`, background: BRAND, color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
              {dist} mi
              <span style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${BRAND}` }} />
            </div>
            <input type="range" min="1" max="50" value={dist} onChange={e => setDist(Number(e.target.value))} style={{ width: '100%', accentColor: BRAND, cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#98A2B3' }}>1 mi</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#98A2B3' }}>50 mi</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${BORDER}`, paddingTop: '20px' }}>
          <button onClick={reset} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0' }}>Reset</button>
          <button onClick={onClose} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '14px', color: '#ffffff', background: `linear-gradient(135deg, #BF75FF 0%, ${BRAND} 50%, #8430E0 100%)`, border: 'none', borderRadius: '9999px', padding: '12px 36px', cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >Show result</button>
        </div>
      </div>
    </div>
  );
}
