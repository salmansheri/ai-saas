import { Avatar, AvatarImage } from "./avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" className="p-1" />
    </Avatar>
  );
};

export default BotAvatar;
