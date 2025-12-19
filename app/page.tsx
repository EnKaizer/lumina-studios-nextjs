'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProgressBar } from '@/components/ProgressBar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Hero } from '@/components/sections/Hero';
import { BigNumbers } from '@/components/sections/BigNumbers';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Templates } from '@/components/sections/Templates';
import { Quiz } from '@/components/Quiz';
import { Solutions } from '@/components/sections/Solutions';
import { Plans } from '@/components/sections/Plans';
import { Founders } from '@/components/sections/Founders';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ProgressBar />
      <Navbar />
      
      <main>
        <Hero />
        <BigNumbers />
        <HowItWorks />
        <Templates />
        <Quiz />
        <Solutions />
        <Plans />
        <Founders />
        <Contact />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}
