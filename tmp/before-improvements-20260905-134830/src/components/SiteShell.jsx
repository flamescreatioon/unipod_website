import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { nav } from '../data/siteData';
import PartnerLogos from './PartnerLogos';

export function Brand({ includeUndp = false }) {
  return <Link className="brand brand-logos" to="/" aria-label="UniPod, Michael Okpara University of Agriculture, Umudike, and UNDP home"><img className="unipod-logo" src="/assets/unipod-icon.png" alt="UniPod" /><span className="logo-divider" aria-hidden="true" /><img className="mouau-logo" src="/assets/mouau-mark.png" alt="Michael Okpara University of Agriculture, Umudike" />{includeUndp && <><span className="logo-divider" aria-hidden="true" /><img className="undp-header-logo" src="/assets/undp-logo.png" alt="United Nations Development Programme" /></>}</Link>;
}

export function Header({ inner = false }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-header${inner ? ' inner' : ''}`}><Brand includeUndp /><button className="menu-toggle" onClick={() => setOpen(!open)} type="button" aria-expanded={open} aria-controls="site-nav"><span /><span /></button><nav id="site-nav" className={`site-nav${open ? ' open' : ''}`}>{nav.map(([label, url]) => <NavLink key={url} to={url} onClick={() => setOpen(false)}>{label}</NavLink>)}<Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>Contact us <b>↗</b></Link></nav></header>;
}

export function Footer({ compact = false }) {
  return <footer>{compact ? <div className="wrap footer-bottom single"><span>© 2026 Manu-Tech UniPod, MOUAU</span><Link to="/">Home</Link></div> : <><div className="wrap footer-grid"><Brand /><div><p>Building practical capability for a more productive future.</p><PartnerLogos className="footer-partners" includeMouau /></div><div className="footer-links">{nav.slice(0, 3).map(([label, url]) => <Link key={url} to={url}>{label}</Link>)}<Link to="/contact">Contact</Link></div></div><div className="wrap footer-bottom"><span>© 2026 Manu-Tech UniPod, MOUAU</span><span>Umudike, Abia State, Nigeria</span><Link to="/">Back to top ↑</Link></div></>}</footer>;
}
