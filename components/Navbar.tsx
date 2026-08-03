'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AuthGateModal from '@/components/AuthGateModal';

/* ── Generic icons ─────────────────────────────────────── */
function UserIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>;
}
function ShoppingBagIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function GridIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>;
}

/* ── Logo ──────────────────────────────────────────────── */
function WhoCanLogo({ markColor, textColor }: { markColor: string; textColor: string }) {
  return (
    <svg width="118" height="24" viewBox="0 0 159 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3728 2.47801C20.6978 0.134223 23.6737 -0.692738 26.0197 0.630946C28.3657 1.95464 29.1935 4.9277 27.8685 7.27149L15.5022 29.1471C14.1772 31.4909 11.2013 32.3179 8.8553 30.9942C6.50929 29.6705 5.68154 26.6974 7.00648 24.3536L19.3728 2.47801Z" fill={markColor}/>
      <path d="M1.26277 2.15119C3.04388 -0.22362 6.41297 -0.704966 8.7878 1.07612C11.1626 2.85723 11.644 6.22632 9.86287 8.60114L9.67537 8.85114C7.89426 11.226 4.52517 11.7073 2.15034 9.92622C-0.224467 8.14511 -0.705813 4.77601 1.07527 2.40119L1.26277 2.15119Z" fill={markColor}/>
      <path d="M10.625 3.62592C10.9375 4.81342 11.0625 6.18842 12.8125 6.50092C14.125 6.68842 15.5833 6.52175 16.1875 6.31342C17.6547 5.84183 18.785 4.82845 19.3208 4.04669L19.5625 3.62592C19.5053 3.75387 19.4241 3.89597 19.3208 4.04669L14.908 11.7282C14.7975 11.9949 14.65 12.2399 14.5 12.4384L14.908 11.7282C15.3193 10.7352 15.2167 9.44123 12.8125 9.12592C9.76248 8.72592 9.1875 9.56342 8.3125 10.1259L10.625 3.62592Z" fill={markColor}/>
      <path d="M34.8734 2.47769C36.1984 0.134178 39.174 -0.692603 41.5198 0.631014C43.8658 1.95472 44.6934 4.92787 43.3685 7.27164L31.0023 29.1466C29.6774 31.4903 26.7017 32.3177 24.3558 30.9943C22.0099 29.6707 21.1814 26.6974 22.5062 24.3537L34.8734 2.47769ZM28.722 23.8859C27.3108 22.8335 25.3087 23.1174 24.2503 24.5207L24.139 24.6681C23.0806 26.0713 23.3666 28.062 24.7777 29.1144C26.1888 30.1668 28.1909 29.8827 29.2493 28.4796L29.3607 28.3322C30.419 26.929 30.1331 24.9383 28.722 23.8859Z" fill={markColor}/>
      <path d="M60.1314 11.1925C61.5301 11.1925 62.7957 11.4848 63.928 12.0694C65.0604 12.6316 65.9485 13.5086 66.5924 14.7004C67.2585 15.8922 67.5915 17.4325 67.5915 19.3214V29.7778H61.2637V20.3671C61.2637 19.0628 60.9973 18.1184 60.4644 17.5337C59.9537 16.9266 59.2322 16.623 58.2996 16.623C57.6336 16.623 57.023 16.7804 56.4679 17.0952C55.9128 17.3876 55.4799 17.8485 55.169 18.4782C54.8582 19.1078 54.7028 19.9286 54.7028 20.9405V29.7778H48.375V4.75H54.7028V16.6905L53.2374 15.1726C53.9257 13.8459 54.8693 12.8565 56.0683 12.2044C57.2672 11.5298 58.6216 11.1925 60.1314 11.1925Z" fill={textColor}/>
      <path d="M80.8507 30.0814C78.8747 30.0814 77.1206 29.6766 75.5887 28.8671C74.0567 28.0575 72.8466 26.9444 71.9585 25.5278C71.0926 24.0886 70.6596 22.4471 70.6596 20.6032C70.6596 18.7593 71.0926 17.129 71.9585 15.7123C72.8466 14.2956 74.0567 13.1938 75.5887 12.4067C77.1206 11.5972 78.8747 11.1925 80.8507 11.1925C82.8268 11.1925 84.5808 11.5972 86.1128 12.4067C87.667 13.1938 88.877 14.2956 89.7429 15.7123C90.6088 17.129 91.0418 18.7593 91.0418 20.6032C91.0418 22.4471 90.6088 24.0886 89.7429 25.5278C88.877 26.9444 87.667 28.0575 86.1128 28.8671C84.5808 29.6766 82.8268 30.0814 80.8507 30.0814ZM80.8507 24.9881C81.5834 24.9881 82.2273 24.8194 82.7823 24.4821C83.3596 24.1448 83.8148 23.6501 84.1478 22.998C84.4809 22.3234 84.6474 21.5251 84.6474 20.6032C84.6474 19.6812 84.4809 18.9054 84.1478 18.2758C83.8148 17.6237 83.3596 17.129 82.7823 16.7917C82.2273 16.4544 81.5834 16.2857 80.8507 16.2857C80.1402 16.2857 79.4963 16.4544 78.9191 16.7917C78.364 17.129 77.9088 17.6237 77.5536 18.2758C77.2206 18.9054 77.054 19.6812 77.054 20.6032C77.054 21.5251 77.2206 22.3234 77.5536 22.998C77.9088 23.6501 78.364 24.1448 78.9191 24.4821C79.4963 24.8194 80.1402 24.9881 80.8507 24.9881Z" fill={textColor}/>
      <path d="M105.896 30.25C104.053 30.25 102.344 29.9577 100.767 29.373C99.2129 28.7659 97.8585 27.9114 96.704 26.8095C95.5717 25.7077 94.6836 24.4147 94.0397 22.9306C93.3958 21.4239 93.0739 19.7712 93.0739 17.9722C93.0739 16.1733 93.3958 14.5317 94.0397 13.0476C94.6836 11.541 95.5717 10.2368 96.704 9.13492C97.8585 8.03307 99.2129 7.18982 100.767 6.60516C102.344 5.99802 104.053 5.69444 105.896 5.69444C108.05 5.69444 109.97 6.07672 111.658 6.84127C113.367 7.60582 114.788 8.70767 115.92 10.1468L111.724 13.9921C110.969 13.0926 110.137 12.4067 109.226 11.9345C108.338 11.4623 107.339 11.2262 106.229 11.2262C105.274 11.2262 104.397 11.3836 103.598 11.6984C102.799 12.0132 102.11 12.4742 101.533 13.0813C100.978 13.666 100.534 14.3743 100.201 15.2063C99.8901 16.0384 99.7347 16.9603 99.7347 17.9722C99.7347 18.9841 99.8901 19.9061 100.201 20.7381C100.534 21.5701 100.978 22.2897 101.533 22.8968C102.11 23.4815 102.799 23.9312 103.598 24.246C104.397 24.5608 105.274 24.7183 106.229 24.7183C107.339 24.7183 108.338 24.4821 109.226 24.0099C110.137 23.5377 110.969 22.8519 111.724 21.9524L115.92 25.7976C114.788 27.2143 113.367 28.3161 111.658 29.1032C109.97 29.8677 108.05 30.25 105.896 30.25Z" fill={textColor}/>
      <path d="M129.52 29.7778V26.371L129.087 25.5278V19.254C129.087 18.2421 128.776 17.4663 128.154 16.9266C127.555 16.3644 126.589 16.0833 125.257 16.0833C124.391 16.0833 123.514 16.2295 122.626 16.5218C121.737 16.7917 120.983 17.1739 120.361 17.6687L118.229 13.3175C119.251 12.6429 120.472 12.1257 121.893 11.7659C123.336 11.3836 124.768 11.1925 126.189 11.1925C129.12 11.1925 131.385 11.8783 132.983 13.25C134.604 14.5992 135.414 16.7242 135.414 19.625V29.7778H129.52ZM124.191 30.0814C122.748 30.0814 121.527 29.834 120.527 29.3393C119.528 28.8446 118.762 28.17 118.229 27.3155C117.719 26.461 117.463 25.5053 117.463 24.4484C117.463 23.3241 117.741 22.3571 118.296 21.5476C118.873 20.7156 119.75 20.086 120.927 19.6587C122.104 19.209 123.625 18.9841 125.49 18.9841H129.753V22.3234H126.356C125.334 22.3234 124.613 22.4921 124.191 22.8294C123.791 23.1667 123.591 23.6164 123.591 24.1786C123.591 24.7407 123.802 25.1905 124.224 25.5278C124.646 25.8651 125.223 26.0337 125.956 26.0337C126.644 26.0337 127.266 25.8651 127.821 25.5278C128.398 25.168 128.82 24.6283 129.087 23.9087L129.952 26.2698C129.619 27.5291 128.964 28.4848 127.988 29.1369C127.033 29.7665 125.767 30.0814 124.191 30.0814Z" fill={textColor}/>
      <path d="M151.165 11.1925C152.564 11.1925 153.829 11.4848 154.962 12.0694C156.094 12.6316 156.982 13.5086 157.626 14.7004C158.292 15.8922 158.625 17.4325 158.625 19.3214V29.7778H152.297V20.3671C152.297 19.0628 152.031 18.1184 151.498 17.5337C150.987 16.9266 150.266 16.623 149.333 16.623C148.667 16.623 148.056 16.7804 147.501 17.0952C146.946 17.3876 146.513 17.8485 146.203 18.4782C145.892 19.1078 145.736 19.9286 145.736 20.9405V29.7778H139.409V11.496H145.437V16.6905L144.271 15.1726C144.959 13.8459 145.903 12.8565 147.102 12.2044C148.301 11.5298 149.655 11.1925 151.165 11.1925Z" fill={textColor}/>
    </svg>
  );
}

