import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Trophy, Gift, Unlock, Palette, Zap } from "lucide-react"

const LuckyWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastPrize, setLastPrize] = useState(null)

  const prizes = [
    { name: "דמות חדשה 🧙‍♀️", icon: Unlock, color: "gaming-purple", emoji: "🧙‍♀️" },
    { name: "רקע ספרייה קסומה", icon: Palette, color: "gaming-cyan", emoji: "📚" },
    { name: "רמזים למשחק x5", icon: Zap, color: "gaming-orange", emoji: "💡" },
    { name: "תג 'אלוף מוח'", icon: Trophy, color: "gaming-green", emoji: "🏆" },
    { name: "דמות דרקון זהב", icon: Gift, color: "gaming-pink", emoji: "🐉" },
    { name: "זמן בונוס +10 שנ'", icon: RotateCcw, color: "gaming-blue", emoji: "⏰" }
  ]

  const handleSpin = () => {
    setIsSpinning(true)
    
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
      setLastPrize(randomPrize)
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
            גלגל המזל
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            מנצחים מקבלים סיבוב בגלגל המזל! זכו בפרסים מדהימים ובחוויות חדשות
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lucky Wheel */}
          <div className="text-center">
            <div className="relative">
              <div className={`w-80 h-80 mx-auto rounded-full border-8 border-gaming-purple/30 relative ${isSpinning ? "animate-spin" : ""}`} 
                   style={{ animationDuration: isSpinning ? "3s" : "0s" }}>
                
                {/* Wheel Background */}
                <div className="absolute inset-4 rounded-full bg-gradient-conic from-gaming-purple via-gaming-cyan via-gaming-orange via-gaming-pink via-gaming-green to-gaming-purple shadow-intense">
                  
                  {/* Prize Sections */}
                  {prizes.map((prize, index) => {
                    const IconComponent = prize.icon
                    const angle = (360 / prizes.length) * index
                    
                    return (
                      <div
                        key={index}
                        className="absolute w-12 h-12 flex items-center justify-center text-white"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px)`,
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                    )
                  })}
                </div>
                
                {/* Center Circle */}
                <div className="absolute inset-1/3 rounded-full bg-card border-4 border-gaming-purple flex items-center justify-center">
                  <span className="text-2xl font-bold text-gaming-purple">🎯</span>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gaming-purple"></div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                onClick={handleSpin}
                disabled={isSpinning}
                variant="hero"
                size="xl"
                className="w-full max-w-xs"
              >
                {isSpinning ? "מסתובב..." : "סובב את הגלגל!"}
              </Button>
            </div>
          </div>

          {/* Prizes & Last Win */}
          <div className="space-y-8">
            {/* Last Prize */}
            {lastPrize && (
              <Card className="bg-gradient-primary/10 border-gaming-purple/50 shadow-glow">
                <CardHeader>
                  <CardTitle className="text-center text-gaming-purple">
                    הפרס האחרון שלך! 🎉
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">
                    {lastPrize.emoji}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{lastPrize.name}</h3>
                  <Badge variant="secondary" className="bg-gaming-green/20 text-gaming-green border-gaming-green/30 text-lg px-4 py-2">
                    זכית! 🎉
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Available Prizes */}
            <Card>
              <CardHeader>
                <CardTitle>פרסים זמינים בגלגל</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {prizes.map((prize, index) => {
                    const IconComponent = prize.icon
                    
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-gaming-purple/20">
                        <div className={`w-10 h-10 rounded-full bg-${prize.color}/20 text-${prize.color} flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{prize.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* How to Win */}
            <Card className="bg-gaming-green/10 border-gaming-green/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gaming-green mb-3">איך לזכות בסיבוב?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• נצחו במשחק 1 נגד 1</li>
                  <li>• קבלו סיבוב אוטומטי בגלגל</li>
                  <li>• זכו בפרסים מדהימים!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LuckyWheel