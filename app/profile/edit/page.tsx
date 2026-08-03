'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BRAND = '#A54AFF';
const GRAD  = 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)';
const PILL  = '9999px';
const BORDER = '#D0D5DD';

const COUNTRIES = [
  { code: '+92',  name: 'Pakistan (+92)' },
  { code: '+1',   name: 'United States (+1)' },
  { code: '+44',  name: 'United Kingdom (+44)' },
  { code: '+971', name: 'UAE (+971)' },
  { code: '+966', name: 'Saudi Arabia (+966)' },
  { code: '+20',  name: 'Egypt (+20)' },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'Poppins,sans-serif',
  fontSize: '15px',
  color: '#101828',
  background: '#fff',
  border: `1px solid ${BORDER}`,
  borderRadius: PILL,
  padding: '11px 16px',
  outline: 'none',
  boxSizing: 'border-box',
  boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'Poppins,sans-serif',
  fontSize: '13px',
  fontWeight: 600,
  color: '#344054',
  marginBottom: '6px',
  display: 'block',
};

export default function EditProfilePage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&auto=format&q=80'
  );
  const [fullName,     setFullName]     = useState('Olivia Rhye');
  const [dob,          setDob]          = useState('1998-04-15');
  const [gender,       setGender]       = useState('Female');
  const [phone,        setPhone]        = useState('3001234567');
  const [countryCode,  setCountryCode]  = useState('+92');
  const [saved,        setSaved]        = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = BRAND;
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165,74,255,0.12)';
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = BORDER;
    e.currentTarget.style.boxShadow = '0 1px 2px rgba(16,24,40,0.05)';
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#F9FAFB' }}>

        {/* Header band */}
        <div style={{ background: '#fff', borderBottom: '1px solid #EAECF0', paddingTop: '104px', paddingBottom: '32px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 500, color: '#667085', textDecoration: 'none', marginBottom: '16px', transition: 'color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BRAND; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#667085'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back
            </a>
            <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '28px', color: '#101828' }}>Edit Profile</h1>
          </div>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px 80px' }}>
          <div style={{ background: '#fff', border: '1px solid #EAECF0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(16,24,40,0.05)' }}>

            {/* ── Photo section ── */}
            <div style={{ padding: '28px 32px', borderBottom: '1px solid #F2F4F7', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                {avatar
                  ? <img src={avatar} alt="Profile" style={{ width: '96px', height: '96px', borderRadius: PILL, objectFit: 'cover', border: '3px solid #F4EBFF', boxShadow: '0 4px 16px rgba(165,74,255,0.18)', display: 'block' }} />
                  : <div style={{ width: '96px', height: '96px', borderRadius: PILL, background: '#F4EBFF', border: '3px solid #E9D7FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="#C084FC" strokeWidth="2"/></svg>
                    </div>
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '15px', color: '#101828', marginBottom: '4px' }}>Profile photo</p>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085', marginBottom: '14px' }}>JPG, PNG or GIF. Max 5 MB.</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <label style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: BRAND, background: '#F4EBFF', border: '1px solid rgba(165,74,255,0.25)', borderRadius: PILL, padding: '8px 18px', cursor: 'pointer', transition: 'background 0.15s', display: 'inline-block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EDD9FF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F4EBFF'; }}>
                    Upload photo
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                  </label>
                  {avatar && (
                    <button onClick={() => setAvatar(null)}
                      style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#667085', background: '#fff', border: '1px solid #D0D5DD', borderRadius: PILL, padding: '8px 18px', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D92D20'; el.style.color = '#D92D20'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D0D5DD'; el.style.color = '#667085'; }}>
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Form fields ── */}
            <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>

              {/* Full name */}
              <div>
                <label style={labelStyle}>Full name</label>
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              {/* Date of birth */}
              <div>
                <label style={labelStyle}>Date of birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'light' }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              {/* Gender */}
              <div>
                <label style={labelStyle}>Gender</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', paddingRight: '40px', cursor: 'pointer' }}
                    onFocus={focusInput}
                    onBlur={blurInput}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label style={labelStyle}>Phone number</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <select
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#101828', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: PILL, padding: '11px 36px 11px 16px', outline: 'none', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', boxShadow: '0 1px 2px rgba(16,24,40,0.05)', transition: 'border-color 0.15s', width: '120px', boxSizing: 'border-box' }}
                      onFocus={e => { e.currentTarget.style.borderColor = BRAND; }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}>
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.code}</option>
                      ))}
                    </select>
                    <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="300 1234567"
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </div>
              </div>
            </div>

            {/* ── Footer actions ── */}
            <div style={{ padding: '20px 32px', borderTop: '1px solid #F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => router.back()}
                style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054', background: '#fff', border: '1px solid #D0D5DD', borderRadius: PILL, padding: '11px 22px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(16,24,40,0.05)', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}>
                Cancel
              </button>
              <button onClick={handleSave}
                style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', background: saved ? '#079455' : GRAD, border: 'none', borderRadius: PILL, padding: '11px 24px', cursor: 'pointer', boxShadow: saved ? '0 4px 12px rgba(7,148,85,0.25)' : '0 4px 12px rgba(165,74,255,0.25)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                {saved ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Saved!
                  </>
                ) : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