/* ── Notification data ─────────────────────────────────── */
const JORDAN_AVA  = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&auto=format&q=80';
const JORDAN2_AVA = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop&auto=format&q=80';
const ALL_NOTIFS = [
  { id: 1,  group: 'Today',     type: 'error',   text: 'Favor request declined',                              time: 'a min ago',  read: true  },
  { id: 2,  group: 'Today',     type: 'avatar',  avatar: JORDAN_AVA,  name: 'Jordan', action: 'accepted your request.',             time: 'Just now',   read: false },
  { id: 3,  group: 'Today',     type: 'bids',    text: '3 bids received on your latest custom favor request', time: 'Just now',   read: false },
  { id: 4,  group: 'Today',     type: 'avatar',  avatar: JORDAN2_AVA, name: 'Jordan', action: 'accepted your request.',             time: 'Just now',   read: false },
  { id: 5,  group: 'Last week', type: 'success', text: 'Home cleaning favor completed.',                       time: '1 week ago', read: true  },
  { id: 6,  group: 'Last week', type: 'avatar',  avatar: JORDAN_AVA,  name: 'Jordan', action: 'accepted your favor request.',        time: '1 week ago', read: true  },
  { id: 7,  group: 'Last week', type: 'bids',    text: '3 bids received on your latest custom favor',          time: '1 week ago', read: true  },
  { id: 8,  group: 'Last week', type: 'avatar',  avatar: JORDAN2_AVA, name: 'Jordan', action: 'accepted your favor request.',        time: '1 week ago', read: true  },
] as const;

