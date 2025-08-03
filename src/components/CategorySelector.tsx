import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Film, Tv, Gamepad, Trophy, Mic, Star, Laugh } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  words: Array<{ scrambled: string; correct: string; hint: string }>;
}

const categories: Category[] = [
  {
    id: 'movies',
    name: 'סרטים',
    icon: <Film className="w-6 h-6" />,
    color: 'bg-red-500',
    words: [
      { scrambled: "ץרא", correct: "ארץ", hint: "סרט ישראלי קלאסי" },
      { scrambled: "ךותי", correct: "יתוך", hint: "סרט ישראלי מפורסם" },
      { scrambled: "ןמקטב", correct: "בטמן", hint: "גיבור על בלבד" },
      { scrambled: "ןטאייט", correct: "טיטאניק", hint: "ספינה שטבעה" },
      { scrambled: "הקירמ", correct: "אמריקה", hint: "יבשת" }
    ]
  },
  {
    id: 'series',
    name: 'סדרות',
    icon: <Tv className="w-6 h-6" />,
    color: 'bg-blue-500',
    words: [
      { scrambled: "שירפנ", correct: "פרינס", hint: "נסיך מבל אייר" },
      { scrambled: "זגנירב", correct: "ברינגס", hint: "סדרה על כימיה" },
      { scrambled: "םיצח", correct: "חיים", hint: "סדרה ישראלית מפורסמת" },
      { scrambled: "דרוקר", correct: "רקורד", hint: "סדרה על עיתונאים" },
      { scrambled: "השמ", correct: "משה", hint: "דמות מקראית" }
    ]
  },
  {
    id: 'games',
    name: 'משחקים',
    icon: <Gamepad className="w-6 h-6" />,
    color: 'bg-green-500',
    words: [
      { scrambled: "תינרופטר", correct: "פורטנייט", hint: "משחק בטל רויאל פופולרי" },
      { scrambled: "ףרקטנימ", correct: "מיינקראפט", hint: "משחק בנייה בקוביות" },
      { scrambled: "איפ", correct: "פיפא", hint: "משחק כדורגל" },
      { scrambled: "לגול", correct: "גולל", hint: "פלטפורמת משחקים" },
      { scrambled: "סלגיג", correct: "גליגס", hint: "משחק פעילות" }
    ]
  },
  {
    id: 'sports',
    name: 'ספורט',
    icon: <Trophy className="w-6 h-6" />,
    color: 'bg-yellow-500',
    words: [
      { scrambled: "לגרודכ", correct: "כדורגל", hint: "המשחק הפופולרי בעולם" },
      { scrambled: "לסב", correct: "סל", hint: "משחק עם סל וכדור" },
      { scrambled: "סינט", correct: "טניס", hint: "משחק עם רקט" },
      { scrambled: "היוש", correct: "שחייה", hint: "ספורט במים" },
      { scrambled: "ץור", correct: "רוץ", hint: "ספורט מהיר" }
    ]
  },
  {
    id: 'singers',
    name: 'זמרים',
    icon: <Mic className="w-6 h-6" />,
    color: 'bg-purple-500',
    words: [
      { scrambled: "הב", correct: "בה", hint: "זמר ישראלי מפורסם" },
      { scrambled: "הינש", correct: "שינה", hint: "זמרת ישראלית" },
      { scrambled: "ןואה", correct: "אוהן", hint: "זמר בינלאומי" },
      { scrambled: "הדומ", correct: "מודה", hint: "זמרת פופ" },
      { scrambled: "ביבא", correct: "אביב", hint: "זמר ישראלי" }
    ]
  },
  {
    id: 'celebs',
    name: 'סלבס',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-pink-500',
    words: [
      { scrambled: "לג תדג", correct: "גל גדות", hint: "שחקנית ישראלית מפורסמת" },
      { scrambled: "ןוליא קסמ", correct: "אילון מאסק", hint: "יזם טכנולוגיה" },
      { scrambled: "הינפוא", correct: "אופרה", hint: "מנחה אמריקאית מפורסמת" },
      { scrambled: "שימרט", correct: "טרמפ", hint: "נשיא לשעבר" },
      { scrambled: "ילכח", correct: "חליל", hint: "שחקן ישראלי" }
    ]
  },
  {
    id: 'comedians',
    name: 'סטנדאפיסטים',
    icon: <Laugh className="w-6 h-6" />,
    color: 'bg-orange-500',
    words: [
      { scrambled: "ירוא שח", correct: "אורי חש", hint: "קומיקאי ישראלי" },
      { scrambled: "ינמי ןגמ", correct: "ימני מגן", hint: "סטנדאפיסט ישראלי" },
      { scrambled: "לטס יבוק", correct: "קובי לטש", hint: "קומיקאי וכוכב טלוויזיה" },
      { scrambled: "לבר טסקר", correct: "רקטס בלר", hint: "קומיקאי אמריקאי" },
      { scrambled: "גוד ףוגרא", correct: "דוג פרוגא", hint: "קומיקאי בינלאומי" }
    ]
  }
];

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (selectedCategory) {
      navigate('/gameplay', { state: { category: selectedCategory } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">בחר קטגוריה</h1>
          <p className="text-muted-foreground">איזה נושא מעניין אותך היום?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedCategory?.id === category.id
                  ? 'ring-2 ring-gaming-cyan border-gaming-cyan'
                  : 'hover:border-gaming-cyan/50'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <Badge variant="secondary" className="mt-2">
                  {category.words.length} מילים
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCategory && (
          <Card className="bg-gaming-cyan/10 border-gaming-cyan/50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                {selectedCategory.icon}
                <h3 className="text-xl font-bold">{selectedCategory.name}</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                נבחרה קטגוריית {selectedCategory.name} עם {selectedCategory.words.length} מילים מעורבבות
              </p>
              <Button
                onClick={handleStartGame}
                className="w-full md:w-auto bg-gaming-green hover:bg-gaming-green/80 text-lg px-8 py-3"
              >
                התחל משחק!
              </Button>
            </CardContent>
          </Card>
        )}

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