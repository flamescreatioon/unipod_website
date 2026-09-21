import React from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteShell";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enterprise from "./pages/Enterprise";
import Facilities from "./pages/Facilities";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import NewsImpact, { NewsArticle } from "./pages/NewsImpact";
import NotFound from "./pages/NotFound";
import Programs from "./pages/Programs";
import Tour from "./pages/Tour";
import Admin from "./pages/Admin";
import Team from "./pages/Team";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<NewsImpact />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/news-impact" element={<NewsImpact />} />
        <Route path="/news-impact/:slug" element={<NewsArticle />} />
        <Route path="/team" element={<Team />} />
        <Route path="/facility-tour" element={<Tour />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
