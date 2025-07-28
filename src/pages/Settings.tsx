import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Settings, Volume2, Bell, Shield, Info, HelpCircle, LogOut } from "lucide-react"

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Settings className="w-6 h-6 text-gaming-purple" />
            הגדרות
          </h1>
          <p className="text-muted-foreground">התאם את המשחק לטעמך</p>
        </div>

        {/* Sound Settings */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gaming-cyan" />
              הגדרות קול
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>מוזיקת רקע</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>אפקטים קוליים</span>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">עוצמת קול כללית</label>
                <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-gaming-orange" />
              התראות
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">התראות משחק</div>
                  <div className="text-sm text-muted-foreground">הזמנות למשחק מחברים</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">אתגרים יומיים</div>
                  <div className="text-sm text-muted-foreground">תזכורות לאתגרים חדשים</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">עדכוני ניקוד</div>
                  <div className="text-sm text-muted-foreground">שינויים בדירוג ובטבלה</div>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gaming-green" />
              פרטיות ואבטחה
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">פרופיל פומבי</div>
                  <div className="text-sm text-muted-foreground">אחרים יכולים לראות את הסטטיסטיקות שלך</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">הצגת סטטוס מקוון</div>
                  <div className="text-sm text-muted-foreground">חברים רואים מתי אתה מקוון</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 ml-2" />
                נהל נתונים אישיים
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Preferences */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">העדפות משחק</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>רטט בטלפון</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>אנימציות מתקדמות</span>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">זמן למחשבה (ברירת מחדל: 45 שניות)</label>
                <Slider defaultValue={[45]} min={30} max={60} step={5} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support & Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-gaming-pink" />
              עזרה ומידע
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 ml-2" />
                מרכז עזרה
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Info className="w-4 h-4 ml-2" />
                אודות המשחק
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 ml-2" />
                תנאי שימוש ופרטיות
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                שמור גיבוי של הנתונים
              </Button>
              <Button variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 ml-2" />
                התנתק מהחשבון
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground">
          גרסה 1.2.3 • Word Rush Arena
        </div>
      </div>
    </div>
  )
}

export default SettingsPage