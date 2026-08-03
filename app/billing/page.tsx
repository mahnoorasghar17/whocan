'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BRAND = '#A54AFF';
const GRAD  = 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)';
const PILL  = '9999px';

type Transaction = {
  id: string;
  invoice: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
  cardLast4: string;
  refNumber: string;
  seller: string;
  sellerAvatar: string;
};

const TRANSACTIONS: Transaction[] = [
  { id: '1', invoice: 'Deep Home Cleaning – Dec 2024',  amount: '$200.00', date: 'Dec 1, 2024',  status: 'Paid', cardLast4: '1234', refNumber: 'WC-2024-001234', seller: 'Alfonzo Schuessler', sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
  { id: '2', invoice: 'Electric Supply Fix – Nov 2024', amount: '$135.00', date: 'Nov 15, 2024', status: 'Paid', cardLast4: '1234', refNumber: 'WC-2024-001189', seller: 'James Thornton',    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop' },
  { id: '3', invoice: 'Garden Landscaping – Oct 2024',  amount: '$120.00', date: 'Oct 22, 2024', status: 'Paid', cardLast4: '1234', refNumber: 'WC-2024-001056', seller: 'Sam Smith',          sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop' },
  { id: '4', invoice: 'Plumbing Repair – Sep 2024',     amount: '$150.00', date: 'Sep 8, 2024',  status: 'Paid', cardLast4: '5678', refNumber: 'WC-2024-000934', seller: 'Sophie Lee',          sellerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop' },
  { id: '5', invoice: 'Interior Painting – Aug 2024',   amount: '$300.00', date: 'Aug 19, 2024', status: 'Paid', cardLast4: '1234', refNumber: 'WC-2024-000812', seller: 'Liam Jones',          sellerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=60&h=60&fit=crop' },
  { id: '6', invoice: 'Furniture Assembly – Jul 2024',  amount: '$95.00',  date: 'Jul 3, 2024',  status: 'Paid', cardLast4: '1234', refNumber: 'WC-2024-000698', seller: 'Maria Santos',        sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop' },
  { id: '7', invoice: 'Deep Home Cleaning – Jun 2024',  amount: '$200.00', date: 'Jun 12, 2024', status: 'Paid', cardLast4: '1234', refNumber: 'WC-2024-000601', seller: 'Alfonzo Schuessler', sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
];

function StatusBadge({ status }: { status: Transaction['status'] }) {
  const map = {
    Paid:    { bg: '#ECFDF3', border: '#ABEFC6', color: '#067647', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#067647" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    Pending: { bg: '#FFFAEB', border: '#FEDF89', color: '#B54708', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#B54708" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#B54708" strokeWidth="2" strokeLinecap="round"/></svg> },
    Failed:  { bg: '#FEF3F2', border: '#FECDCA', color: '#D92D20', icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#D92D20" strokeWidth="2.5" strokeLinecap="round"/></svg> },
  };
  const s = map[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: PILL, padding: '2px 8px 2px 6px' }}>
      {s.icon}
      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 500, color: s.color }}>{status}</span>
    </span>
  );
}

function ReceiptModal({ tx, onClose }: { tx: Transaction; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(16,24,40,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 20px 64px rgba(16,24,40,0.18)', width: '100%', maxWidth: '440px', overflow: 'hidden' }}>

        {/* Modal header */}
        <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F2F4F7', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#667085" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div style={{ padding: '16px 24px 28px' }}>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#101828', marginBottom: '4px' }}>Payment Receipt</h2>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085', marginBottom: '24px' }}>{tx.invoice}</p>

          {/* Amount block */}
          <div style={{ textAlign: 'center', padding: '20px', background: '#F9FAFB', borderRadius: '16px', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total paid</p>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '34px', color: '#101828', marginBottom: '10px' }}>{tx.amount}</p>
            <StatusBadge status={tx.status} />
          </div>

          {/* Detail rows */}
          {[
            { label: 'Reference number', value: tx.refNumber },
            { label: 'Payment date',     value: tx.date },
            { label: 'Payment method',   value: `Visa ending in ${tx.cardLast4}` },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid #F2F4F7' : 'none' }}>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>{row.label}</span>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F2F4F7' }}>
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>Service provider</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={tx.sellerAvatar} alt={tx.seller} style={{ width: '24px', height: '24px', borderRadius: PILL, objectFit: 'cover' }} />
              <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828' }}>{tx.seller}</span>
            </div>
          </div>

          {/* Download button */}
          <button style={{ marginTop: '20px', width: '100%', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', background: GRAD, border: 'none', borderRadius: PILL, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(165,74,255,0.25)', transition: 'opacity 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Download receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [receiptTx, setReceiptTx] = useState<Transaction | null>(null);

  return (
    <>
      <Navbar />
      {receiptTx && <ReceiptModal tx={receiptTx} onClose={() => setReceiptTx(null)} />}

      <main style={{ minHeight: '100vh', background: '#F9FAFB' }}>

        {/* Header band */}
        <div style={{ background: '#fff', borderBottom: '1px solid #EAECF0', paddingTop: '104px', paddingBottom: '32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 500, color: '#667085', textDecoration: 'none', marginBottom: '16px', transition: 'color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BRAND; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#667085'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '28px', color: '#101828', marginBottom: '4px' }}>Billing & Payments</h1>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#667085' }}>Manage your billing and payment details.</p>
              </div>
              <button style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', background: GRAD, border: 'none', borderRadius: PILL, padding: '11px 22px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(165,74,255,0.25)', transition: 'opacity 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
                Add payment method
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* ── Payment Methods ── */}
          <div style={{ background: '#fff', border: '1px solid #EAECF0', borderRadius: '16px', boxShadow: '0 1px 2px rgba(16,24,40,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAECF0' }}>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '17px', color: '#101828', marginBottom: '2px' }}>Payment methods</h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>Cards saved to your account.</p>
            </div>

            {/* Saved card row */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F2F4F7', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: '#fff', border: '1px solid #F2F4F7', borderRadius: '8px', width: '58px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 4px rgba(16,24,40,0.06)' }}>
                <span style={{ fontFamily: 'Arial,sans-serif', fontWeight: 900, fontSize: '13px', color: '#1A1F71', letterSpacing: '-0.02em' }}>VISA</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054' }}>Visa ending in 1234</p>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 600, color: '#027A48', background: '#ECFDF3', border: '1px solid #ABEFC6', borderRadius: PILL, padding: '1px 8px' }}>Default</span>
                </div>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>Expiry 06/2026</p>
              </div>
              <button style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#344054', background: '#fff', border: '1px solid #D0D5DD', borderRadius: PILL, padding: '8px 16px', cursor: 'pointer', flexShrink: 0, boxShadow: '0 1px 2px rgba(16,24,40,0.05)', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BRAND; el.style.color = BRAND; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D0D5DD'; el.style.color = '#344054'; }}>
                Edit
              </button>
            </div>

            {/* Add another */}
            <div style={{ padding: '16px 24px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: BRAND, background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'opacity 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round"/></svg>
                Add payment method
              </button>
            </div>
          </div>

          {/* ── Billing History ── */}
          <div style={{ background: '#fff', border: '1px solid #EAECF0', borderRadius: '16px', boxShadow: '0 1px 2px rgba(16,24,40,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAECF0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '17px', color: '#101828', marginBottom: '2px' }}>Billing history</h2>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>{TRANSACTIONS.length} transactions</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#344054', background: '#fff', border: '1px solid #D0D5DD', borderRadius: PILL, padding: '8px 16px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(16,24,40,0.05)', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BRAND; el.style.color = BRAND; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D0D5DD'; el.style.color = '#344054'; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download all
              </button>
            </div>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 140px 100px 52px', background: '#F9FAFB', borderBottom: '1px solid #EAECF0', padding: '0 24px' }}>
              {['Invoice', 'Amount', 'Date', 'Status', ''].map(h => (
                <div key={h} style={{ padding: '11px 0', fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 500, color: '#475467' }}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            {TRANSACTIONS.map(tx => (
              <div key={tx.id}
                onClick={() => setReceiptTx(tx)}
                style={{ display: 'grid', gridTemplateColumns: '1fr 110px 140px 100px 52px', padding: '0 24px', borderBottom: '1px solid #F2F4F7', cursor: 'pointer', transition: 'background 0.1s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FAFAFA'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <div style={{ padding: '18px 0', fontFamily: 'Poppins,sans-serif', fontWeight: 500, fontSize: '14px', color: '#101828', display: 'flex', alignItems: 'center' }}>{tx.invoice}</div>
                <div style={{ padding: '18px 0', fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#475467', display: 'flex', alignItems: 'center' }}>{tx.amount}</div>
                <div style={{ padding: '18px 0', fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#475467', display: 'flex', alignItems: 'center' }}>{tx.date}</div>
                <div style={{ padding: '18px 0', display: 'flex', alignItems: 'center' }}><StatusBadge status={tx.status} /></div>
                <div style={{ padding: '18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={e => { e.stopPropagation(); setReceiptTx(tx); }}
                    style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F4EBFF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
