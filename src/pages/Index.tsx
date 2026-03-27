import { useState, useCallback } from "react";
import SplashScreen from "@/components/ilex/SplashScreen";
import Navbar from "@/components/ilex/Navbar";
import HeroSection from "@/components/ilex/HeroSection";
import WhySection from "@/components/ilex/WhySection";
import ChatConsulta from "@/components/ilex/ChatConsulta";
import AreasLegales from "@/components/ilex/AreasLegales";
import Directorio from "@/components/ilex/Directorio";
import ListaNegra from "@/components/ilex/ListaNegra";
import UrgentHelp from "@/components/ilex/UrgentHelp";
import VotingSection from "@/components/ilex/VotingSection";
import ContactSection from "@/components/ilex/ContactSection";
import Footer from "@/components/ilex/Footer";
import RegistroModal from "@/components/ilex/RegistroModal";
import { KB, topicLabels } from "@/components/ilex/knowledgeBase";

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
      <ChatConsulta pendingQuery={pendingQuery} onQueryConsumed={handleQueryConsumed} />
      <AreasLegales onAreaClick={handleAreaClick} />
      <Directorio onOpenRegistro={() => setRegistroOpen(true)} />
      <ListaNegra />
      <UrgentHelp />
      <VotingSection />
      <ContactSection />
      <Footer />
      <RegistroModal open={registroOpen} onClose={() => setRegistroOpen(false)} />
    </>
  );
};

export default Index;
