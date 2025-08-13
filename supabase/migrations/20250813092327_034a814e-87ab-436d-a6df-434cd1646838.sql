-- Add RLS policy for users to see friend requests sent to their email
CREATE POLICY "Users can view friend requests sent to their email" ON public.friend_requests
  FOR SELECT USING (
    recipient_email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  );

-- Add RLS policy for users to update requests sent to their email (accept/reject)
CREATE POLICY "Users can update friend requests sent to their email" ON public.friend_requests
  FOR UPDATE USING (
    recipient_email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  );

-- Function to accept a friend request
CREATE OR REPLACE FUNCTION public.accept_friend_request(request_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  request_data RECORD;
  current_user_id UUID;
BEGIN
  -- Get current user
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Get the friend request
  SELECT sender_id, recipient_email, status INTO request_data
  FROM public.friend_requests
  WHERE id = request_id;
  
  -- Check if request exists and user has permission
  IF NOT FOUND OR request_data.status != 'pending' THEN
    RETURN FALSE;
  END IF;
  
  -- Verify user owns the email
  IF request_data.recipient_email != (SELECT email FROM auth.users WHERE id = current_user_id) THEN
    RETURN FALSE;
  END IF;

  -- Update request status
  UPDATE public.friend_requests
  SET status = 'accepted'
  WHERE id = request_id;

  -- Create friendship relationship (bidirectional)
  INSERT INTO public.friends (user_id, friend_id, status)
  VALUES 
    (request_data.sender_id, current_user_id, 'accepted'),
    (current_user_id, request_data.sender_id, 'accepted')
  ON CONFLICT (user_id, friend_id) DO NOTHING;

  RETURN TRUE;
END;
$$;

-- Function to reject a friend request
CREATE OR REPLACE FUNCTION public.reject_friend_request(request_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_user_id UUID;
  user_email TEXT;
BEGIN
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Get user email
  SELECT email INTO user_email FROM auth.users WHERE id = current_user_id;

  -- Update request status
  UPDATE public.friend_requests
  SET status = 'rejected'
  WHERE id = request_id 
    AND recipient_email = user_email
    AND status = 'pending';

  RETURN FOUND;
END;
$$;