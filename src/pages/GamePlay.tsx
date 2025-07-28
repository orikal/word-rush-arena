import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, SkipForward, Clock } from "lucide-react"

const GamePlay = () => {
  const [scrambledWord, setScrambledWord] = useState("ץרא")
  const [userAnswer, setUserAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(45)
  const [opponentTime, setOpponentTime] = useState(38)
  const [currentCategory] = useState("סרטים")

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Game Header */}
        <div className="text-center mb-6">
          <Badge className="bg-gaming-purple/20 text-gaming-purple border-gaming-purple/30 mb-2">
            {currentCategory}
          </Badge>
          <h1 className="text-xl font-bold mb-2">משחק 1 נגד 1</h1>
        </div>

        {/* Players Timer Display */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-gaming-cyan/10 border-gaming-cyan/50">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">אתה</div>
              <div className="text-2xl font-bold text-gaming-cyan flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
              <Progress value={(timeLeft / 45) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gaming-pink/10 border-gaming-pink/50">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">יריב</div>
              <div className="text-2xl font-bold text-gaming-pink flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                {formatTime(opponentTime)}
              </div>
              <Progress value={(opponentTime / 45) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Scrambled Word Display */}
        <Card className="mb-8 bg-gradient-primary/10">
          <CardContent className="p-8 text-center">
            <div className="text-sm text-muted-foreground mb-4">פתור את המילה המעורבבת:</div>
            <div className="text-5xl font-bold mb-6 tracking-widest text-gaming-orange animate-pulse">
              {scrambledWord}
            </div>
            <div className="text-sm text-muted-foreground">
              רמז: סרט ישראלי משנות ה-80
            </div>
          </CardContent>
        </Card>

        {/* Answer Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">התשובה שלך:</label>
                <input 
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-4 text-lg text-center border border-border rounded-lg bg-background focus:ring-2 focus:ring-gaming-cyan focus:border-transparent"
                  placeholder="הקלד כאן..."
                  dir="rtl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button className="w-full h-14 text-lg bg-gaming-green hover:bg-gaming-green/80">
            <ArrowRight className="w-5 h-5 ml-2" />
            שלח תשובה
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 border-gaming-orange text-gaming-orange hover:bg-gaming-orange/10"
          >
            <SkipForward className="w-5 h-5 ml-2" />
            דלג (-3 שניות)
          </Button>
        </div>

        {/* Game Instructions */}
        <Card className="mt-6 bg-muted/30">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• תשובה נכונה מעבירה את התור ליריב</p>
              <p>• דילוג גוזל 3 שניות מהזמן שלך</p>
              <p>• כשנגמר הזמן - היריב מנצח</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GamePlay