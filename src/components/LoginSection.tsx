import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Lock, UserPlus } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const LoginSection = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  // Signup form state
  const [signupUsername, setSignupUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  
  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Password validation
  const isValidPassword = (password: string) => {
    return password.length >= 8
  }
  
  // Handle login
  const handleLogin = async () => {
    if (!loginEmail.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין כתובת אימייל",
        variant: "destructive"
      })
      return
    }
    
    if (!isValidEmail(loginEmail)) {
      toast({
        title: "שגיאה",
        description: "כתובת האימייל אינה תקינה",
        variant: "destructive"
      })
      return
    }
    
    if (!loginPassword.trim()) {
      toast({
        title: "שגיאה", 
        description: "נא להזין סיסמה",
        variant: "destructive"
      })
      return
    }
    
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      })
      
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "שגיאה בהתחברות",
            description: "אימייל או סיסמה שגויים",
            variant: "destructive"
          })
        } else {
          toast({
            title: "שגיאה בהתחברות",
            description: error.message,
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "התחברות מוצלחת!",
          description: "ברוכים השבים למשחק"
        })
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהתחברות",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle signup
  const handleSignup = async () => {
    if (!signupUsername.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין שם משתמש",
        variant: "destructive"
      })
      return
    }
    
    if (!signupEmail.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין כתובת אימייל",
        variant: "destructive"
      })
      return
    }
    
    if (!isValidEmail(signupEmail)) {
      toast({
        title: "שגיאה",
        description: "כתובת האימייל אינה תקינה",
        variant: "destructive"
      })
      return
    }
    
    if (!signupPassword.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין סיסמה",
        variant: "destructive"
      })
      return
    }
    
    if (!isValidPassword(signupPassword)) {
      toast({
        title: "שגיאה",
        description: "הסיסמה חייבת להכיל לפחות 8 תווים",
        variant: "destructive"
      })
      return
    }
    
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            username: signupUsername
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      })
      
      if (error) {
        if (error.message.includes("User already registered")) {
          toast({
            title: "שגיאה בהרשמה",
            description: "משתמש עם אימייל זה כבר קיים במערכת",
            variant: "destructive"
          })
        } else {
          toast({
            title: "שגיאה בהרשמה",
            description: error.message,
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "הרשמה מוצלחת!",
          description: "בדקו את האימייל שלכם לאישור החשבון"
        })
        // Clear form
        setSignupUsername("")
        setSignupEmail("")
        setSignupPassword("")
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהרשמה",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      
      if (error) {
        toast({
          title: "שגיאה",
          description: "לא ניתן להתחבר עם Google כרגע",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהתחברות עם Google",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-card to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            הצטרפו למשחק
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            צרו פרופיל ושמרו את כל ההישגים, הסטטיסטיקות וההיסטוריה שלכם
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Login Form */}
          <Card className="bg-gradient-primary/10 border-gaming-purple/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gaming-purple">
                <User className="w-5 h-5" />
                התחברות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">אימייל</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pr-10"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">סיסמה</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pr-10"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  variant="gaming" 
                  className="w-full" 
                  size="lg"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "מתחבר..." : "התחבר"}
                </Button>
              </div>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-4 text-sm text-muted-foreground">או</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? "מתחבר..." : "המשך עם Google"}
              </Button>
            </CardContent>
          </Card>

          {/* Sign Up / Profile Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                יצירת חשבון
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gaming-green/10 rounded-lg border border-gaming-green/30">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-bold text-sm">סטטיסטיקות</h3>
                  <p className="text-xs text-muted-foreground">עקבו אחר ההתקדמות</p>
                </div>

                <div className="text-center p-4 bg-gaming-purple/10 rounded-lg border border-gaming-purple/30">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="font-bold text-sm">הישגים</h3>
                  <p className="text-xs text-muted-foreground">פתחו תגים מיוחדים</p>
                </div>

                <div className="text-center p-4 bg-gaming-cyan/10 rounded-lg border border-gaming-cyan/30">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-bold text-sm">התאמה אישית</h3>
                  <p className="text-xs text-muted-foreground">רקעים ונושאים</p>
                </div>

                <div className="text-center p-4 bg-gaming-orange/10 rounded-lg border border-gaming-orange/30">
                  <div className="text-3xl mb-2">👥</div>
                  <h3 className="font-bold text-sm">חברים</h3>
                  <p className="text-xs text-muted-foreground">הזמינו ותתמודדו</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">שם משתמש</Label>
                  <Input 
                    id="username"
                    placeholder="בחרו שם ייחודי"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email">אימייל</Label>
                  <Input 
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">סיסמה</Label>
                  <Input 
                    id="signup-password"
                    type="password"
                    placeholder="לפחות 8 תווים"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  variant="hero" 
                  className="w-full" 
                  size="lg"
                  onClick={handleSignup}
                  disabled={isLoading}
                >
                  {isLoading ? "יוצר חשבון..." : "צרו חשבון וילדים לשחק!"}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                בהרשמה אתם מסכימים ל
                <a href="#" className="text-gaming-purple hover:underline mx-1">תנאי השימוש</a>
                ו
                <a href="#" className="text-gaming-purple hover:underline mx-1">מדיניות הפרטיות</a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Features Preview */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-secondary/10 border-gaming-orange/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gaming-orange mb-4">
                מוכנים להתחיל? 🔥
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                משחק ראשון הוא חינם! לא צריך אפילו להירשם כדי לנסות
              </p>
              <Button variant="hero" size="xl">
                משחק מהיר כאורח
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default LoginSection