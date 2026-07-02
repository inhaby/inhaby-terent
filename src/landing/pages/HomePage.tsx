import Hero from "../components/Hero";
import UserJourneys from "../components/UserJourneys";
import TrustSection from "../components/TrustSection";
import OwnerSection from "../components/OwnerSection";
import VerifiedListingsCarousel from "../components/VerifiedListingsCarousel";
import HowItWorks from "../components/HowItWorks";
import VerificationSection from "../components/VerificationSection";
import AppPreview from "../components/AppPreview";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <UserJourneys />
      <TrustSection />
      <OwnerSection />
      <VerifiedListingsCarousel />
      <HowItWorks />
      <VerificationSection />
      <AppPreview />
      <Benefits />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
