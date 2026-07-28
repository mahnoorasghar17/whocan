'use client';
import { useRef, useEffect } from 'react';
import {
  SparklesIcon, WrenchIcon, ZapIcon, LeafIcon,
  DropletsIcon, PaintbrushIcon, PackageIcon, SettingsIcon, ArrowRightIcon,
} from './Icons';

const S1 = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=220&h=220&fit=crop&auto=format'; // cleaning
const S2 = 'https://images.unsplash.com/photo-1621905251189-08b1489462be?w=220&h=220&fit=crop&auto=format'; // electrical
const S3 = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=220&h=220&fit=crop&auto=format'; // gardening
const S4 = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=220&h=220&fit=crop&auto=format'; // plumbing

type AvatarItem = { type: 'avatar'; src: string; alt: string };
type PillItem   = {
  type: 'pill';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  iconColor: string;
  iconBg: string;
  label: string;
  sub: string;
};
type RowItem = AvatarItem | PillItem;

const ROW1: RowItem[] = [
  { type: 'pill', icon: SparklesIcon, iconColor: '#A54AFF', iconBg: '#F0E8FF', label: 'Cleaning',   sub: '128 sub-categories' },
  { type: 'avatar', src: S1, alt: 'Cleaning service' },
  { type: 'pill', icon: WrenchIcon,   iconColor: '#8C2EE8', iconBg: '#EDE0FF', label: 'Repairing',  sub: '94 sub-categories'  },
  { type: 'avatar', src: S2, alt: 'Electrical work' },
  { type: 'pill', icon: ZapIcon,      iconColor: '#7220CC', iconBg: '#E8DAFF', label: 'Electrical', sub: '52 sub-categories'  },
  { type: 'avatar', src: S3, alt: 'Gardening service' },
];

const ROW2: RowItem[] = [
  { type: 'pill', icon: SettingsIcon,    iconColor: '#7220CC', iconBg: '#E8DAFF', label: 'Assembly',  sub: '67 sub-categories' },
  { type: 'avatar', src: S4, alt: 'Plumbing service' },
  { type: 'pill', icon: LeafIcon,        iconColor: '#A54AFF', iconBg: '#F0E8FF', label: 'Gardening', sub: '85 sub-categories' },
  { type: 'pill', icon: DropletsIcon,    iconColor: '#8C2EE8', iconBg: '#EDE0FF', label: 'Plumbing',  sub: '73 sub-categories' },
  { type: 'avatar', src: S3, alt: 'Gardening service' },
  { type: 'pill', icon: PaintbrushIcon,  iconColor: '#7220CC', iconBg: '#E8DAFF', label: 'Painting',  sub: '44 sub-categories' },
  { type: 'avatar', src: S1, alt: 'Cleaning service' },
  { type: 'pill', icon: PackageIcon,     iconColor: '#A54AFF', iconBg: '#F0E8FF', label: 'Moving',    sub: '39 sub-categories' },
];

const SIZE = 110;
const GAP  = 16;

function AvatarEl({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: SIZE, height: SIZE, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid rgba(165,74,255,0.25)', boxShadow: '0 4px 16px rgba(165,74,255,0.2)' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
    </div>
  );
}

