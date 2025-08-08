import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Bot, Share2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GameModeSelector() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const selectedCategory = location.state?.selectedCategory;

  if (!selectedCategory) {
    navigate('/categories');
    return null;
  }

  const handlePlayVsComputer = () => {
    navigate('/gameplay', { 
      state: { 
        selectedCategory,
        gameMode: 'computer'
      } 
    });
  };

  const handleInviteFriend = () => {
    // Navigate to waiting room and create invite link
    const roomId = Math.random().toString(36).substring(7);
    const inviteLink = `${window.location.origin}/waiting-room?category=${selectedCategory.id}&room=${roomId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast({
        title: "הקישור הועתק!",
        description: "שלח את הקישור לחבר שלך כדי להתחיל משחק",
      });
    });

    // Navigate to waiting room
    navigate(`/waiting-room?category=${selectedCategory.id}&room=${roomId}`);
  };

  const handleShareInvite = () => {
    const roomId = Math.random().toString(36).substring(7);
    const inviteText = `בוא נשחק משחק ניחוש מילים בקטגוריה ${selectedCategory.name}!`;
    const inviteLink = `${window.location.origin}/waiting-room?category=${selectedCategory.id}&room=${roomId}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'הזמנה למשחק',
        text: inviteText,
        url: inviteLink,
      }).then(() => {
        // Navigate to waiting room after successful share
        navigate(`/waiting-room?category=${selectedCategory.id}&room=${roomId}`);
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Fallback to copy
        handleCopyAndNavigate(inviteText, inviteLink, roomId);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyAndNavigate(inviteText, inviteLink, roomId);
    }
  };

  const handleCopyAndNavigate = (inviteText: string, inviteLink: string, roomId: string) => {
    navigator.clipboard.writeText(`${inviteText}\n${inviteLink}`).then(() => {
      toast({
        title: "הקישור הועתק!",
        description: "שלח את הקישור לחבר שלך כדי להתחיל משחק",
      });
      // Navigate to waiting room
      navigate(`/waiting-room?category=${selectedCategory.id}&room=${roomId}`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-purple via-gaming-dark to-gaming-cyan/20 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/categories')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">בחר אופן משחק</h1>
          <div className="w-10" />
        </div>

        {/* Selected Category Display */}
        <Card className="bg-white/10 border-white/20 mb-6">
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2" style={{ color: selectedCategory.color }}>
              {selectedCategory.name}
            </div>
            <div className="text-white/70 text-sm">
              {selectedCategory.words?.length || 0} מילים
            </div>
          </CardContent>
        </Card>

        {/* Game Mode Options */}
        <div className="space-y-4">
          {/* Play vs Computer */}
          <Card className="bg-gradient-to-r from-gaming-cyan/20 to-gaming-cyan/10 border-gaming-cyan/50 hover:bg-gaming-cyan/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gaming-cyan/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-gaming-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">שחק מול המחשב</h3>
                  <p className="text-white/70 text-sm">התחל משחק מיידי מול הבינה המלאכותית</p>
                </div>
              </div>
              <Button 
                onClick={handlePlayVsComputer}
                className="w-full bg-gaming-cyan hover:bg-gaming-cyan/80 text-white"
              >
                התחל משחק
              </Button>
            </CardContent>
          </Card>

          {/* Invite Friend */}
          <Card className="bg-gradient-to-r from-gaming-pink/20 to-gaming-pink/10 border-gaming-pink/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gaming-pink/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gaming-pink" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">הזמן חבר</h3>
                  <p className="text-white/70 text-sm">שלח הזמנה לחבר שלך למשחק</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleInviteFriend}
                  variant="outline"
                  className="flex-1 border-gaming-pink/50 text-gaming-pink hover:bg-gaming-pink/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  העתק קישור
                </Button>
                <Button 
                  onClick={handleShareInvite}
                  className="flex-1 bg-gaming-pink hover:bg-gaming-pink/80 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  שתף
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}