function NotifIcon({ type }: { type: string }) {
  if (type === 'error') return (
    <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#FEF3F2', border: '1.5px solid #FECDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#D92D20" strokeWidth="2.5" strokeLinecap="round"/></svg>
    </div>
  );
  if (type === 'success') return (
    <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#ECFDF3', border: '1.5px solid #A9EFC5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#079455" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
  return (
    <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: '#F4EBFF', border: '1.5px solid #DDD6FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="#A54AFF" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  );
}

/* ── Location types ────────────────────────────────────── */
type LocType = 'home' | 'office' | 'business';
type LocationEntry = { id: number; type: LocType; name: string; address: string; state: string; isDefault: boolean };

const DEFAULT_LOCATIONS: LocationEntry[] = [
  { id: 1, type: 'home',     name: 'Home',     address: '12, High Street, Downtown', state: 'Texas', isDefault: true  },
  { id: 2, type: 'office',   name: 'Office',   address: '12, High Street, Downtown', state: 'Texas', isDefault: false },
  { id: 3, type: 'business', name: 'Business', address: '12, High Street, Downtown', state: 'Texas', isDefault: false },
];

const BRAND = '#A54AFF';
const GRAD  = 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)';
const PILL  = '9999px';

function LocTypeIcon({ type }: { type: LocType }) {
  const wrap: React.CSSProperties = { width: '38px', height: '38px', borderRadius: '10px', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
  if (type === 'home') return (
    <div style={wrap}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  );
  if (type === 'office') return (
    <div style={wrap}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={BRAND} strokeWidth="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/></svg></div>
  );
  return (
    <div style={wrap}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="3" y1="22" x2="21" y2="22" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><rect x="2" y="9" width="20" height="13" rx="1" stroke={BRAND} strokeWidth="2"/><path d="M12 2L2 9h20L12 2z" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  );
}

/* ── Location search input (shared by Add + Edit) ──────── */
function LocSearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ position: 'relative', marginBottom: '12px' }}>
      <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#98A2B3" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"/></svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search an address...'}
        style={{ width: '100%', boxSizing: 'border-box', padding: '11px 44px 11px 40px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#101828', border: '1.5px solid #EAECF0', borderRadius: PILL, outline: 'none', background: '#F9FAFB', transition: 'border-color 0.15s, box-shadow 0.15s' }}
        onFocus={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.boxShadow = `0 0 0 4px rgba(165,74,255,0.12)`; e.currentTarget.style.background = '#fff'; }}
        onBlur={e => { e.currentTarget.style.borderColor = '#EAECF0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F9FAFB'; }}
      />
      <button style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="12" r="3" fill={BRAND}/><line x1="12" y1="2" x2="12" y2="5" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

/* ── Shared address suggestions ────────────────────────── */
const ADDR_SUGGESTIONS = [
  { address: '12 A, High Street, Downtown', city: 'Texas, US' },
  { address: '45, Main Boulevard, Gulberg III', city: 'Lahore, PK' },
  { address: '7, Blue Area, F-6/3', city: 'Islamabad, PK' },
  { address: '23, Clifton, Block 5', city: 'Karachi, PK' },
  { address: '89, DHA Phase 6, Sector B', city: 'Lahore, PK' },
  { address: '34, Commercial Avenue, DHA', city: 'Karachi, PK' },
];
type AddrSuggestion = { address: string; city: string };

