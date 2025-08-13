import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Clock, Users } from "lucide-react";
import { useFriends } from "@/hooks/useFriends";
import { format } from "date-fns";

export default function FriendRequestsList() {
  const { incomingRequests, acceptIncomingRequest, rejectIncomingRequest } = useFriends();

  if (incomingRequests.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-primary/10 border-gaming-purple/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gaming-purple">
          <Users className="w-5 h-5" />
          בקשות חברות ({incomingRequests.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incomingRequests.map((request) => (
          <div 
            key={request.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-gaming-purple/20"
          >
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-primary text-white">
                  {request.sender_profile?.display_name?.charAt(0).toUpperCase() || 
                   request.sender_profile?.username?.charAt(0).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="font-medium">
                  {request.sender_profile?.display_name || 
                   request.sender_profile?.username || 'משתמש לא ידוע'}
                </div>
                
                {request.message && (
                  <div className="text-sm text-muted-foreground mt-1">
                    "{request.message}"
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => acceptIncomingRequest(request.id)}
                className="bg-gaming-green/10 border-gaming-green/50 text-gaming-green hover:bg-gaming-green/20"
              >
                <UserCheck className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => rejectIncomingRequest(request.id)}
                className="bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20"
              >
                <UserX className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}