import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Share, Users, MessageCircle, Link2, Copy, Zap } from "lucide-react"
import { useState } from "react"

const SocialSection = () => {
  const [inviteLink] = useState("https://wordgame.app/invite/abc123")
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link")
    }
  }

  const shareToWhatsApp = () => {
    const message = `🎮 תבוא נתמודד במשחק מילים מטורף! זה 1 נגד 1, לחץ זמן, ומי שמנצח מקבל פרסים בגלגל המזל! ${inviteLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const shareToTelegram = () => {
    const message = `🎮 תבוא נתמודד במשחק מילים מטורף! זה 1 נגד 1, לחץ זמן, ומי שמנצח מקבל פרסים בגלגל המזל! ${inviteLink}`
    window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
            הזמינו חברים
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            שתפו עם חברים ובואו נראה מי הכי מהיר עם המילים! יותר כיף לשחק יחד
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Invite Section */}
          <Card className="bg-gradient-primary/10 border-gaming-purple/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gaming-purple">
                <Users className="w-5 h-5" />
                אתגר חבר
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">קישור הזמנה אישי</label>
                <div className="flex gap-2">
                  <Input 
                    value={inviteLink}
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleCopyLink}
                    variant="outline"
                    size="icon"
                    className={`transition-all duration-300 ${
                      copied ? "bg-gaming-green/20 border-gaming-green text-gaming-green" : ""
                    }`}
                  >
                    {copied ? "✓" : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-sm text-gaming-green mt-2">הקישור הועתק! 📋</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={shareToWhatsApp}
                  variant="gaming"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  WhatsApp
                </Button>

                <Button 
                  onClick={shareToTelegram}
                  variant="gaming"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  <Share className="w-4 h-4 ml-2" />
                  Telegram
                </Button>
              </div>

              <div className="text-center p-4 bg-gaming-green/10 rounded-lg border border-gaming-green/30">
                <h3 className="font-bold text-gaming-green mb-2">בונוס הזמנה! 🎁</h3>
                <p className="text-sm text-muted-foreground">
                  כל חבר שמצטרף דרך הקישור שלכם נותן לכם סיבוב נוסף בגלגל המזל!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                אתגר מהיר
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-accent/10 rounded-lg border border-gaming-blue/30">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">מחפשים יריב?</h3>
                <p className="text-muted-foreground mb-4">
                  הצטרפו לתור ונמצא לכם יריב אקראי תוך שניות!
                </p>
                <Button variant="accent" size="lg" className="w-full">
                  חפש יריב עכשיו
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">חברים פעילים עכשיו:</h3>
                
                {[
                  { name: "דני123", status: "מחפש יריב", category: "סרטים" },
                  { name: "שרה_מלכה", status: "במשחק", category: "שירים" },
                  { name: "גיימר_פרו", status: "זמין", category: "ספרים" }
                ].map((friend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-gaming-purple/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-sm">
                        {friend.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{friend.name}</div>
                        <div className="text-xs text-muted-foreground">{friend.category}</div>
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        friend.status === "זמין" 
                          ? "bg-gaming-green/20 text-gaming-green" 
                          : friend.status === "מחפש יריב"
                          ? "bg-gaming-orange/20 text-gaming-orange"
                          : "bg-gaming-cyan/20 text-gaming-cyan"
                      }`}>
                        {friend.status}
                      </div>
                      {friend.status === "זמין" && (
                        <Button variant="ghost" size="sm" className="text-xs mt-1 h-6">
                          אתגר
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default SocialSection