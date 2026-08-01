'use client';
import { useRef, useState } from 'react';
import {
  SparklesIcon, WrenchIcon, ZapIcon, LeafIcon,
  DropletsIcon, PaintbrushIcon, PackageIcon, SettingsIcon, ArrowRightIcon,
} from './Icons';
import FiltersModal from './FiltersModal';

const CATEGORIES = [
  { label: 'Cleaning',   icon: SparklesIcon,   iconColor: '#A54AFF', iconBg: '#F0E8FF', count: '1,240+ favors' },
  { label: 'Electrical', icon: ZapIcon,         iconColor: '#8C2EE8', iconBg: '#EDE0FF', count: '890+ favors'   },
  { label: 'Plumbing',   icon: DropletsIcon,    iconColor: '#7220CC', iconBg: '#E8DAFF', count: '760+ favors'   },
  { label: 'Carpentry',  icon: WrenchIcon,      iconColor: '#A54AFF', iconBg: '#F0E8FF', count: '540+ favors'   },
  { label: 'Painting',   icon: PaintbrushIcon,  iconColor: '#8C2EE8', iconBg: '#EDE0FF', count: '620+ favors'   },
  { label: 'Gardening',  icon: LeafIcon,        iconColor: '#7220CC', iconBg: '#E8DAFF', count: '430+ favors'   },
  { label: 'Assembly',   icon: SettingsIcon,    iconColor: '#A54AFF', iconBg: '#F0E8FF', count: '310+ favors'   },
  { label: 'Moving',     icon: PackageIcon,     iconColor: '#8C2EE8', iconBg: '#EDE0FF', count: '280+ favors'   },
];

const PILL_H = 80;

export default function ExploreCategoriesSection() {
  const scrollRef   = useRef<HTMLDivElement>(null);
  const dragRef     = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [selected, setSelected]       = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (label: string) =>
    setSelected(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = { active: false, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    const el = scrollRef.current;
    if (!el) return;
    const walk = (e.pageX - el.offsetLeft) - dragRef.current.startX;
    if (Math.abs(walk) > 4) dragRef.current.active = true;
    if (!dragRef.current.active) return;
    e.preventDefault();
    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };
  const stopDrag = () => {
    dragRef.current.active = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  return (
    <section style={{ padding: '80px 0', background: '#ffffff' }}>
      {filtersOpen && <FiltersModal onClose={() => setFiltersOpen(false)} />}

      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#A54AFF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Browse by Category</p>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '32px', color: '#101828', lineHeight: '1.2', letterSpacing: '-0.01em' }}>Explore Categories</h2>
          </div>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', border: 'none', borderRadius: '9999px', padding: '11px 24px', cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            Explore All
            <ArrowRightIcon size={16} color="#ffffff" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{ overflowX: 'auto', paddingTop: '10px', paddingBottom: '14px', paddingLeft: '24px', paddingRight: '24px', cursor: 'grab', userSelect: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div style={{ display: 'flex', gap: '12px', width: 'max-content', alignItems: 'center' }}>
          {CATEGORIES.map(cat => {
            const active = selected.includes(cat.label);
            return (
              <button
                key={cat.label}
                onClick={() => { if (!dragRef.current.active) toggle(cat.label); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  height: PILL_H, minWidth: '250px', borderRadius: '9999px',
                  background: active ? '#F4EBFF' : '#ffffff',
                  border: `1.5px solid ${active ? '#A54AFF' : 'rgba(165,74,255,0.18)'}`,
                  padding: '0 20px 0 16px', cursor: 'pointer',
                  boxShadow: active ? '0 0 0 2px rgba(165,74,255,0.2)' : '0 4px 16px rgba(165,74,255,0.07)',
                  transition: 'all 0.15s ease', flexShrink: 0,
                }}
                onMouseEnter={e => {
                  if (!active) { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.45)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.16)'; }
                }}
                onMouseLeave={e => {
                  if (!active) { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.18)'; el.style.boxShadow = '0 4px 16px rgba(165,74,255,0.07)'; }
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: cat.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <cat.icon size={24} color={cat.iconColor} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '16px', color: '#101828', lineHeight: '1.2', whiteSpace: 'nowrap' }}>{cat.label}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#667085', marginTop: '3px', whiteSpace: 'nowrap' }}>{cat.count}</p>
                </div>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: active ? '#A54AFF' : 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRightIcon size={15} color="#ffffff" />
                </div>
              </button>
            );
          })}

          {/* More link button */}
          <button
            onClick={() => setFiltersOpen(true)}
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 4px', whiteSpace: 'nowrap', textDecoration: 'underline', textUnderlineOffset: '3px', flexShrink: 0 }}
          >
            More
          </button>
        </div>
      </div>
    </section>
  );
}
