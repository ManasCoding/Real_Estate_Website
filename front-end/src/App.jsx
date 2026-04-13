import React from 'react';

// Layout Components
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';

// Home Page Sections
import Hero from './components/home/Hero/Hero';
import FeaturedListings from './components/home/FeaturedListings/FeaturedListings';
import Features from './components/home/Features/Features';
import Testimonials from './components/home/Testimonials/Testimonials';

/**
 * Main Application Hub (Landing Page).
 * 
 * Implements a modular, "Senior Developer" architectural pattern where each section
 * is a self-contained component encapsulated in its own directory.
 * 
 * Design Aesthetic: Royal Bhubaneswar (Premium, Classy, Professional).
 * 
 * @component
 */
function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-accent selection:text-white">
      {/* 1. Navigation Layer */}
      <Navbar />

      {/* 2. Main Content Layer */}
      <main className="flex-grow">
        
        {/* High-Impact Hero Section */}
        <Hero />

        {/* Dynamic Backend-Driven Listings */}
        <FeaturedListings />

        {/* Value Prop & Brand Excellence */}
        <Features />

        {/* Social Proof & Social Validation */}
        <Testimonials />

      </main>

      {/* 3. Footer Layer */}
      <Footer />
    </div>
  );
}

export default App;