function PillEl({ icon: Icon, iconColor, iconBg, label, sub }: Omit<PillItem, 'type'>) {
  return (
    <div
      style={{ height: SIZE, minWidth: 240, borderRadius: 9999, background: '#ffffff', border: '2px solid rgba(165,74,255,0.2)', display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px 0 18px', flexShrink: 0, cursor: 'pointer', boxShadow: '0 4px 16px rgba(165,74,255,0.08)', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.5)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.18)'; el.style.transform = 'scale(1.03)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.2)'; el.style.boxShadow = '0 4px 16px rgba(165,74,255,0.08)'; el.style.transform = 'scale(1)'; }}
    >
      <div style={{ width: 58, height: 58, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={26} color={iconColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17, color: '#101828', lineHeight: 1.2, whiteSpace: 'nowrap' }}>{label}</p>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#667085', marginTop: 3, whiteSpace: 'nowrap' }}>{sub}</p>
      </div>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <ArrowRightIcon size={14} color="#ffffff" />
      </div>
    </div>
  );
}

function renderItem(item: RowItem, key: number) {
  if (item.type === 'avatar') return <AvatarEl key={key} src={item.src} alt={item.alt} />;
  return <PillEl key={key} icon={item.icon} iconColor={item.iconColor} iconBg={item.iconBg} label={item.label} sub={item.sub} />;
}

export default function CategoriesSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const raf1    = useRef(0);
  const raf2    = useRef(0);
  const drag1   = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const drag2   = useRef({ active: false, startX: 0, scrollLeft: 0 });

  // Row 1 — auto-scrolls left; speed matches original 30s CSS marquee
  useEffect(() => {
    const el = row1Ref.current;
    if (!el) return;
    let last = 0;
    const tick = (ts: number) => {
      const dt = ts - last;
      last = ts;
      if (!drag1.current.active && dt < 100 && el.scrollWidth > 0) {
        // scrollWidth/2 in 30000ms — same pace as the original CSS animation
        const speed = el.scrollWidth / 2 / 30000;
        el.scrollLeft += speed * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      raf1.current = requestAnimationFrame(tick);
    };
    raf1.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf1.current);
  }, []);

  // Row 2 — auto-scrolls right (reverse); same pace
  useEffect(() => {
    const el = row2Ref.current;
    if (!el) return;
    let initialized = false;
    let last = 0;
    const tick = (ts: number) => {
      const dt = ts - last;
      last = ts;
      if (!initialized && el.scrollWidth > 0) {
        el.scrollLeft = el.scrollWidth / 2;
        initialized = true;
      }
      if (!drag2.current.active && dt < 100 && initialized) {
        const speed = el.scrollWidth / 2 / 30000;
        el.scrollLeft -= speed * dt;
        if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
      }
      raf2.current = requestAnimationFrame(tick);
    };
    raf2.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf2.current);
  }, []);

  // Drag handlers factory
  function makeDrag(
    elRef: React.RefObject<HTMLDivElement>,
    state: React.MutableRefObject<{ active: boolean; startX: number; scrollLeft: number }>,
  ) {
    return {
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
        const el = elRef.current;
        if (!el) return;
        state.current = { active: false, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
        el.style.cursor = 'grabbing';
      },
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
        const el = elRef.current;
        if (!el) return;
        const x = e.pageX - el.offsetLeft;
        const walk = x - state.current.startX;
        if (Math.abs(walk) > 4) state.current.active = true;
        if (!state.current.active) return;
        e.preventDefault();
        el.scrollLeft = state.current.scrollLeft - walk;
      },
      onMouseUp: () => {
        setTimeout(() => { state.current.active = false; }, 50);
        if (elRef.current) elRef.current.style.cursor = 'grab';
      },
      onMouseLeave: () => {
        setTimeout(() => { state.current.active = false; }, 50);
        if (elRef.current) elRef.current.style.cursor = 'grab';
      },
    };
  }

  const doubled1 = [...ROW1, ...ROW1];
  const doubled2 = [...ROW2, ...ROW2];

  return (
    <section style={{ background: '#F8F0FF', padding: '56px 0', position: 'relative', borderRadius: '50px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(165,74,255,0.25), transparent)' }} />

      {/* Row 1 — overflowX:clip clips horizontally without killing y-axis shadow */}
      <div style={{ overflowX: 'clip', paddingTop: '10px', paddingBottom: '10px', marginTop: '-10px', marginBottom: `${GAP - 10}px` }}>
        <div
          ref={row1Ref}
          className="hide-scrollbar"
          style={{ overflowX: 'auto', cursor: 'grab', paddingTop: '2px', paddingBottom: '2px' }}
          {...makeDrag(row1Ref, drag1)}
        >
          <div style={{ display: 'flex', gap: GAP, width: 'max-content', paddingLeft: '24px', paddingRight: '24px' }}>
            {doubled1.map((item, i) => renderItem(item, i))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ overflowX: 'clip', paddingTop: '10px', paddingBottom: '10px', marginBottom: '-10px' }}>
        <div
          ref={row2Ref}
          className="hide-scrollbar"
          style={{ overflowX: 'auto', cursor: 'grab', paddingTop: '2px', paddingBottom: '2px' }}
          {...makeDrag(row2Ref, drag2)}
        >
          <div style={{ display: 'flex', gap: GAP, width: 'max-content', paddingLeft: '24px', paddingRight: '24px' }}>
            {doubled2.map((item, i) => renderItem(item, i + 1000))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(165,74,255,0.2), transparent)' }} />
    </section>
  );
}
