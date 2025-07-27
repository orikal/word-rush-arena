import HeroSection from "@/components/HeroSection"
import GameplayDemo from "@/components/GameplayDemo"
import CategoriesSection from "@/components/CategoriesSection"
import LuckyWheel from "@/components/LuckyWheel"
import StatsSection from "@/components/StatsSection"
import SocialSection from "@/components/SocialSection"
import LoginSection from "@/components/LoginSection"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <GameplayDemo />
      <CategoriesSection />
      <LuckyWheel />
      <StatsSection />
      <SocialSection />
      <LoginSection />
    </div>
  );
};

export default Index;
