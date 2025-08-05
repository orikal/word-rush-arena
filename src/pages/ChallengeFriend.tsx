import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Film, Tv, Gamepad, Trophy, Mic, Star, Laugh, Search, Users, Zap, Share2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  words: Array<{ scrambled: string; correct: string; hint: string }>;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  wins: number;
  isOnline: boolean;
}

interface OnlinePlayer {
  id: string;
  name: string;
  avatar: string;
  level: number;
  rating: number;
}

const categories: Category[] = [
  {
    id: 'movies',
    name: 'סרטים',
    icon: <Film className="w-4 h-4" />,
    color: 'bg-red-500',
    words: [
      { scrambled: "ץרא", correct: "ארץ", hint: "סרט ישראלי קלאסי" }
    ]
  },
  {
    id: 'series',
    name: 'סדרות',
    icon: <Tv className="w-4 h-4" />,
    color: 'bg-blue-500',
    words: []
  },
  {
    id: 'games',
    name: 'משחקים',
    icon: <Gamepad className="w-4 h-4" />,
    color: 'bg-green-500',
    words: []
  },
  {
    id: 'sports',
    name: 'ספורט',
    icon: <Trophy className="w-4 h-4" />,
    color: 'bg-yellow-500',
    words: []
  },
  {
    id: 'singers',
    name: 'זמרים',
    icon: <Mic className="w-4 h-4" />,
    color: 'bg-purple-500',
    words: []
  },
  {
    id: 'celebs',
    name: 'סלבס',
    icon: <Star className="w-4 h-4" />,
    color: 'bg-pink-500',
    words: []
  },
  {
    id: 'comedians',
    name: 'סטנדאפיסטים',
    icon: <Laugh className="w-4 h-4" />,
    color: 'bg-orange-500',
    words: []
  }
];

const friends: Friend[] = [
  {
    id: '1',
    name: 'דני כהן',
    avatar: '/placeholder.svg',
    level: 15,
    wins: 42,
    isOnline: true
  },
  {
    id: '2', 
    name: 'מיכל לוי',
    avatar: '/placeholder.svg',
    level: 12,
    wins: 38,
    isOnline: false
  },
  {
    id: '3',
    name: 'יוסי מור',
    avatar: '/placeholder.svg', 
    level: 18,
    wins: 51,
    isOnline: true
  }
];

const onlinePlayers: OnlinePlayer[] = [
  {
    id: '1',
    name: 'שירה ברק',
    avatar: '/placeholder.svg',
    level: 22,
    rating: 1420
  },
  {
    id: '2',
    name: 'אור שמש',
    avatar: '/placeholder.svg',
    level: 16,
    rating: 1280
  },
  {
    id: '3',
    name: 'נועה דור',
    avatar: '/placeholder.svg',
    level: 19,
    rating: 1350
  }
];

export default function ChallengeFriend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  const handleChallengePlayer = (playerId: string, isQuickMatch = false) => {
    if (!selectedCategory) {
      alert('אנא בחר קטגוריה תחילה');
      return;
    }
    // Navigate to game with selected category and opponent
    navigate('/gameplay', { 
      state: { 
        category: selectedCategory, 
        opponent: isQuickMatch ? 'quick_match' : playerId,
        isMultiplayer: true
      } 
    });
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">אתגר חבר</h1>
          <p className="text-muted-foreground">בחר קטגוריה ואתגר חברים למשחק!</p>
        </div>

        {/* Category Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad className="w-5 h-5" />
              בחירת קטגוריה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory?.id === category.id ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 ${
                    selectedCategory?.id === category.id 
                      ? 'bg-gaming-cyan hover:bg-gaming-cyan/80 text-white border-gaming-cyan' 
                      : 'hover:bg-gaming-cyan/10 hover:border-gaming-cyan/50'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-4 p-3 bg-gaming-cyan/10 rounded-lg">
                <p className="text-sm text-center font-medium">
                  נבחרה קטגוריית {selectedCategory.name} ✓
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Friends Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                החברים שלי
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="חפש חברים..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{friend.name}</span>
                          <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          רמה {friend.level} • {friend.wins} נצחונות
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      disabled={!friend.isOnline || !selectedCategory}
                      onClick={() => handleChallengePlayer(friend.id)}
                      className="bg-gaming-green hover:bg-gaming-green/80"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {filteredFriends.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    לא נמצאו חברים
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Online Players & Quick Match */}
          <div className="space-y-6">
            {/* Quick Match */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  משחק מהיר
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  מצא יריב אקראי למשחק מהיר
                </p>
                <Button
                  className="w-full bg-gaming-orange hover:bg-gaming-orange/80"
                  disabled={!selectedCategory}
                  onClick={() => handleChallengePlayer('quick_match', true)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  משחק מהיר
                </Button>
              </CardContent>
            </Card>

            {/* Online Players */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  שחקנים מחוברים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {onlinePlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-muted-foreground">
                            רמה {player.level} • דירוג {player.rating}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!selectedCategory}
                        onClick={() => handleChallengePlayer(player.id)}
                      >
                        אתגר
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardContent className="p-4 text-center">
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  הזמן חברים לשחק
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-gaming-orange text-gaming-orange hover:bg-gaming-orange/10"
          >
            חזור לעמוד הראשי
          </Button>
        </div>
      </div>
    </div>
  );
}