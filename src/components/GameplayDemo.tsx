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