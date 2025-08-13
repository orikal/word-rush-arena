import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Mail } from "lucide-react";
import { useFriends } from '@/hooks/useFriends';

interface AddFriendDialogProps {
  children?: React.ReactNode;
}

export default function AddFriendDialog({ children }: AddFriendDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('בוא נשחק משחק מילים מטורף! 🎮');
  const [loading, setLoading] = useState(false);
  const { sendFriendRequest } = useFriends();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setLoading(true);
    const success = await sendFriendRequest(email, message);
    
    if (success) {
      setEmail('');
      setMessage('בוא נשחק משחק מילים מטורף! 🎮');
      setOpen(false);
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <UserPlus className="w-4 h-4" />
            הוסף חבר
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            הזמן חבר באימייל
          </DialogTitle>
          <DialogDescription>
            שלח הזמנה לחבר שלך להצטרף למשחק
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">כתובת אימייל</Label>
            <Input
              id="email"
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">הודעה אישית (אופציונלי)</Label>
            <Textarea
              id="message"
              placeholder="כתוב הודעה אישית..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              ביטול
            </Button>
            <Button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex-1"
            >
              {loading ? 'שולח...' : 'שלח הזמנה'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}