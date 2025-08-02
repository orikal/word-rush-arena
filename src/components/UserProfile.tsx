import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, LogOut } from 'lucide-react';

export default function UserProfile() {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
      <Avatar>
        <AvatarFallback>
          {profile.display_name?.charAt(0).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">
          {profile.display_name || profile.username}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="w-4 h-4" />
          <span>{profile.wins} נצחונות</span>
        </div>
      </div>
      
      <Button variant="ghost" size="sm" onClick={signOut}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}