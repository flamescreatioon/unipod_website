import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const endpoint = `${import.meta.env.VITE_CONTACT_API_URL?.replace(/\/$/, '') || ''}/api/contact`;
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus({ type: 'sending', message: 'Sending your message…' });
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not send your message.');
      form.reset();
      setStatus({ type: 'success', message: 'Thank you — the UniPod team has received your enquiry.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'We could not send your message. Please try again.' });
    }
  };
  return <form className="contact-form" onSubmit={submit}><label>Your name<input required maxLength="120" name="name" placeholder="Enter your name" /></label><label>Email address<input required maxLength="254" name="email" type="email" placeholder="you@example.com" /></label><label>I’m interested in<select required name="interest"><option value="">Select an option</option><option>Programmes &amp; training</option><option>Facility access</option><option>Enterprise support</option><option>Partnership</option><option>General enquiry</option></select></label><label>Message<textarea required maxLength="5000" name="message" rows="5" placeholder="How can we help?" /></label><button className="button button-gold" disabled={status.type === 'sending'}>{status.type === 'sending' ? 'Sending…' : 'Send enquiry'} <b>→</b></button>{status.message && <p className={`form-status ${status.type}`} aria-live="polite">{status.message}</p>}</form>;
}
