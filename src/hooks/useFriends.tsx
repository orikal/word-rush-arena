import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Friend {
  friend_id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  wins: number;
  status: string;
  is_online: boolean;
}

interface FriendRequest {
  id: string;
  sender_id: string;
  recipient_email: string;
  message?: string;
  status: string;
  created_at: string;
  sender_profile?: {
    username: string;
    display_name: string;
    avatar_url?: string;
  };
}

interface IncomingFriendRequest {
  id: string;
  sender_id: string;
  recipient_email: string;
  message?: string;
  status: string;
  created_at: string;
  sender_profile?: {
    username: string;
    display_name: string;
    avatar_url?: string;
  };
}

export const useFriends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<IncomingFriendRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch friends
  const fetchFriends = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_user_friends', {
        user_uuid: user.id
      });
      
      if (error) throw error;
      setFriends(data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch friend requests
  const fetchFriendRequests = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('friend_requests')
        .select('*')
        .eq('sender_id', user.id);
      
      if (error) throw error;
      setFriendRequests(data || []);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  // Fetch incoming friend requests
  const fetchIncomingRequests = async () => {
    if (!user) return;
    
    try {
      // First get the basic request data
      const { data: requestsData, error: requestsError } = await supabase
        .from('friend_requests')
        .select('*')
        .eq('recipient_email', user.email)
        .eq('status', 'pending');
      
      if (requestsError) throw requestsError;
      
      if (!requestsData || requestsData.length === 0) {
        setIncomingRequests([]);
        return;
      }
      
      // Get sender profiles separately
      const senderIds = requestsData.map(req => req.sender_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url')
        .in('id', senderIds);
      
      if (profilesError) throw profilesError;
      
      // Combine the data
      const combinedData = requestsData.map(request => ({
        ...request,
        sender_profile: profilesData?.find(profile => profile.id === request.sender_id)
      }));
      
      setIncomingRequests(combinedData);
    } catch (error) {
      console.error('Error fetching incoming requests:', error);
    }
  };

  // Accept incoming friend request
  const acceptIncomingRequest = async (requestId: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.rpc('accept_friend_request', {
        request_id: requestId
      });
      
      if (error) throw error;
      
      if (data) {
        toast.success('בקשת החברות אושרה!');
        fetchIncomingRequests();
        fetchFriends();
        return true;
      } else {
        toast.error('שגיאה באישור בקשת החברות');
        return false;
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast.error('שגיאה באישור בקשת החברות');
      return false;
    }
  };

  // Reject incoming friend request
  const rejectIncomingRequest = async (requestId: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.rpc('reject_friend_request', {
        request_id: requestId
      });
      
      if (error) throw error;
      
      if (data) {
        toast.success('בקשת החברות נדחתה');
        fetchIncomingRequests();
        return true;
      } else {
        toast.error('שגיאה בדחיית בקשת החברות');
        return false;
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      toast.error('שגיאה בדחיית בקשת החברות');
      return false;
    }
  };

  // Send friend request by email
  const sendFriendRequest = async (email: string, message?: string) => {
    if (!user) {
      toast.error('עליך להיות מחובר כדי לשלוח הזמנת חברות');
      return false;
    }

    try {
      const { error } = await supabase
        .from('friend_requests')
        .insert({
          sender_id: user.id,
          recipient_email: email,
          message: message || 'בוא נשחק משחק מילים!'
        });
      
      if (error) {
        if (error.code === '23505') {
          toast.error('כבר שלחת הזמנה לאימייל הזה');
        } else {
          throw error;
        }
        return false;
      }
      
      toast.success('הזמנת החברות נשלחה בהצלחה!');
      fetchFriendRequests();
      return true;
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast.error('שגיאה בשליחת הזמנת החברות');
      return false;
    }
  };

  // Accept friend request (when user signs up with invite)
  const acceptFriendRequest = async (requestId: string, newUserId: string) => {
    try {
      // Update the friend request status
      const { error: updateError } = await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);
      
      if (updateError) throw updateError;

      // Get the sender info
      const { data: requestData, error: getError } = await supabase
        .from('friend_requests')
        .select('sender_id')
        .eq('id', requestId)
        .single();
      
      if (getError) throw getError;

      // Create friendship in both directions
      const { error: friendError } = await supabase
        .from('friends')
        .insert([
          {
            user_id: requestData.sender_id,
            friend_id: newUserId,
            status: 'accepted'
          },
          {
            user_id: newUserId,
            friend_id: requestData.sender_id,
            status: 'accepted'
          }
        ]);
      
      if (friendError) throw friendError;
      
      toast.success('נוספת כחבר בהצלחה!');
      fetchFriends();
      return true;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      return false;
    }
  };

  // Challenge a friend
  const challengeFriend = async (friendId: string) => {
    // This will be implemented when we add the game challenges system
    toast.info('תכונת האתגר תוטמע בקרוב!');
  };

  useEffect(() => {
    if (user) {
      fetchFriends();
      fetchFriendRequests();
      fetchIncomingRequests();
    }
  }, [user]);

  return {
    friends,
    friendRequests,
    incomingRequests,
    loading,
    sendFriendRequest,
    acceptFriendRequest,
    acceptIncomingRequest,
    rejectIncomingRequest,
    challengeFriend,
    fetchFriends,
    fetchFriendRequests,
    fetchIncomingRequests
  };
};