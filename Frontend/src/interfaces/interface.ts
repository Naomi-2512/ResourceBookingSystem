export interface ChatUser {
    id: number;
    name: string;
    avatar?: string;
    initials?: string;
    lastMessage: string;
    time: string;
    isTyping?: boolean;
    unreadCount?: number;
  }
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    location: string;
    image: string;
    isDeleted: boolean;
  }