/* ── Shared label options (Add + Edit modals) ──────────── */
const LOC_LABELS: { key: LocType; label: string; icon: React.ReactNode }[] = [
  { key: 'home',     label: 'Home',    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { key: 'office',   label: 'Work',    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { key: 'business', label: 'Partner', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

/* ── Add Location Modal ────────────────────────────────── */
function AddLocationModal({ onClose, onAdd }: { onClose: () => void; onAdd: (loc: Omit<LocationEntry, 'id' | 'isDefault'>) => void }) {
  const [query, setQuery]                     = useState('');
  const [suggestions, setSuggestions]         = useState<AddrSuggestion[]>([]);
  const [selected, setSelected]               = useState<AddrSuggestion | null>(null);
  const [showDrop, setShowDrop]               = useState(false);
  const [name, setName]                       = useState('');
  const [locType, setLocType]                 = useState<LocType>('home');
  const debounceRef                           = useRef<ReturnType<typeof setTimeout>>(null!);

  const handleSearch = (val: string) => {
    setQuery(val);
    setSelected(null);
    clearTimeout(debounceRef.current);
    if (val.length < 2) { setSuggestions([]); setShowDrop(false); return; }
    debounceRef.current = setTimeout(() => {
      const matches = ADDR_SUGGESTIONS.filter(s =>
        s.address.toLowerCase().includes(val.toLowerCase()) || s.city.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(matches.length > 0 ? matches : ADDR_SUGGESTIONS);
      setShowDrop(true);
    }, 300);
  };

  const pickSuggestion = (s: AddrSuggestion) => {
    setSelected(s);
    setQuery(s.address);
    setShowDrop(false);
  };

  const handleAdd = () => {
    if (!selected) return;
    onAdd({ type: locType, name: name.trim() || selected.address, address: selected.address, state: selected.city });
    onClose();
  };

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(16,24,40,0.52)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 48px rgba(16,24,40,0.18)', display: 'flex', flexDirection: 'column', maxHeight: '92vh', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '24px 24px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke={BRAND} strokeWidth="2"/></svg>
            </div>
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F2F4F7', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </button>
          </div>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '19px', color: '#101828', marginBottom: '3px' }}>Add Location</h2>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085', marginBottom: '18px' }}>Add a new location.</p>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>

          {/* Map */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', height: '190px', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=440&h=220&fit=crop&auto=format&q=70" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-100%)' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#D92D20" stroke="#fff" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" fill="#fff"/></svg>
            </div>
          </div>

          {/* Search with autocomplete */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <svg style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#98A2B3" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"/></svg>
            <input
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search an address..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 48px 12px 42px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#101828', border: '1.5px solid #EAECF0', borderRadius: PILL, outline: 'none', background: '#F9FAFB', transition: 'border-color 0.15s,box-shadow 0.15s' }}
              onFocus={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(165,74,255,0.12)'; e.currentTarget.style.background = '#fff'; }}
              onBlur={e => { setTimeout(() => setShowDrop(false), 180); e.currentTarget.style.borderColor = '#EAECF0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F9FAFB'; }}
            />
            <button style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="12" r="3" fill={BRAND}/><line x1="12" y1="2" x2="12" y2="5" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>

            {/* Suggestions dropdown */}
            {showDrop && suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#ffffff', borderRadius: '14px', boxShadow: '0 8px 28px rgba(16,24,40,0.13)', border: '1px solid #EAECF0', zIndex: 200, overflow: 'hidden' }}>
                {suggestions.map((s, i) => (
                  <button key={i} onMouseDown={() => pickSuggestion(s)}
                    style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '11px 14px', background: 'transparent', border: 'none', borderBottom: i < suggestions.length - 1 ? '1px solid #F2F4F7' : 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <svg style={{ marginTop: '2px', flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#98A2B3" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#98A2B3" strokeWidth="2"/></svg>
                    <div>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828', lineHeight: '1.3' }}>{s.address}</p>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#98A2B3', marginTop: '1px' }}>{s.city}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected "Current" card */}
          {selected ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '13px 16px', border: `1.5px solid ${BRAND}`, borderRadius: '14px', background: 'rgba(165,74,255,0.03)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg style={{ marginTop: '2px', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke={BRAND} strokeWidth="2"/></svg>
                <div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828' }}>{selected.address}</p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', marginTop: '2px' }}>{selected.city}</p>
                </div>
              </div>
              <button onClick={() => { setSelected(null); setQuery(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0, flexShrink: 0, marginLeft: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          ) : (
            /* Empty state */
            <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
              <svg width="70" height="70" viewBox="0 0 100 100" fill="none" style={{ marginBottom: '10px' }}>
                <circle cx="50" cy="50" r="42" fill="#F4EBFF"/>
                <path d="M62 36c0 10-13 20-13 20s-13-10-13-20a13 13 0 0 1 26 0z" fill={BRAND} opacity="0.85"/>
                <circle cx="62" cy="36" r="5" fill="white"/>
              </svg>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3', lineHeight: '1.6' }}>Search an address or locate pin<br/>on map of your location</p>
            </div>
          )}

          {/* Name field — always visible */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828', display: 'block', marginBottom: '8px' }}>Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Home, Office..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 20px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#101828', border: '1.5px solid #EAECF0', borderRadius: PILL, outline: 'none', background: '#F9FAFB', transition: 'border-color 0.15s,box-shadow 0.15s' }}
              onFocus={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(165,74,255,0.12)'; e.currentTarget.style.background = '#fff'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#EAECF0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F9FAFB'; }}
            />
          </div>

          {/* Label picker */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828', display: 'block', marginBottom: '14px' }}>Add a label</label>
            <div style={{ display: 'flex', gap: '20px' }}>
              {LOC_LABELS.map(l => {
                const active = locType === l.key;
                return (
                  <div key={l.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setLocType(l.key)}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: active ? GRAD : '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', color: active ? '#ffffff' : '#667085', border: active ? 'none' : '1.5px solid #EAECF0' }}>
                      {l.icon}
                    </div>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: active ? 700 : 500, color: active ? BRAND : '#667085' }}>{l.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: '16px 24px 24px', display: 'flex', gap: '12px', borderTop: '1px solid #EAECF0' }}>
          <button onClick={onClose} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054', background: '#fff', border: '1.5px solid #D0D5DD', borderRadius: PILL, padding: '13px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleAdd} disabled={!selected} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#ffffff', background: selected ? GRAD : '#D0D5DD', border: 'none', borderRadius: PILL, padding: '13px', cursor: selected ? 'pointer' : 'not-allowed', transition: 'background 0.2s', boxShadow: selected ? '0 4px 14px rgba(165,74,255,0.3)' : 'none' }}>Add Location</button>
        </div>
      </div>
    </div>
  );
}

/* ── Edit Location Modal ───────────────────────────────── */
// LOC_LABELS is defined above and shared with AddLocationModal
const EDIT_LABELS = LOC_LABELS;

function EditLocationModal({ loc, onClose, onSave }: { loc: LocationEntry; onClose: () => void; onSave: (l: LocationEntry) => void }) {
  const [query, setQuery]       = useState('');
  const [suggestions, setSugs]  = useState<AddrSuggestion[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const [address, setAddress]   = useState(loc.address);
  const [locState, setLocState] = useState(loc.state);
  const [locType, setLocType]   = useState<LocType>(loc.type);
  const [name, setName]         = useState(loc.name);
  const debRef                  = useRef<ReturnType<typeof setTimeout>>(null!);

  const handleSearch = (val: string) => {
    setQuery(val);
    clearTimeout(debRef.current);
    if (val.length < 2) { setSugs([]); setShowDrop(false); return; }
    debRef.current = setTimeout(() => {
      const matches = ADDR_SUGGESTIONS.filter(s =>
        s.address.toLowerCase().includes(val.toLowerCase()) || s.city.toLowerCase().includes(val.toLowerCase())
      );
      setSugs(matches.length > 0 ? matches : ADDR_SUGGESTIONS);
      setShowDrop(true);
    }, 300);
  };

  const pickSug = (s: AddrSuggestion) => {
    setAddress(s.address);
    setLocState(s.city);
    setQuery(s.address);
    setShowDrop(false);
  };

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(16,24,40,0.52)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 48px rgba(16,24,40,0.18)', display: 'flex', flexDirection: 'column', maxHeight: '92vh', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EAECF0', flexShrink: 0 }}>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#101828' }}>Edit location</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {loc.isDefault && <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 700, color: '#079455' }}>Default</span>}
            <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F2F4F7', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {/* Address search */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#98A2B3" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"/></svg>
            <input
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search an address..."
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 46px 12px 40px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#101828', border: '1.5px solid #EAECF0', borderRadius: PILL, outline: 'none', background: '#F9FAFB', transition: 'border-color 0.15s,box-shadow 0.15s' }}
              onFocus={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(165,74,255,0.12)'; e.currentTarget.style.background = '#fff'; }}
              onBlur={e => { setTimeout(() => setShowDrop(false), 180); e.currentTarget.style.borderColor = '#EAECF0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F9FAFB'; }}
            />
            <button style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="12" r="3" fill={BRAND}/><line x1="12" y1="2" x2="12" y2="5" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {showDrop && suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#ffffff', borderRadius: '14px', boxShadow: '0 8px 28px rgba(16,24,40,0.13)', border: '1px solid #EAECF0', zIndex: 200, overflow: 'hidden' }}>
                {suggestions.map((s, i) => (
                  <button key={i} onMouseDown={() => pickSug(s)}
                    style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: 'transparent', border: 'none', borderBottom: i < suggestions.length - 1 ? '1px solid #F2F4F7' : 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <svg style={{ marginTop: '2px', flexShrink: 0 }} width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#98A2B3" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#98A2B3" strokeWidth="2"/></svg>
                    <div>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828' }}>{s.address}</p>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#98A2B3', marginTop: '1px' }}>{s.city}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current address card */}
          <div style={{ background: '#F9FAFB', border: '1.5px solid #EAECF0', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828' }}>{address}</p>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', marginTop: '2px' }}>{locState}</p>
            </div>
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 500, color: '#98A2B3', flexShrink: 0, marginLeft: '8px' }}>Current</span>
          </div>

          {/* Name input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828', display: 'block', marginBottom: '8px' }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 20px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#101828', border: '1.5px solid #EAECF0', borderRadius: PILL, outline: 'none', background: '#F9FAFB', transition: 'border-color 0.15s,box-shadow 0.15s' }}
              onFocus={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(165,74,255,0.12)'; e.currentTarget.style.background = '#fff'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#EAECF0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F9FAFB'; }}
            />
          </div>

          {/* Label picker — same as onboarding */}
          <div>
            <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828', display: 'block', marginBottom: '14px' }}>Add a label</label>
            <div style={{ display: 'flex', gap: '18px' }}>
              {EDIT_LABELS.map(l => {
                const active = locType === l.key;
                return (
                  <div key={l.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setLocType(l.key)}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: active ? GRAD : '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', color: active ? '#ffffff' : '#667085', border: active ? 'none' : '1.5px solid #EAECF0' }}>
                      {l.icon}
                    </div>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: active ? 700 : 500, color: active ? BRAND : '#667085' }}>{l.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, padding: '16px 24px 24px', display: 'flex', gap: '12px', borderTop: '1px solid #EAECF0' }}>
          <button onClick={onClose} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054', background: '#fff', border: '1.5px solid #D0D5DD', borderRadius: PILL, padding: '13px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { onSave({ ...loc, name, address, state: locState, type: locType }); onClose(); }} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#ffffff', background: GRAD, border: 'none', borderRadius: PILL, padding: '13px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(165,74,255,0.3)' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete Confirmation Modal ─────────────────────────── */
function DeleteConfirmModal({ name, onClose, onConfirm }: { name: string; onClose: () => void; onConfirm: () => void }) {
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(16,24,40,0.52)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '360px', padding: '32px 28px', boxShadow: '0 24px 48px rgba(16,24,40,0.18)', textAlign: 'center' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="#D92D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" stroke="#D92D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#D92D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#101828', marginBottom: '8px' }}>Delete location?</h3>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#667085', lineHeight: '1.6', marginBottom: '28px' }}>Are you sure you want to delete <strong style={{ color: '#344054' }}>{name}</strong>? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054', background: '#fff', border: '1.5px solid #D0D5DD', borderRadius: PILL, padding: '12px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#ffffff', background: 'linear-gradient(135deg,#F97066,#D92D20)', border: 'none', borderRadius: PILL, padding: '12px', cursor: 'pointer' }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ── Nav config ────────────────────────────────────────── */
const EXPLORE_ITEMS = [
  { label: 'Sellers',    Icon: UserIcon,        desc: 'Browse service providers', href: '/explore/search?type=sellers' },
  { label: 'Buyers',     Icon: ShoppingBagIcon, desc: 'Find what you need',       href: '/explore/search'             },
  { label: 'Categories', Icon: GridIcon,        desc: 'All service categories',   href: '/categories'                 },
];
const NAV_LINKS = [
  { label: 'Home',         href: '/',        protected: false },
  { label: 'Explore',      href: '/explore', hasDropdown: true, protected: false },
  { label: 'My Bookings',  href: '#',        protected: true  },
  { label: 'Custom Favor', href: '#',        protected: true  },
];
const PROFILE_AVA = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format&q=80';

/* ── Profile menu items ─────────────────────────────────── */
const PROFILE_MENU = [
  { label: 'Edit profile',       href: '/profile/edit', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg> },
  { label: 'Billing & Payments', href: '/billing',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { label: 'Security',           icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: 'Dispute center',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { label: 'Privacy policy',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

/* ═══════════════════════════════════════════════════════════
   NAVBAR COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const router = useRouter();

  const [scrolled, setScrolled]         = useState(false);
  const [exploreOpen, setExploreOpen]   = useState(false);
  const [authOpen, setAuthOpen]         = useState(false);
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [mounted, setMounted]           = useState(false);
  const [notifOpen, setNotifOpen]       = useState(false);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [locationOpen, setLocOpen]      = useState(false);
  const [readIds, setReadIds]           = useState<Set<number>>(new Set([1]));
  const [locations, setLocations]       = useState<LocationEntry[]>(DEFAULT_LOCATIONS);
  const [addLocOpen, setAddLocOpen]     = useState(false);
  const [editLoc, setEditLoc]           = useState<LocationEntry | null>(null);
  const [deleteLoc, setDeleteLoc]       = useState<LocationEntry | null>(null);

  const notifRef    = useRef<HTMLDivElement>(null);
  const profileRef  = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('whoCan_loggedIn') === 'true');
    setMounted(true);
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current    && !notifRef.current.contains(e.target as Node))    setNotifOpen(false);
      if (profileRef.current  && !profileRef.current.contains(e.target as Node))  setProfileOpen(false);
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setLocOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead  = () => setReadIds(new Set(ALL_NOTIFS.map(n => n.id)));
  const unreadCount  = ALL_NOTIFS.filter(n => !readIds.has(n.id) && !n.read).length;
  const setDefault   = (id: number) => setLocations(prev => prev.map(l => ({ ...l, isDefault: l.id === id })));
  const deleteLocById = (id: number) => setLocations(prev => prev.filter(l => l.id !== id));
  const addLocation  = (loc: Omit<LocationEntry, 'id' | 'isDefault'>) =>
    setLocations(prev => [...prev, { ...loc, id: Date.now(), isDefault: false }]);
  const saveLocation = (updated: LocationEntry) =>
    setLocations(prev => prev.map(l => l.id === updated.id ? updated : l));
  const logout = () => { localStorage.removeItem('whoCan_loggedIn'); setIsLoggedIn(false); setProfileOpen(false); };

  const markColor = scrolled ? '#9643E8' : '#BF75FF';
  const textColor = scrolled ? '#9643E8' : '#ffffff';
  const NOTIF_GROUPS = ['Today', 'Last week'] as const;

  return (
    <>
      {authOpen    && <AuthGateModal onClose={() => setAuthOpen(false)} />}
      {addLocOpen  && <AddLocationModal onClose={() => setAddLocOpen(false)} onAdd={addLocation} />}
      {editLoc     && <EditLocationModal loc={editLoc} onClose={() => setEditLoc(null)} onSave={saveLocation} />}
      {deleteLoc   && <DeleteConfirmModal name={deleteLoc.name} onClose={() => setDeleteLoc(null)} onConfirm={() => deleteLocById(deleteLoc.id)} />}

      <header className="hero-nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '12px 24px', transition: 'all 0.3s ease' }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(26,10,46,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '9999px', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: scrolled ? '0px 4px 24px rgba(165,74,255,0.12)' : '0px 4px 24px rgba(0,0,0,0.2)', border: scrolled ? '1px solid rgba(165,74,255,0.15)' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.35s ease' }}>

          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
            <WhoCanLogo markColor={markColor} textColor={textColor} />
          </a>

          {/* Nav links */}
          <ul style={{ display: 'flex', listStyle: 'none', gap: '4px', alignItems: 'center' }}>
            {NAV_LINKS.map(link =>
              link.hasDropdown ? (
                <li key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setExploreOpen(true)}
                  onMouseLeave={() => setExploreOpen(false)}>
                  <a href={link.href} style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '14px', color: scrolled ? '#344054' : 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: PILL, transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '4px', background: exploreOpen ? (scrolled ? 'rgba(165,74,255,0.08)' : 'rgba(255,255,255,0.1)') : 'transparent' }}>
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s ease', transform: exploreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '8px', opacity: exploreOpen ? 1 : 0, pointerEvents: exploreOpen ? 'all' : 'none', transition: 'opacity 0.15s ease', zIndex: 200 }}>
                    <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #EAECF0', boxShadow: '0 8px 32px rgba(16,24,40,0.14)', minWidth: '220px', padding: '6px 0', overflow: 'hidden' }}>
                      {EXPLORE_ITEMS.map((item, i) => (
                        <a key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 500, color: '#344054', textDecoration: 'none', transition: 'all 0.15s ease', borderTop: i > 0 ? '1px solid #F2F4F7' : 'none' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F8F0FF'; el.style.color = BRAND; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#344054'; }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: BRAND }}>
                            <item.Icon />
                          </div>
                          <div>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '1.2', color: 'inherit' }}>{item.label}</p>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3', marginTop: '2px' }}>{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              ) : link.protected && mounted && !isLoggedIn ? (
                <li key={link.label}>
                  <button onClick={() => setAuthOpen(true)} style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '14px', color: scrolled ? '#344054' : 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: PILL, transition: 'all 0.2s ease', display: 'block', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = scrolled ? 'rgba(165,74,255,0.08)' : 'rgba(255,255,255,0.1)'; el.style.color = scrolled ? BRAND : '#ffffff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = scrolled ? '#344054' : 'rgba(255,255,255,0.9)'; }}>
                    {link.label}
                  </button>
                </li>
              ) : (
                <li key={link.label}>
                  <a href={link.href} style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '14px', color: scrolled ? '#344054' : 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: PILL, transition: 'all 0.2s ease', display: 'block' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = scrolled ? 'rgba(165,74,255,0.08)' : 'rgba(255,255,255,0.1)'; el.style.color = scrolled ? BRAND : '#ffffff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = scrolled ? '#344054' : 'rgba(255,255,255,0.9)'; }}>
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Right side — gated on mounted to prevent flash of wrong auth state */}
          {!mounted ? (
            /* Placeholder preserves layout width while localStorage is read */
            <div style={{ width: '148px', height: '36px' }} />
          ) : !isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="#app" style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', background: '#FEC84B', padding: '8px 16px', borderRadius: PILL, transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FDB022'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FEC84B'; }}>
                Get App
              </a>
              <a href="/auth/login" style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '14px', color: scrolled ? '#344054' : 'rgba(255,255,255,0.9)', padding: '8px 14px', borderRadius: PILL, transition: 'color 0.2s ease' }}>Log in</a>
              <a href="/auth/signup" style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', background: GRAD, padding: '8px 20px', borderRadius: PILL, transition: 'all 0.2s ease', boxShadow: '0 2px 12px rgba(165,74,255,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                Sign up
              </a>
            </div>
          ) : (
            /* ── Logged-in icon bar ── */
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a href="#app" style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', background: '#FEC84B', padding: '8px 16px', borderRadius: PILL, transition: 'all 0.2s ease', whiteSpace: 'nowrap', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FDB022'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FEC84B'; }}>
                Get App
              </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: GRAD, borderRadius: PILL, padding: '6px 10px' }}>

              {/* Favorites heart */}
              <button onClick={() => router.push('/favorites')}
                style={{ width: '36px', height: '36px', borderRadius: PILL, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>

              {/* Chat */}
              <button onClick={() => router.push('/chat')} style={{ width: '36px', height: '36px', borderRadius: PILL, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Notification bell */}
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); setLocOpen(false); }}
                  style={{ width: '36px', height: '36px', borderRadius: PILL, background: notifOpen ? '#ffffff' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s', position: 'relative' }}
                  onMouseEnter={e => { if (!notifOpen) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)'; }}
                  onMouseLeave={e => { if (!notifOpen) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={notifOpen ? BRAND : 'rgba(255,255,255,0.9)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={notifOpen ? BRAND : 'rgba(255,255,255,0.9)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {unreadCount > 0 && <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#F43F5E', border: '1.5px solid rgba(165,74,255,0.6)' }}/>}
                </button>

                {notifOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 14px)', right: '-8px', width: '360px', background: '#ffffff', borderRadius: '20px', boxShadow: '0 20px 48px rgba(16,24,40,0.16)', border: '1px solid #EAECF0', overflow: 'hidden', zIndex: 500 }}>
                    <div style={{ position: 'absolute', top: '-6px', right: '18px', width: '12px', height: '12px', background: '#ffffff', border: '1px solid #EAECF0', borderBottom: 'none', borderRight: 'none', transform: 'rotate(45deg)' }}/>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px' }}>
                      <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: '#101828' }}>Notifications</h3>
                      <button onClick={markAllRead} style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: BRAND, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Mark all as read</button>
                    </div>
                    <div style={{ height: '1px', background: '#EAECF0' }}/>
                    <div style={{ maxHeight: '440px', overflowY: 'auto' }}>
                      {NOTIF_GROUPS.map(group => (
                        <div key={group}>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 600, color: '#98A2B3', padding: '12px 20px 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group}</p>
                          {ALL_NOTIFS.filter(n => n.group === group).map(notif => {
                            const isUnread = !notif.read && !readIds.has(notif.id);
                            return (
                              <div key={notif.id} onClick={() => setReadIds(prev => new Set([...prev, notif.id]))}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 20px', background: isUnread ? 'rgba(165,74,255,0.05)' : 'transparent', cursor: 'pointer', position: 'relative' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isUnread ? 'rgba(165,74,255,0.09)' : '#F9FAFB'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isUnread ? 'rgba(165,74,255,0.05)' : 'transparent'; }}>
                                {'avatar' in notif && notif.type === 'avatar'
                                  ? <img src={(notif as { avatar: string }).avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: PILL, objectFit: 'cover', flexShrink: 0 }}/>
                                  : <NotifIcon type={notif.type}/>
                                }
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  {'name' in notif
                                    ? <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#344054', lineHeight: '1.5' }}><span style={{ fontWeight: 700, color: '#101828' }}>{(notif as {name:string}).name}</span>{' '}{'action' in notif ? (notif as {action:string}).action : ''}</p>
                                    : <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#344054', lineHeight: '1.5', fontWeight: isUnread ? 600 : 400 }}>{'text' in notif ? (notif as {text:string}).text : ''}</p>
                                  }
                                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#98A2B3', marginTop: '3px' }}>{notif.time}</p>
                                </div>
                                {isUnread && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: BRAND, flexShrink: 0, marginTop: '6px' }}/>}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <div style={{ height: '1px', background: '#EAECF0' }}/>
                  </div>
                )}
              </div>

              {/* Location pin */}
              <div ref={locationRef} style={{ position: 'relative' }}>
                <button onClick={() => { setLocOpen(o => !o); setNotifOpen(false); setProfileOpen(false); }}
                  style={{ width: '36px', height: '36px', borderRadius: PILL, background: locationOpen ? '#ffffff' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!locationOpen) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.28)'; }}
                  onMouseLeave={e => { if (!locationOpen) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={locationOpen ? BRAND : 'rgba(255,255,255,0.9)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke={locationOpen ? BRAND : 'rgba(255,255,255,0.9)'} strokeWidth="2"/>
                  </svg>
                </button>

                {/* Location dropdown */}
                {locationOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 14px)', right: '-8px', width: '360px', background: '#ffffff', borderRadius: '20px', boxShadow: '0 20px 48px rgba(16,24,40,0.16)', border: '1px solid #EAECF0', overflow: 'hidden', zIndex: 500 }}>
                    <div style={{ position: 'absolute', top: '-6px', right: '18px', width: '12px', height: '12px', background: '#ffffff', border: '1px solid #EAECF0', borderBottom: 'none', borderRight: 'none', transform: 'rotate(45deg)' }}/>

                    {/* Header */}
                    <div style={{ padding: '20px 20px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke={BRAND} strokeWidth="2"/></svg>
                        </div>
                        <button onClick={() => setLocOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F2F4F7', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                      <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '17px', color: '#101828', marginBottom: '2px' }}>Change your location</h3>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085', marginBottom: '16px' }}>Update your location details.</p>
                    </div>

                    {/* Location list */}
                    <div style={{ padding: '0 16px', maxHeight: '320px', overflowY: 'auto' }}>
                      {locations.map(loc => (
                        <div key={loc.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', marginBottom: '8px', border: `1.5px solid ${loc.isDefault ? BRAND : '#EAECF0'}`, borderRadius: '14px', background: loc.isDefault ? 'rgba(165,74,255,0.03)' : '#ffffff', transition: 'border-color 0.15s' }}>
                          <LocTypeIcon type={loc.type}/>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#101828', marginBottom: '2px' }}>{loc.name}</p>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>{loc.address}</p>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', marginBottom: '10px' }}>{loc.state}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {loc.isDefault
                                ? <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 700, color: '#079455' }}>Default</span>
                                : <button onClick={() => setDefault(loc.id)} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: BRAND, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Set as default</button>
                              }
                              <button onClick={() => { setEditLoc(loc); setLocOpen(false); }} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: BRAND, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Edit</button>
                              <button onClick={() => { setDeleteLoc(loc); setLocOpen(false); }} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#D92D20', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add another */}
                    <div style={{ padding: '4px 20px 16px' }}>
                      <button onClick={() => { setAddLocOpen(true); setLocOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: BRAND, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round"/></svg>
                        Add another
                      </button>
                    </div>

                    {/* Use Current Location */}
                    <div style={{ padding: '0 16px 20px' }}>
                      <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: BRAND, background: '#F4EBFF', border: 'none', borderRadius: PILL, padding: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EDD9FF'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F4EBFF'; }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={BRAND} strokeWidth="2"/><circle cx="12" cy="12" r="3" fill={BRAND}/><line x1="12" y1="2" x2="12" y2="5" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="22" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="5" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="12" x2="22" y2="12" stroke={BRAND} strokeWidth="2" strokeLinecap="round"/></svg>
                        Use Current Location
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile avatar */}
              <div ref={profileRef} style={{ position: 'relative' }}>
                <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); setLocOpen(false); }}
                  style={{ width: '36px', height: '36px', borderRadius: PILL, border: profileOpen ? '2.5px solid #ffffff' : '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', overflow: 'hidden', padding: 0, transition: 'border 0.15s', flexShrink: 0, position: 'relative' }}>
                  <img src={PROFILE_AVA} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                  {/* Online dot */}
                  <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '9px', height: '9px', borderRadius: '50%', background: '#22C55E', border: '1.5px solid #fff' }}/>
                </button>

                {/* Profile dropdown — matches reference */}
                {profileOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 14px)', right: '-8px', width: '240px', background: '#ffffff', borderRadius: '20px', boxShadow: '0 20px 48px rgba(16,24,40,0.14)', border: '1px solid #EAECF0', overflow: 'hidden', zIndex: 500 }}>
                    <div style={{ position: 'absolute', top: '-6px', right: '18px', width: '12px', height: '12px', background: '#ffffff', border: '1px solid #EAECF0', borderBottom: 'none', borderRight: 'none', transform: 'rotate(45deg)' }}/>

                    {/* User info */}
                    <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={PROFILE_AVA} alt="Profile" style={{ width: '44px', height: '44px', borderRadius: PILL, objectFit: 'cover' }}/>
                        <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E', border: '2px solid #fff' }}/>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#101828', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Olivia Rhye</p>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>olivia@untitledui.com</p>
                      </div>
                    </div>

                    <div style={{ height: '1px', background: '#F2F4F7' }}/>

                    {/* Menu items */}
                    <div style={{ padding: '6px 0' }}>
                      {PROFILE_MENU.map(item => (
                        <button key={item.label}
                          onClick={() => { if ('href' in item && item.href) { router.push(item.href); setProfileOpen(false); } }}
                          style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 18px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 500, color: '#344054', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.1s' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F9FAFB'; el.style.color = '#101828'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#344054'; }}>
                          <span style={{ color: '#667085', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ height: '1px', background: '#F2F4F7' }}/>

                    <div style={{ padding: '6px 0 8px' }}>
                      <button onClick={logout} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 18px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 600, color: '#D92D20', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.1s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEF3F2'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="#D92D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
