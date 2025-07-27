import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer, SkipForward, CheckCircle, XCircle } from "lucide-react"

const GameplayDemo = () => {
  const [scrambledWord, setScrambledWord] = useState("קירו")
  const [timeLeft, setTimeLeft] = useState(45)
  const [currentPlayer, setCurrentPlayer] = useState("את/ה")
  const [isAnimating, setIsAnimating] = useState(false)

  const demoWords = [
    { scrambled: "קירו", correct: "רוקי" },
    { scrambled: "םילש", correct: "שלים" },
    { scrambled: "הבהא", correct: "אהבה" },
    { scrambled: "לגלג", correct: "גלגל" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        const randomWord = demoWords[Math.floor(Math.random() * demoWords.length)]
        setScrambledWord(randomWord.scrambled)
        setIsAnimating(false)
      }, 250)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleCorrectAnswer = () => {
    setCurrentPlayer(currentPlayer === "את/ה" ? "יריב" : "את/ה")
    setTimeLeft(Math.max(20, timeLeft - 5))
  }

  const handleSkip = () => {
    setTimeLeft(Math.max(0, timeLeft - 3))
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            איך זה עובד?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            הדגמה חיה של המשחק - תראו איך זה נראה בזמן אמת
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player 1 */}
          <Card className={`transition-all duration-500 ${currentPlayer === "את/ה" ? "ring-2 ring-gaming-cyan shadow-glow" : "opacity-75"}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-gaming-cyan">את/ה</CardTitle>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Timer className="w-6 h-6" />
                {timeLeft}s
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentPlayer === "את/ה" ? "התור שלך!" : "ממתין..."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Area */}
          <Card className="lg:col-span-1 bg-card/50 backdrop-blur-md border-gaming-purple/30">
            <CardHeader className="text-center">
              <CardTitle className="text-gaming-orange">מילה מעורבבת</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold text-gaming-purple mb-4 transition-all duration-300 ${isAnimating ? "animate-scramble" : ""}`}>
                  {scrambledWord}
                </div>
                <div className="text-sm text-muted-foreground mb-6">
                  קטגוריה: סרטים 🎬
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleCorrectAnswer}
                  variant="accent" 
                  className="w-full"
                  disabled={currentPlayer !== "את/ה"}
                >
                  <CheckCircle className="w-4 h-4 ml-2" />
                  תשובה נכונה
                </Button>
                <Button 
                  onClick={handleSkip}
                  variant="outline" 
                  className="w-full border-gaming-orange text-gaming-orange hover:bg-gaming-orange/20"
                  disabled={currentPlayer !== "את/ה"}
                >
                  <SkipForward className="w-4 h-4 ml-2" />
                  דלג (-3 שניות)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Player 2 */}
          <Card className={`transition-all duration-500 ${currentPlayer === "יריב" ? "ring-2 ring-gaming-pink shadow-glow" : "opacity-75"}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-gaming-pink">יריב</CardTitle>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Timer className="w-6 h-6" />
                38s
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentPlayer === "יריב" ? "התור שלו!" : "ממתין..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Rules */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="bg-gaming-green/10 border-gaming-green/30">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-gaming-green mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">תשובה נכונה</h3>
              <p className="text-muted-foreground">התור עובר ליריב והמשחק ממשיך</p>
            </CardContent>
          </Card>

          <Card className="bg-gaming-orange/10 border-gaming-orange/30">
            <CardContent className="p-6 text-center">
              <SkipForward className="w-12 h-12 text-gaming-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">דילוג</h3>
              <p className="text-muted-foreground">-3 שניות מהזמן שלך, התור נשאר אצלך</p>
            </CardContent>
          </Card>

          <Card className="bg-gaming-purple/10 border-gaming-purple/30">
            <CardContent className="p-6 text-center">
              <XCircle className="w-12 h-12 text-gaming-purple mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">הזמן נגמר</h3>
              <p className="text-muted-foreground">המשחק נגמר והיריב מנצח!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default GameplayDemo