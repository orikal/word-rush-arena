import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, SkipForward, Clock } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import UserProfile from "@/components/UserProfile"

const GamePlay = () => {
  const wordsData = [
    { scrambled: "ץרא", correct: "ארץ", hint: "סרט ישראלי משנות ה-80" },
    { scrambled: "םולח", correct: "חלום", hint: "דבר שקורה בלילה" },
    { scrambled: "תיב", correct: "בית", hint: "מקום מגורים" },
    { scrambled: "רבח", correct: "חבר", hint: "אדם קרוב" },
    { scrambled: "עדי", correct: "ידע", hint: "מידע שלמדת" }
  ]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(45)
  const [opponentTime, setOpponentTime] = useState(38)
  const [currentCategory] = useState("סרטים")
  const [currentPlayer, setCurrentPlayer] = useState(1) // 1 = אתה, 2 = יריב
  const [feedback, setFeedback] = useState("")
  const [isBlinking, setIsBlinking] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (gameEnded) return
    
    const timer = setInterval(() => {
      if (currentPlayer === 1 && timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      } else if (currentPlayer === 2 && opponentTime > 0) {
        setOpponentTime(opponentTime - 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, opponentTime, currentPlayer, gameEnded])

  // Check for game end when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !gameEnded) {
      setGameEnded(true)
      setWinner("היריב")
      setFeedback("נגמר הזמן! היריב ניצח!")
    } else if (opponentTime === 0 && !gameEnded) {
      setGameEnded(true)
      setWinner("אתה")
      setFeedback("נגמר הזמן ליריב! אתה ניצחת!")
    }
  }, [timeLeft, opponentTime, gameEnded])

  // AI opponent logic
  useEffect(() => {
    if (currentPlayer === 2 && !gameEnded) {
      const thinkingTime = Math.random() * 3000 + 2000 // 2-5 seconds thinking time
      const timer = setTimeout(() => {
        const shouldAnswer = Math.random() > 0.3 // 70% chance to answer correctly
        
        if (shouldAnswer) {
          setFeedback("היריב ענה נכון!")
          setTimeout(() => {
            setFeedback("")
            setCurrentPlayer(1)
            setCurrentWordIndex((prev) => (prev + 1) % wordsData.length)
          }, 2000)
        } else {
          setFeedback("היריב דילג")
          setOpponentTime(prev => Math.max(0, prev - 3))
          setTimeout(() => {
            setFeedback("")
            setCurrentWordIndex((prev) => (prev + 1) % wordsData.length)
          }, 2000)
        }
      }, thinkingTime)
      
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, currentWordIndex, gameEnded])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentWord = wordsData[currentWordIndex]

  const handleCorrectAnswer = () => {
    if (gameEnded) return
    
    if (userAnswer.trim() === currentWord.correct) {
      setFeedback("תשובה נכונה!")
      setUserAnswer("")
      // מעבר תור ליריב
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
      
      setTimeout(() => {
        setFeedback("")
        // החלפת מילה
        setCurrentWordIndex((prev) => (prev + 1) % wordsData.length)
      }, 2000)
    } else {
      setFeedback("תשובה שגויה, נסה שוב")
      setTimeout(() => setFeedback(""), 2000)
    }
  }

  const handleSkip = () => {
    if (gameEnded) return
    
    setFeedback("דילוג")
    setIsBlinking(true)
    
    // גזירת 3 שניות מהזמן
    if (currentPlayer === 1) {
      setTimeLeft(prev => Math.max(0, prev - 3))
    } else {
      setOpponentTime(prev => Math.max(0, prev - 3))
    }

    setTimeout(() => {
      setFeedback("")
      setIsBlinking(false)
      // החלפת מילה לאותו שחקן
      setCurrentWordIndex((prev) => (prev + 1) % wordsData.length)
    }, 3000)
  }

  const restartGame = () => {
    setGameEnded(false)
    setWinner(null)
    setTimeLeft(45)
    setOpponentTime(38)
    setCurrentPlayer(1)
    setCurrentWordIndex(0)
    setUserAnswer("")
    setFeedback("")
    setIsBlinking(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* User Profile Header */}
        {user && (
          <div className="mb-6">
            <UserProfile />
          </div>
        )}
        
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

        {/* Feedback Display */}
        {feedback && (
          <Card className="mb-4 bg-gaming-green/10 border-gaming-green/50">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-gaming-green">{feedback}</div>
            </CardContent>
          </Card>
        )}

        {/* Game End Screen */}
        {gameEnded && (
          <Card className="mb-6 bg-gradient-to-r from-gaming-green/20 to-gaming-cyan/20 border-gaming-green/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-4">
                {winner === "אתה" ? "🎉 ניצחת! 🎉" : "😞 הפסדת 😞"}
              </div>
              <div className="text-lg mb-4 text-muted-foreground">
                {feedback}
              </div>
              <Button 
                onClick={restartGame}
                className="bg-gaming-green hover:bg-gaming-green/80"
              >
                משחק חדש
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Current Player Indicator */}
        {!gameEnded && (
          <Card className="mb-4 bg-gaming-cyan/10 border-gaming-cyan/50">
            <CardContent className="p-3 text-center">
              <div className="text-sm font-medium">
                {currentPlayer === 1 ? "התור שלך!" : "תור היריב"}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scrambled Word Display */}
        {!gameEnded && (
          <Card className="mb-8 bg-gradient-primary/10">
            <CardContent className="p-8 text-center">
              <div className="text-sm text-muted-foreground mb-4">פתור את המילה המעורבבת:</div>
              <div className={`text-5xl font-bold mb-6 tracking-widest text-gaming-orange ${isBlinking ? 'animate-pulse' : ''}`}>
                {currentWord.scrambled}
              </div>
              <div className="text-sm text-muted-foreground">
                רמז: {currentWord.hint}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Answer Input */}
        {!gameEnded && (
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
        )}

        {/* Action Buttons */}
        {!gameEnded && (
          <div className="space-y-4">
            <Button 
              onClick={handleCorrectAnswer}
              disabled={currentPlayer !== 1 || !userAnswer.trim()}
              className="w-full h-14 text-lg bg-gaming-green hover:bg-gaming-green/80 disabled:opacity-50"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              שלח תשובה
            </Button>
            
            <Button 
              onClick={handleSkip}
              disabled={currentPlayer !== 1}
              variant="outline" 
              className="w-full h-12 border-gaming-orange text-gaming-orange hover:bg-gaming-orange/10 disabled:opacity-50"
            >
              <SkipForward className="w-5 h-5 ml-2" />
              דלג (-3 שניות)
            </Button>
          </div>
        )}

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