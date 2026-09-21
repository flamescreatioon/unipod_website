import React from 'react';
import ContactForm from '../components/ContactForm';
import Eyebrow from '../components/Eyebrow';
import PageHero from '../components/PageHero';
import { Footer, Header } from '../components/SiteShell';

export default function Contact() {
  return <><Header inner /><main><PageHero eyebrow="Contact us" title={<>Let’s make<br /><em>something happen.</em></>} lead="Tell us what you are looking to build, learn or support. The UniPod team will get back to you." /><section className="contact contact-page"><div className="wrap contact-grid"><div><Eyebrow light>Visit or write to us</Eyebrow><h2>We’re building<br /><em>with you.</em></h2><p>Whether you want to learn, prototype, develop an enterprise or explore a partnership, this is a good place to start.</p><div className="contact-meta"><span>UMUDIKE, ABIA STATE</span><span>MICHAEL OKPARA UNIVERSITY OF AGRICULTURE</span></div></div><ContactForm /></div></section></main><Footer /></>;
}
