import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Users, Check, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Mock data for the category based on ID
const getCategory = (categoryId: string) => {
  const categories = {
    movies: { id: 'movies', name: 'סרטים', color: '#ef4444' },
    series: { id: 'series', name: 'סדרות', color: '#3b82f6' },
    games: { id: 'games', name: 'משחקים', color: '#22c55e' },
    sports: { id: 'sports', name: 'ספורט', color: '#eab308' },
    singers: { id: 'singers', name: 'זמרים', color: '#a855f7' },
    celebs: { id: 'celebs', name: 'סלבס', color: '#ec4899' },
    comedians: { id: 'comedians', name: 'סטנדאפיסטים', color: '#f97316' }
  };
  return categories[categoryId as keyof typeof categories];
};

export default function WaitingRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [friendReady, setFriendReady] = useState(false);
  const [roomId] = useState(() => Math.random().toString(36).substring(7));
  
  const categoryId = searchParams.get('category');
  const category = categoryId ? getCategory(categoryId) : null;

  useEffect(() => {
    if (!category) {
      navigate('/categories');
      return;
    }

    // Simulate friend joining after a few seconds (for demo)
    const timer = setTimeout(() => {
      toast({
        title: "חבר הצטרף!",
        description: "החבר שלך נכנס לחדר המתנה",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [category, navigate, toast]);

  const handleReady = () => {
    setIsReady(true);
    toast({
      title: "מוכן למשחק!",
      description: "המתנה לחבר שלך...",
    });

    // Simulate friend getting ready after user
    if (!friendReady) {
      setTimeout(() => {
        setFriendReady(true);
        toast({
          title: "שני השחקנים מוכנים!",
          description: "המשחק מתחיל...",
        });
        
        // Start game after both are ready
        setTimeout(() => {
          navigate('/gameplay', { 
            state: { 
              selectedCategory: category,
              gameMode: 'friend',
              roomId: roomId
            } 
          });
        }, 2000);
      }, 2000);
    }
  };

  if (!category) {
    return null;
  }

  const bothReady = isReady && friendReady;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-purple via-gaming-dark to-gaming-cyan/20 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/game-mode')}
            className="text-white hover:bg-white/10"
            disabled={bothReady}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">חדר המתנה</h1>
          <div className="w-10" />
        </div>

        {/* Category Display */}
        <Card className="bg-white/10 border-white/20 mb-6">
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2" style={{ color: category.color }}>
              {category.name}
            </div>
            <div className="text-white/70 text-sm">
              קטגוריה נבחרה
            </div>
          </CardContent>
        </Card>

        {/* Players Status */}
        <div className="space-y-4 mb-8">
          {/* Current User */}
          <Card className={`transition-colors ${isReady ? 'bg-gaming-green/20 border-gaming-green/50' : 'bg-white/10 border-white/20'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gaming-cyan rounded-full flex items-center justify-center text-white font-bold">
                      {user?.email?.charAt(0).toUpperCase() || 'א'}
                    </div>
                  )}
                  <AvatarFallback>א</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-white font-semibold">אתה</div>
                  <div className={`text-sm ${isReady ? 'text-gaming-green' : 'text-white/70'}`}>
                    {isReady ? 'מוכן!' : 'לא מוכן'}
                  </div>
                </div>
                {isReady && <Check className="w-6 h-6 text-gaming-green" />}
              </div>
            </CardContent>
          </Card>

          {/* Friend */}
          <Card className={`transition-colors ${friendReady ? 'bg-gaming-green/20 border-gaming-green/50' : 'bg-white/10 border-white/20'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <div className="w-full h-full bg-gaming-pink rounded-full flex items-center justify-center text-white font-bold">
                    ח
                  </div>
                  <AvatarFallback>ח</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-white font-semibold">חבר</div>
                  <div className={`text-sm ${friendReady ? 'text-gaming-green' : 'text-white/70'}`}>
                    {friendReady ? 'מוכן!' : 'מחובר, לא מוכן'}
                  </div>
                </div>
                {friendReady ? (
                  <Check className="w-6 h-6 text-gaming-green" />
                ) : (
                  <Clock className="w-6 h-6 text-white/50" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ready Button */}
        {!bothReady && (
          <Button
            onClick={handleReady}
            disabled={isReady}
            className={`w-full text-lg py-6 ${
              isReady 
                ? 'bg-gaming-green/50 text-white cursor-not-allowed' 
                : 'bg-gaming-green hover:bg-gaming-green/80 text-white'
            }`}
          >
            {isReady ? 'מחכה לחבר...' : 'מוכן למשחק!'}
          </Button>
        )}

        {/* Game Starting Message */}
        {bothReady && (
          <Card className="bg-gaming-green/20 border-gaming-green/50">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-gaming-green mx-auto mb-4" />
              <div className="text-white text-xl font-bold mb-2">
                שני השחקנים מוכנים!
              </div>
              <div className="text-gaming-green">
                המשחק מתחיל עכשיו...
              </div>
            </CardContent>
          </Card>
        )}

        {/* Room ID for sharing */}
        <div className="mt-8 text-center">
          <div className="text-white/50 text-sm">
            קוד חדר: {roomId}
          </div>
        </div>
      </div>
    </div>
  );
}