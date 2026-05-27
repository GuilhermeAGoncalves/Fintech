<<<<<<< HEAD
export const Home    = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
export const Income  = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const Expense = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 20V4m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const Wallet  = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 7h16a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 7v-.5A2.5 2.5 0 015.5 4H17" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="17" cy="13" r="1.5" fill="currentColor"/></svg>
export const Plus    = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
export const Eye     = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
export const EyeOff  = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 4l16 16M9.5 5.4A10 10 0 0112 5c6.5 0 10 7 10 7a16 16 0 01-3 4M6 6.5C3 8.4 2 12 2 12s3.5 7 10 7a10 10 0 005-1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
export const Arrow   = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const Logout  = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4M15 17l5-5-5-5M20 12H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const Chart   = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 12l4-4 4 6 4-3 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const Refresh = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 4v5h5M20 20v-5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 9a8 8 0 00-14.93-2M4 15a8 8 0 0014.93 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
export const Trash   = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
export const Heart   = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
export const Pix     = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 12l6-6 6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
export const X       = (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
=======
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Home     = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z"/></svg>
export const Income   = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M12 4v16m0 0l-6-6m6 6l6-6"/></svg>
export const Expense  = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M12 20V4m0 0l-6 6m6-6l6 6"/></svg>
export const Debt     = p => <svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></svg>
export const Invest   = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M4 17l5-5 4 4 7-8"/><path d="M15 8h5v5"/></svg>
export const Goal     = p => <svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>
export const Report   = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M4 20V8M10 20V4M16 20v-7M22 20H2"/></svg>
export const Cog      = p => <svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="3"/><path strokeWidth="1.6" d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.5-2.4.8a7 7 0 00-2-1.2L14 3h-4l-.5 2.4a7 7 0 00-2 1.2L5 5.8 3 9.3l2 1.5a7 7 0 000 2.4l-2 1.5 2 3.5 2.4-.8a7 7 0 002 1.2L10 21h4l.5-2.4a7 7 0 002-1.2l2.4.8 2-3.5-2-1.5c.07-.4.1-.8.1-1.2z"/></svg>
export const Bell     = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M6 9a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8zM10 21a2 2 0 004 0"/></svg>
export const Search   = p => <svg viewBox="0 0 24 24" {...s} {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>
export const Plus     = p => <svg viewBox="0 0 24 24" {...s} strokeWidth="2.2" {...p}><path d="M12 5v14M5 12h14"/></svg>
export const Edit2    = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
export const Trash    = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
export const Arrow    = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
export const Logout   = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4M15 17l5-5-5-5M20 12H8"/></svg>
export const Wallet   = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 7h16a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 7v-.5A2.5 2.5 0 015.5 4H17"/><circle cx="17" cy="13" r="1.5" fill="currentColor" stroke="none"/></svg>
export const Eye      = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
export const EyeOff   = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M4 4l16 16M9.5 5.4A10 10 0 0112 5c6.5 0 10 7 10 7a16 16 0 01-3 4M6 6.5C3 8.4 2 12 2 12s3.5 7 10 7a10 10 0 005-1.3"/></svg>
export const ChevronR = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M9 18l6-6-6-6"/></svg>
export const Coins    = p => <svg viewBox="0 0 24 24" {...s} strokeWidth="1.6" {...p}><ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 12c-3.3 0-6 1.3-6 3v2c0 1.7 2.7 3 6 3M21 9v8c0 1.7-2.7 3-6 3-1.5 0-2.9-.3-4-.7"/></svg>
export const X        = p => <svg viewBox="0 0 24 24" {...s} strokeWidth="2" {...p}><path d="M6 6l12 12M6 18L18 6"/></svg>
export const Check    = p => <svg viewBox="0 0 24 24" {...s} strokeWidth="2.5" {...p}><path d="M5 12l4 4 10-10"/></svg>
export const Warning  = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
export const Chart    = p => <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 12l4-4 4 6 4-3 6 5"/></svg>
>>>>>>> e71aef873402a2fd456eb12c59f6727139709345
