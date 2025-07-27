import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, Target, Zap, Medal, Star } from "lucide-react"

const StatsSection = () => {
  const gameHistory = [
    { opponent: "דני123", category: "סרטים", result: "ניצחון", timeLeft: "12s", date: "היום" },
    { opponent: "שרה_מלכה", category: "שירים", result: "הפסד", timeLeft: "0s", date: "אמש" },
    { opponent: "גיימר_פרו", category: "ספרים", result: "ניצחון", timeLeft: "8s", date: "אתמול" },
    { opponent: "מלך_המילים", category: "סרטים", result: "ניצחון", timeLeft: "15s", date: "לפני יומיים" }
  ]

  const achievements = [
    { name: "מהירות אור", description: "פתר 5 מילים תוך 15 שניות", icon: Zap, unlocked: true },
    { name: "לא מתרוצץ", description: "לא דילג אפילו פעם אחת", icon: Target, unlocked: true },
    { name: "מנצח רצוף", description: "5 ניצחונות ברצף", icon: Trophy, unlocked: false },
    { name: "מלך הקטגוריות", description: "פתח את כל הקטגוריות", icon: Medal, unlocked: false }
  ]

  const stats = {
    gamesPlayed: 47,
    wins: 32,
    winRate: 68,
    avgTimeLeft: 8.4,
    bestCategory: "סרטים",
    streak: 3
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-card to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            הסטטיסטיקות שלך
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            עקבו אחר ההתקדמות, ההישגים וההיסטוריה שלכם במשחק
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gaming-purple/10 border-gaming-purple/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gaming-purple mb-2">{stats.gamesPlayed}</div>
              <p className="text-sm text-muted-foreground">משחקים</p>
            </CardContent>
          </Card>

          <Card className="bg-gaming-green/10 border-gaming-green/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gaming-green mb-2">{stats.winRate}%</div>
              <p className="text-sm text-muted-foreground">אחוז ניצחון</p>
            </CardContent>
          </Card>

          <Card className="bg-gaming-cyan/10 border-gaming-cyan/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gaming-cyan mb-2">{stats.avgTimeLeft}s</div>
              <p className="text-sm text-muted-foreground">זמן ממוצע</p>
            </CardContent>
          </Card>

          <Card className="bg-gaming-orange/10 border-gaming-orange/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gaming-orange mb-2">{stats.streak}</div>
              <p className="text-sm text-muted-foreground">רצף ניצחונות</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Game History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                היסטוריית משחקים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gameHistory.map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-gaming-purple/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">{game.opponent}</span>
                        <Badge variant="outline" className="text-xs">
                          {game.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{game.date}</div>
                    </div>
                    
                    <div className="text-right">
                      <Badge 
                        variant={game.result === "ניצחון" ? "secondary" : "outline"}
                        className={game.result === "ניצחון" 
                          ? "bg-gaming-green/20 text-gaming-green border-gaming-green/30" 
                          : "bg-destructive/20 text-destructive border-destructive/30"
                        }
                      >
                        {game.result}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        זמן: {game.timeLeft}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                הישגים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                        achievement.unlocked 
                          ? "bg-gaming-green/10 border-gaming-green/30" 
                          : "bg-muted/20 border-muted opacity-60"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked 
                          ? "bg-gaming-green/20 text-gaming-green" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="bg-gaming-green/20 text-gaming-green border-gaming-green/30">
                          ✓
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Preview */}
        <Card className="mt-12 bg-gradient-primary/10 border-gaming-purple/50">
          <CardHeader>
            <CardTitle className="text-center text-gaming-purple">
              לוח המובילים השבועי 🏆
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gaming-orange/20 border border-gaming-orange/30">
                <div className="text-2xl mb-2">🥇</div>
                <div className="font-bold">מלך_המילים</div>
                <div className="text-sm text-muted-foreground">127 ניצחונות</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gaming-green/20 border border-gaming-green/30">
                <div className="text-2xl mb-2">🥈</div>
                <div className="font-bold">שרה_מלכה</div>
                <div className="text-sm text-muted-foreground">98 ניצחונות</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gaming-cyan/20 border border-gaming-cyan/30">
                <div className="text-2xl mb-2">🥉</div>
                <div className="font-bold text-gaming-cyan">את/ה</div>
                <div className="text-sm text-muted-foreground">{stats.wins} ניצחונות</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default StatsSection