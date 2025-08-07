import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, Star, Trophy, Target, Crown, Palette, Settings, Camera, Edit2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

const Profile = () => {
  const { user, profile } = useAuth()
  const [selectedAvatar, setSelectedAvatar] = useState("🧙‍♂️")
  const [selectedBackground, setSelectedBackground] = useState("beach")
  const [isEditingName, setIsEditingName] = useState(false)
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const avatars = [
    { emoji: "🧙‍♂️", name: "קוסם מילים", unlocked: true },
    { emoji: "👨‍🚀", name: "חוקר חלל", unlocked: true },
    { emoji: "🦄", name: "חד קרן", unlocked: true },
    { emoji: "🐲", name: "דרקון", unlocked: false },
    { emoji: "👑", name: "מלך", unlocked: false },
    { emoji: "🦸‍♂️", name: "גיבור על", unlocked: false },
    { emoji: "🎯", name: "בולען", unlocked: true },
    { emoji: "🧠", name: "מוח גדול", unlocked: false }
  ]

  const backgrounds = [
    { id: "beach", name: "חוף ים", emoji: "🏖️", unlocked: true },
    { id: "library", name: "ספרייה קסומה", emoji: "📚", unlocked: true },
    { id: "rooftop", name: "גג עירוני", emoji: "🏙️", unlocked: false },
    { id: "fantasy", name: "עולם פנטזיה", emoji: "🏰", unlocked: false },
    { id: "space", name: "חלל", emoji: "🌌", unlocked: false },
    { id: "forest", name: "יער קסום", emoji: "🌲", unlocked: true }
  ]

  const achievements = [
    { title: "מומחה קטגוריות", description: "ניצחת בכל הקטגוריות", icon: "🏆", unlocked: true },
    { title: "רצף ניצחונות", description: "10 ניצחונות ברצף", icon: "🔥", unlocked: true },
    { title: "מהירות ברק", description: "פתר מילה תוך 3 שניות", icon: "⚡", unlocked: true },
    { title: "מלך המילים", description: "הגע לרמה 20", icon: "👑", unlocked: false },
    { title: "אלוף העולם", description: "הגע למקום 1 ברבעון", icon: "🌟", unlocked: false }
  ]

  const stats = [
    { label: "משחקים שיחקת", value: "247", icon: Target },
    { label: "אחוז ניצחונות", value: "68%", icon: Trophy },
    { label: "ממוצע זמן פתרון", value: "12.5 שנ'", icon: Star },
    { label: "קטגוריה חזקה", value: "סרטים", icon: Crown }
  ]

  const handleSaveName = async () => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('id', user.id)

      if (error) throw error
      
      toast.success("השם עודכן בהצלחה!")
      setIsEditingName(false)
    } catch (error) {
      console.error('Error updating name:', error)
      toast.error("שגיאה בעדכון השם")
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    try {
      // Upload to Supabase storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      setProfileImage(data.publicUrl)
      
      // Update profile with image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError
      
      toast.success("התמונה עודכנה בהצלחה!")
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error("שגיאה בהעלאת התמונה")
    }
  }

  if (!user || !profile) {
    return <div className="text-center p-8">אנא התחבר לחשבון</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <Card className="mb-6 bg-gradient-primary/10">
          <CardContent className="p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Avatar className="w-24 h-24 border-4 border-gaming-purple">
                <AvatarImage src={profileImage || profile.avatar_url || ''} />
                <AvatarFallback className="bg-gaming-purple/30 text-5xl">
                  {profile.display_name?.charAt(0)?.toUpperCase() || selectedAvatar}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-center h-8"
                    placeholder="השם שלך"
                  />
                  <Button size="sm" onClick={handleSaveName}>
                    שמור
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setIsEditingName(false)
                      setDisplayName(profile.display_name || "")
                    }}
                  >
                    בטל
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-xl font-bold">
                    {profile.display_name || profile.username || "שחקן חדש"}
                  </h1>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Badge className="bg-gaming-purple/20 text-gaming-purple border-gaming-purple/30">
                {profile.wins} נצחונות
              </Badge>
              <Badge className="bg-gaming-orange/20 text-gaming-orange border-gaming-orange/30">
                {profile.games_played} משחקים
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-gaming-cyan" />
                <div className="text-lg font-bold text-gaming-cyan">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="customization" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customization" className="text-xs">
              <Palette className="w-4 h-4 ml-1" />
              עיצוב
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs">
              <Trophy className="w-4 h-4 ml-1" />
              הישגים
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              <Settings className="w-4 h-4 ml-1" />
              הגדרות
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customization" className="space-y-6">
            {/* Avatar Selection */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">בחר דמות:</h3>
                <div className="grid grid-cols-4 gap-3">
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => avatar.unlocked && setSelectedAvatar(avatar.emoji)}
                      className={`relative p-3 rounded-lg border-2 transition-all ${
                        selectedAvatar === avatar.emoji
                          ? "border-gaming-purple bg-gaming-purple/20"
                          : avatar.unlocked
                          ? "border-border hover:border-gaming-purple/50"
                          : "border-muted opacity-50"
                      }`}
                      disabled={!avatar.unlocked}
                    >
                      <div className="text-2xl">{avatar.emoji}</div>
                      {!avatar.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                          <span className="text-xs">🔒</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Background Selection */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">בחר רקע:</h3>
                <div className="space-y-2">
                  {backgrounds.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => bg.unlocked && setSelectedBackground(bg.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                        selectedBackground === bg.id
                          ? "border-gaming-cyan bg-gaming-cyan/20"
                          : bg.unlocked
                          ? "border-border hover:border-gaming-cyan/50"
                          : "border-muted opacity-50"
                      }`}
                      disabled={!bg.unlocked}
                    >
                      <span className="text-xl">{bg.emoji}</span>
                      <span className="font-medium">{bg.name}</span>
                      {!bg.unlocked && (
                        <span className="mr-auto text-xs">🔒</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={achievement.unlocked ? "bg-gaming-green/10 border-gaming-green/50" : "opacity-60"}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${achievement.unlocked ? "text-gaming-green" : ""}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {!achievement.unlocked && (
                    <span className="text-2xl">🔒</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span>התראות</span>
                  <Button variant="outline" size="sm">הגדר</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>צלילים</span>
                  <Button variant="outline" size="sm">הגדר</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>שפה</span>
                  <Button variant="outline" size="sm">עברית</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>פרטיות</span>
                  <Button variant="outline" size="sm">הגדר</Button>
                </div>
              </CardContent>
            </Card>
            
            <Button variant="destructive" className="w-full">
              התנתק מהחשבון
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile