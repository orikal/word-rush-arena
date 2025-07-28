import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Share2, Search, Crown, Trophy, Star } from "lucide-react"

const ChallengeFriend = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("כל הקטגוריות")

  const categories = [
    "כל הקטגוריות", "סרטים", "שירים", "ספרים", "דמויות", "ציוד משרדי", "חיות"
  ]

  const friends = [
    { id: 1, name: "דני כהן", avatar: "👨‍💻", level: 15, wins: 28, isOnline: true },
    { id: 2, name: "מיכל לוי", avatar: "👩‍🎨", level: 12, wins: 22, isOnline: false },
    { id: 3, name: "אמיר ברק", avatar: "🧙‍♂️", level: 18, wins: 35, isOnline: true },
    { id: 4, name: "רותי גולד", avatar: "🦄", level: 9, wins: 15, isOnline: true }
  ]

  const onlinePlayers = [
    { id: 5, name: "אלכס_המלך", avatar: "👑", level: 22, rating: 1850, isOnline: true },
    { id: 6, name: "WordMaster", avatar: "🎯", level: 19, rating: 1720, isOnline: true },
    { id: 7, name: "חכם_המילים", avatar: "🧠", level: 16, rating: 1650, isOnline: true }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-gaming-cyan" />
            אתגר חבר
          </h1>
          <p className="text-muted-foreground">בחר יריב וקטגוריה להתחלת משחק</p>
        </div>

        {/* Category Selection */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-gaming-purple">בחר קטגוריה:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? "bg-gaming-purple text-white" 
                      : "hover:bg-gaming-purple/20"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Friends */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="חפש חבר..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
                dir="rtl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Friends List */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-gaming-green" />
              החברים שלי
            </h3>
            <div className="space-y-3">
              {friends
                .filter(friend => friend.name.includes(searchQuery))
                .map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gaming-cyan/20 flex items-center justify-center text-xl">
                        {friend.avatar}
                      </div>
                      {friend.isOnline && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gaming-green rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>רמה {friend.level}</span>
                        <span>•</span>
                        <span>{friend.wins} ניצחונות</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className={friend.isOnline ? "bg-gaming-green hover:bg-gaming-green/80" : ""}
                    disabled={!friend.isOnline}
                  >
                    {friend.isOnline ? "אתגר" : "לא זמין"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Random Players */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-gaming-orange" />
              שחקנים מקוונים
            </h3>
            <div className="space-y-3">
              {onlinePlayers.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gaming-orange/20 flex items-center justify-center text-xl">
                        {player.avatar}
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gaming-green rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className="w-3 h-3" />
                        <span>{player.rating}</span>
                        <span>•</span>
                        <span>רמה {player.level}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gaming-orange hover:bg-gaming-orange/80">
                    אתגר
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Match */}
        <Card className="bg-gradient-primary/10 border-gaming-cyan/50">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gaming-cyan" />
            <h3 className="font-bold text-gaming-cyan mb-2">התאמה מהירה</h3>
            <p className="text-sm text-muted-foreground mb-4">
              מצא יריב בדירוג דומה תוך שניות
            </p>
            <Button className="w-full bg-gaming-cyan hover:bg-gaming-cyan/80">
              חפש משחק מהיר
            </Button>
          </CardContent>
        </Card>

        {/* Share Button */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            <Share2 className="w-4 h-4 ml-2" />
            הזמן חברים למשחק
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChallengeFriend