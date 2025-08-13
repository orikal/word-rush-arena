-- Fix security linter issue - set search_path for security definer function
DROP FUNCTION IF EXISTS public.get_user_friends(UUID);

CREATE OR REPLACE FUNCTION public.get_user_friends(user_uuid UUID)
RETURNS TABLE (
  friend_id UUID,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  wins INTEGER,
  status TEXT,
  is_online BOOLEAN
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    p.id as friend_id,
    p.username,
    p.display_name,
    p.avatar_url,
    p.wins,
    'זמין' as status,
    false as is_online
  FROM public.friends f
  JOIN public.profiles p ON (
    CASE 
      WHEN f.user_id = user_uuid THEN p.id = f.friend_id
      ELSE p.id = f.user_id
    END
  )
  WHERE (f.user_id = user_uuid OR f.friend_id = user_uuid)
    AND f.status = 'accepted';
$$;