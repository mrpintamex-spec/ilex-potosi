import { useState, useCallback, lazy, Suspense } from "react";
import SplashScreen from "@/components/ilex/SplashScreen";
import Navbar from "@/components/ilex/Navbar";
import HeroSection from "@/components/ilex/HeroSection";
import WhySection from "@/components/ilex/WhySection";
import { KB, topicLabels } from "@/components/ilex/knowledgeBase";

// Lazy-load secciones below-the-fold para reducir el bundle inicial
const ChatConsulta = lazy(() => import("@/components/ilex/ChatConsulta"));
const AreasLegales = lazy(() => import("@/components/ilex/AreasLegales"));
const Directorio = lazy(() => import("@/components/ilex/Directorio"));
const ListaNegra = lazy(() => import("@/components/ilex/ListaNegra"));
const DocumentosLegales = lazy(() => import("@/components/ilex/DocumentosLegales"));
const UrgentHelp = lazy(() => import("@/components/ilex/UrgentHelp"));
const VotingSection = lazy(() => import("@/components/ilex/VotingSection"));
const ContactSection = lazy(() => import("@/components/ilex/ContactSection"));
const Footer = lazy(() => import("@/components/ilex/Footer"));
const RegistroModal = lazy(() => import("@/components/ilex/RegistroModal"));
const AdBanner = lazy(() => import("@/components/ilex/AdBanner"));

const Fallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const Index = () => {
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [registroOpen, setRegistroOpen] = useState(false);

  const handleHeroSearch = (query: string) => {
    document.getElementById("consulta")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setPendingQuery(query), 600);
  };

  const handleAreaClick = (topic: string) => {
    if (KB[topic]) {
      const label = topicLabels[topic] || topic;
      setPendingQuery(label);
    }
  };

  const handleQueryConsumed = useCallback(() => setPendingQuery(null), []);

  return (
    <>
      <SplashScreen />
      <Navbar />
      <HeroSection onSearch={handleHeroSearch} />
      <WhySection />
      <Suspense fallback={<Fallback />}>
        <AdBanner slot="after-why" />
        <ChatConsulta pendingQuery={pendingQuery} onQueryConsumed={handleQueryConsumed} />
        <AreasLegales onAreaClick={handleAreaClick} />
        <AdBanner slot="after-areas" />
        <Directorio onOpenRegistro={() => setRegistroOpen(true)} />
        <ListaNegra />
        <AdBanner slot="after-lista" />
        <DocumentosLegales />
        <UrgentHelp />
        <VotingSection />
        <AdBanner slot="after-voting" />
        <ContactSection />
        <Footer />
        <RegistroModal open={registroOpen} onClose={() => setRegistroOpen(false)} />
      </Suspense>
    </>
  );
};

export default Index;
