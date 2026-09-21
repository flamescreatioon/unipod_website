import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import Home from './pages/Home';
import { About, Enterprise, Facilities, NewsImpact, Programs, Tour } from './pages/InfoPages';

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/facilities" element={<Facilities />} />
    <Route path="/enterprise" element={<Enterprise />} />
    <Route path="/news-impact" element={<NewsImpact />} />
    <Route path="/facility-tour" element={<Tour />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Home />} />
  </Routes>;
}
