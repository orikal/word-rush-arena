import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Coins, Trophy, Settings, Users, Zap } from "lucide-react"

const HomeScreen = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-card min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Top Stats Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gaming-orange" />
            <span className="font-bold text-gaming-orange">2,450</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-gaming-green" />
            <span className="font-bold text-gaming-green">1,230</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gaming-purple" />
            <span className="font-bold text-gaming-purple">47</span>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Character Scene */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-b from-gaming-cyan/20 to-gaming-purple/20 flex items-center justify-center">
              {/* Background Scene */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute bottom-0 w-full h-16 bg-gaming-green/40 rounded-t-full"></div>
                <div className="absolute top-4 right-4 text-4xl">☀️</div>
                <div className="absolute top-8 left-8 text-2xl">☁️</div>
              </div>
              
              {/* Main Character */}
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gaming-purple/30 border-4 border-gaming-purple flex items-center justify-center animate-pulse">
                  <span className="text-4xl">🧙‍♂️</span>
                </div>
                <Badge variant="secondary" className="bg-gaming-purple/20 text-gaming-purple border-gaming-purple/30">
                  קוסם מילים
                </Badge>
              </div>
              
              {/* Character Status */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">רמה 12</span>
                    <span className="text-gaming-cyan font-bold">🧠 Master</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                    <div className="bg-gaming-cyan h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button variant="hero" className="h-16 flex-col gap-2">
            <Zap className="w-6 h-6" />
            <span>שחק עכשיו</span>
          </Button>
          <Button variant="gaming" className="h-16 flex-col gap-2">
            <Users className="w-6 h-6" />
            <span>אתגר חבר</span>
          </Button>
        </div>

        {/* Daily Challenge */}
        <Card className="mb-6 bg-gradient-primary/10 border-gaming-orange/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gaming-orange">אתגר יומי</h3>
              <Badge className="bg-gaming-orange/20 text-gaming-orange border-gaming-orange/30">
                +500 ניקוד
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              פתור 5 מילים בקטגוריית "סרטים" תוך 2 דקות
            </p>
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                זמן נותר: 8:32:15
              </div>
              <Button size="sm" variant="outline">
                התחל
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-4">פעילות אחרונה</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gaming-green/20 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-gaming-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">ניצחת את דני</p>
                    <p className="text-xs text-muted-foreground">קטגוריית שירים</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">לפני 2 שעות</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gaming-purple/20 flex items-center justify-center">
                    <Star className="w-4 h-4 text-gaming-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">זכית בגלגל המזל</p>
                    <p className="text-xs text-muted-foreground">רקע "ספרייה קסומה"</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">אתמול</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default HomeScreen