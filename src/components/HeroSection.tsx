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
      <div className="absolute inset-0 bg-gradient-hero opacity-90 pointer-events-none" />
      
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
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent text-center">
            בחר דמות, אתגר חבר
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 text-center">
            ותהיה אלוף המילים הבא!
          </p>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 text-center">
            משחק מילים חכם – מהיר – מהפנט 🧠⚡
          </p>
          
          {/* Character Preview */}
          <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-4">
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gaming-purple/20 border-2 border-gaming-purple flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl">🧙‍♂️</span>
              </div>
              <p className="text-xs text-muted-foreground">קוסם מילים</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gaming-cyan/20 border-2 border-gaming-cyan flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl">🦄</span>
              </div>
              <p className="text-xs text-muted-foreground">חד קרן</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gaming-green/20 border-2 border-gaming-green flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl">🐉</span>
              </div>
              <p className="text-xs text-muted-foreground">דרקון חכם</p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gaming-orange/20 border-2 border-gaming-orange flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl">🎭</span>
              </div>
              <p className="text-xs text-muted-foreground">שחקן</p>
            </div>
          </div>
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
        
      </div>
    </section>
  )
}

export default HeroSection