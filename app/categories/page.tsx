'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  SparklesIcon, WrenchIcon, SettingsIcon, ZapIcon,
  DropletsIcon, PaintbrushIcon, LeafIcon, PackageIcon,
  LockIcon, HammerIcon, ShieldIcon, BugIcon, ToolboxIcon,
} from '@/components/Icons';

const BRAND = '#A54AFF';
const GRAD  = 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)';

type CatIcon = React.ComponentType<{ size?: number; color?: string }>;

/* ── Category data ─────────────────────────────────────── */
const ALL_CATEGORIES: { name: string; sub: string[]; Icon: CatIcon }[] = [
  {
    name: 'Cleaning',
    Icon: SparklesIcon,
    sub: ['Deep Cleaning', 'Office Cleaning', 'Window Cleaning', 'Carpet Cleaning', 'Move-in/Move-out'],
  },
  {
    name: 'Repairing',
    Icon: WrenchIcon,
    sub: ['AC Repair', 'Appliance Repair', 'Furniture Repair', 'Mobile Repair', 'Roof Repair'],
  },
  {
    name: 'Assembly',
    Icon: SettingsIcon,
    sub: ['Furniture Assembly', 'Electronics Setup', 'Equipment Assembly', 'Shelving', 'Playground Setup'],
  },
  {
    name: 'Electrical',
    Icon: ZapIcon,
    sub: ['Wiring & Rewiring', 'Light Fixture Install', 'Electrical Panel', 'Fan Installation', 'EV Charger'],
  },
  {
    name: 'Plumbing',
    Icon: DropletsIcon,
    sub: ['Pipe Repair', 'Drain Cleaning', 'Water Heater', 'Faucet Install', 'Leak Detection'],
  },
  {
    name: 'Painting',
    Icon: PaintbrushIcon,
    sub: ['Interior Painting', 'Exterior Painting', 'Wallpaper Hanging', 'Cabinet Painting', 'Touch-up Work'],
  },
  {
    name: 'Gardening',
    Icon: LeafIcon,
    sub: ['Lawn Mowing', 'Tree Trimming', 'Landscaping', 'Irrigation Setup', 'Seasonal Cleanup'],
  },
  {
    name: 'Moving',
    Icon: PackageIcon,
    sub: ['Home Moving', 'Office Moving', 'Furniture Moving', 'Storage Help', 'Packing & Unpacking'],
  },
  {
    name: 'Carpentry',
    Icon: HammerIcon,
    sub: ['Custom Furniture', 'Door Repair', 'Cabinet Making', 'Deck Building', 'Trim & Molding'],
  },
  {
    name: 'Security',
    Icon: ShieldIcon,
    sub: ['CCTV Installation', 'Lock Repair', 'Alarm System', 'Smart Lock Setup', 'Access Control'],
  },
  {
    name: 'Pest Control',
    Icon: BugIcon,
    sub: ['Cockroach Control', 'Termite Treatment', 'Rodent Control', 'Bed Bug Treatment', 'Mosquito Control'],
  },
  {
    name: 'Handyman',
    Icon: ToolboxIcon,
    sub: ['General Repairs', 'TV Mounting', 'Shelf Installation', 'Door Hanging', 'Small Fixes'],
  },
];

/* Pastel card palette */
const PALETTES = [
  { bg: '#F0FFF8', border: '#C3F0D8', pill: '#D1FAE5', pillText: '#065F46' },
  { bg: '#FFF0F5', border: '#FECDD3', pill: '#FCE7F3', pillText: '#9D174D' },
  { bg: '#FFFBEB', border: '#FDE68A', pill: '#FEF3C7', pillText: '#78350F' },
  { bg: '#F5F0FF', border: '#DDD6FE', pill: '#EDE9FE', pillText: '#4C1D95' },
];
/* Shuffled order so no two adjacent rows share the same pattern */
const PALETTE_ORDER = [0, 2, 3, 1, 3, 0, 2, 1, 1, 3, 0, 2];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CategoryCard({ name, sub, palette, Icon, onCategoryClick, onSubClick }: {
  name: string;
  sub: string[];
  palette: typeof PALETTES[0];
  Icon: CatIcon;
  onCategoryClick: () => void;
  onSubClick: (s: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  return (
    <div
      style={{
        background: palette.bg,
        border: `1.5px solid ${hovered ? palette.border.replace(')', ', 0.9)').replace('rgb', 'rgba') : palette.border}`,
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Category header */}
      <div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(165,74,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <Icon size={20} color="#A54AFF" />
        </div>
        <button
          onClick={onCategoryClick}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, gap: '8px' }}
        >
          <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', lineHeight: '1.2', textAlign: 'left' }}>{name}</span>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: palette.pill, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: palette.pillText, transition: 'background 0.15s' }}>
            <ArrowIcon />
          </div>
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: palette.border }} />

      {/* Sub categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: 600, color: '#98A2B3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Sub Categories</p>
        {sub.slice(0, 3).map(s => (
          <button
            key={s}
            onClick={() => onSubClick(s)}
            onMouseEnter={() => setHoveredSub(s)}
            onMouseLeave={() => setHoveredSub(null)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: hoveredSub === s ? palette.pill : 'transparent',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              padding: '7px 8px', transition: 'background 0.12s',
            }}
          >
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: hoveredSub === s ? 600 : 500, color: hoveredSub === s ? '#101828' : '#344054', transition: 'color 0.12s, font-weight 0.12s' }}>{s}</span>
            <span style={{ color: '#98A2B3', opacity: hoveredSub === s ? 1 : 0, transition: 'opacity 0.12s' }}>
              <ArrowIcon />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = ALL_CATEGORIES.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.sub.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const goToSearch = (category: string, subcategory?: string) => {
    const params = new URLSearchParams({ category });
    if (subcategory) params.set('q', subcategory);
    router.push(`/explore/search?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#FAFAFA' }}>

        {/* Header band */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #EAECF0', paddingTop: '104px', paddingBottom: '40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
              <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085', padding: 0 }}>Home</button>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#101828', fontWeight: 500 }}>All Categories</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '12px', color: BRAND, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Browse Everything</p>
                <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '34px', color: '#101828', lineHeight: '1.15', marginBottom: '10px' }}>All Categories</h1>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#667085' }}>
                  {ALL_CATEGORIES.length} categories · {ALL_CATEGORIES.reduce((a, c) => a + c.sub.length, 0)}+ sub-categories
                </p>
              </div>

              {/* Search */}
              <div style={{ position: 'relative', width: '320px', flexShrink: 0 }}>
                <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#98A2B3" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"/></svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search categories..."
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#101828', background: '#F9FAFB', border: `1.5px solid ${searchFocused ? BRAND : '#EAECF0'}`, borderRadius: '9999px', padding: '11px 20px 11px 42px', outline: 'none', boxShadow: searchFocused ? '0 0 0 4px rgba(165,74,255,0.12)' : 'none', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke={BRAND} strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#101828', marginBottom: '8px' }}>No categories found</h3>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#667085' }}>Try a different search term.</p>
            </div>
          ) : (
            <>
              {search && (
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085', marginBottom: '24px' }}>
                  Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<strong style={{ color: '#101828' }}>{search}</strong>"
                </p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {filtered.map((cat, i) => {
                  const origIdx = ALL_CATEGORIES.findIndex(c => c.name === cat.name);
                  return (
                  <CategoryCard
                    key={cat.name}
                    name={cat.name}
                    sub={cat.sub}
                    Icon={cat.Icon}
                    palette={PALETTES[PALETTE_ORDER[origIdx] ?? origIdx % 4]}
                    onCategoryClick={() => goToSearch(cat.name)}
                    onSubClick={s => goToSearch(cat.name, s)}
                  />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
