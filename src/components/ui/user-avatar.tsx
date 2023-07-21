import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar>
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
