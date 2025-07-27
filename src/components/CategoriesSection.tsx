import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Music, Film, Book, Users, Briefcase, Globe, Star } from "lucide-react"

const CategoriesSection = () => {
  const categories = [
    { name: "שירים", icon: Music, color: "gaming-purple", unlocked: true },
    { name: "סרטים", icon: Film, color: "gaming-cyan", unlocked: true },
    { name: "ספרים", icon: Book, color: "gaming-orange", unlocked: true },
    { name: "דמויות קולנוע", icon: Users, color: "gaming-pink", unlocked: false },
    { name: "ציוד משרדי", icon: Briefcase, color: "gaming-green", unlocked: false },
    { name: "מדינות", icon: Globe, color: "gaming-blue", unlocked: false },
    { name: "מפורסמים", icon: Star, color: "gaming-purple", unlocked: false },
    { name: "מותגים", icon: Star, color: "gaming-cyan", unlocked: false }
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-card to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            קטגוריות המשחק
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            בחרו קטגוריה ותתחילו להתמודד! קטגוריות חדשות נפתחות כפרסים בגלגל המזל
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            const isUnlocked = category.unlocked
            
            return (
              <Card 
                key={index}
                className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isUnlocked 
                    ? `border-${category.color}/50 shadow-card hover:shadow-glow` 
                    : "opacity-60 border-muted"
                }`}
              >
                <CardContent className="p-6 text-center">
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${
                    isUnlocked 
                      ? `bg-${category.color}/20 text-${category.color}` 
                      : "bg-muted text-muted-foreground"
                  } flex items-center justify-center transition-all duration-300 group-hover:animate-float`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                  
                  {isUnlocked ? (
                    <Badge variant="secondary" className="bg-gaming-green/20 text-gaming-green border-gaming-green/30">
                      זמין
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-muted text-muted-foreground">
                      נעול
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            🎯 איך לפתוח קטגוריות חדשות?
          </p>
          <p className="text-base text-muted-foreground">
            נצחו במשחקים וסובבו את גלגל המזל כדי לזכות בקטגוריות חדשות ופרסים נוספים!
          </p>
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection