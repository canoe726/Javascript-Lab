export interface Conversation {
  id: string;
  userName: string;
  userAvatarUrl: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface Email {
  id: string;
  conversationId: string;
  text: string;
  createdAt: number;
  fromUser: boolean;
}
