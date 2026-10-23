"use client";

import { Providers, useApp } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import Huariques from "@/components/Huariques";
import HowItWorks from "@/components/HowItWorks";
import Owners from "@/components/Owners";
import { Stories, About, FinalCta, Footer } from "@/components/Sections";
import AuthModal from "@/components/AuthModal";

function Page() {
  const { t } = useApp();
  return (
    <>
      <a href="#contenido" className="sr-only z-50 rounded-full bg-primary px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">{t.skip}</a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <WhySection />
        <Huariques />
        <HowItWorks />
        <Owners />
        <Stories />
        <About />
        <FinalCta />
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}

export default function Home() {
  return (
    <Providers>
      <Page />
    </Providers>
  );
}
