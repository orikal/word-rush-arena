import { Button } from "@/components/ui/button"
import heroBg from "@/assets/hero-bg.jpg"
import { Clock, Zap, Trophy, Users } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Animated Letters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['ר', 'ו', 'ק', 'י', 'ח', 'כ', 'מ', 'ה'].map((letter, index) => (
          <div
            key={index}
            className={`absolute text-6xl font-bold text-gaming-cyan opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            תור שלך!
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            תענה מהר או תדלג
          </p>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            רק אל תבזבז את הזמן! 🔥
          </p>
        </div>
        
        {/* Game Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-card/20 backdrop-blur-md rounded-lg p-4 border border-gaming-purple/30">
            <Clock className="w-8 h-8 text-gaming-cyan mx-auto mb-2" />
            <p className="text-sm font-medium">45 שניות</p>
          </div>
          <div className="bg-card/20 backdrop-blur-md rounded-lg p-4 border border-gaming-purple/30">
            <Zap className="w-8 h-8 text-gaming-orange mx-auto mb-2" />
            <p className="text-sm font-medium">מילים מעורבבות</p>
          </div>
          <div className="bg-card/20 backdrop-blur-md rounded-lg p-4 border border-gaming-purple/30">
            <Users className="w-8 h-8 text-gaming-pink mx-auto mb-2" />
            <p className="text-sm font-medium">1 נגד 1</p>
          </div>
          <div className="bg-card/20 backdrop-blur-md rounded-lg p-4 border border-gaming-purple/30">
            <Trophy className="w-8 h-8 text-gaming-green mx-auto mb-2" />
            <p className="text-sm font-medium">גלגל מזל</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button variant="hero" size="xl" className="w-full md:w-auto">
            התחל לשחק עכשיו
          </Button>
          <Button variant="gaming" size="xl" className="w-full md:w-auto">
            הזמן חבר למשחק
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection