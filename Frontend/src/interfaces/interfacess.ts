// User Interface
export interface User {
    userId: string;
    profileImage: string;
    role:string;
    firstName: string;
    lastName: string;
    phone1: string;
    phone2: string;
    email: string;
    password: string;
    location: string;
    isDeleted: boolean;
    isWelcomed: boolean;
    ResourceBookings?: ResourceBooking[];
    VenueBookings?: VenueBooking[];
    ChatsSent?: Chat[];
    ChatsReceived?: Chat[];
  }
  
  // Resource Interface
  export interface Resource {
    resourceId: string;
    name: string;
    image: string;
    Availability: boolean;
    category: string;
    categoryId: string;
    Quantity: number;
    remainingQuantity: number;
    status: string;
    ResourceBookings?: ResourceBooking[];
    categories: Category;
  }
  
  // ResourceBooking Interface
  export interface ResourceBooking {
    bookId: string;
    userId: string;
    resourceId: string;
    quantity: number;
    dateBooked: Date;
    userReturnDate: Date;
    actualReturnDate: Date;
    isApproved: boolean;
    isReturned: boolean;
    isCancelled: boolean;
    User: User;
    Resources: Resource;
  }
  
  // Venue Interface
  export interface Venue {
    venueId: string;
    name: string;
    Image: string;
    Availability: boolean;
    VenueBookings?: VenueBooking[];
  }
  
  // VenueBooking Interface
  export interface VenueBooking {
    bookId: string;
    userId: string;
    venueId: string;
    isApproved: boolean;
    isCancelled: boolean;
    dateBooked: Date;
    startTime: Date;
    duration: number;
    User: User;
    Venue: Venue;
  }
  
  // Chat Interface
  export interface Chat {
    chatId: string;
    senderId: string;
    receiverId: string;
    content: string;
    dateCreated: Date;
    dateModified: Date;
    Sender: User;
    Receiver: User;
  }
  
  // Category Interface
  export interface Category {
    categoryId: string;
    categoryName: string;
    Resources?: Resource[];
  }

  export interface TokenDetails{
    userId:string;
    role:string;
  }

  export interface ReturnedResource{
    bookId:string;
    resourceId:string
  }
  export interface LoginDetails {
  email: string;
  password: string;
}
  export interface RecoveryDetails {
  email: string
  recoveryCode: number,
  Password: string
}

export interface MailConfigurations {
  service: string,
  host: string,
  port: number,
  requireTLS: boolean,
  auth: {
    user: string,
    pass: string
  }
}

export interface MessageOptions {
  from: string,
  to: string,
  subject: string,
  html: string
}
export interface Recovery {
  recoveryId: string,
  email: string,
  recoveryCode: number
  codeSent: boolean,
  dateCreated: string
}