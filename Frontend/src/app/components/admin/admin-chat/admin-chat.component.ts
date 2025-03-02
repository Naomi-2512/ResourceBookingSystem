import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatUser } from '../../../../interfaces/interface';

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-chat.component.html',
  styleUrl: './admin-chat.component.css'
})
export class AdminChatComponent implements OnInit {
  // showSidebar = false;
  // users: ChatUser[] = [
  //   {
  //     id: 1,
  //     name: 'Real estate deals',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg',
  //     lastMessage: 'typing...',
  //     time: '11:15',
  //     isTyping: true,
  //     unreadCount: 3
  //   },
  //   {
  //     id: 2,
  //     name: 'Kate Johnson',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg',
  //     lastMessage: 'I will send the document s...',
  //     time: '11:15'
  //   },
  //   {
  //     id: 3,
  //     name: 'Tamara Shevchenko',
  //     initials: 'TS',
  //     lastMessage: 'Are you going to a busine...',
  //     time: '10:05'
  //   },
  //   {
  //     id: 4,
  //     name: 'Joshua Clarkson',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg',
  //     lastMessage: 'I suggest to start, I have n...',
  //     time: '15:09'
  //   },
  //   {
  //     id: 5,
  //     name: 'Jeroen Zoet',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg',
  //     lastMessage: 'We need to start a new re...',
  //     time: '14:09'
  //   }
  // ];

  // activeChat: ChatUser = this.users[0];
  // messages = [
  //   {
  //     sent: false,
  //     text: 'Recently I saw properties in a great location that I did not pay attention to before 😌',
  //     time: '11:20 AM',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg'
  //   },
  //   {
  //     sent: false,
  //     text: 'Oh, why don\'t you say something more @Robert? 🤔',
  //     time: '11:21 AM',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg'
  //   },
  //   {
  //     sent: true,
  //     text: 'He creates an atmosphere of mystery 😏',
  //     time: '11:22 AM',
  //     seen: true
  //   },
  //   {
  //     sent: false,
  //     text: 'Robert, don\'t be like that and say something more 😉',
  //     time: '11:24 AM',
  //     avatar: 'https://i.pinimg.com/474x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg'
  //   }
  // ];

  // constructor() {}

  // ngOnInit(): void {}

  // toggleSidebar(): void {
  //   this.showSidebar = !this.showSidebar;
  // }

  // selectChat(user: ChatUser): void {
  //   this.activeChat = user;
  //   if (user.unreadCount) {
  //     user.unreadCount = 0;
  //   }
  //   this.showSidebar = false;
  // }

  showUserDetails = false;
  selectedUser: any = null;
  
  // Sample users data for UI display
  users = [
    {
      id: 1,
      name: 'John Smith',
      lastMessage: 'From 2 PM to 4 PM',
      timestamp: '10:10 AM',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      isOnline: true,
      unreadCount: 0,
      email: 'johnsmith@university.edu',
      phone: '+1 (555) 123-4567',
      location: 'Engineering Block, Room 203',
      department: 'Computer Science, Year 3'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      lastMessage: 'Can you help me with...',
      timestamp: '9:45 AM',
      profileImage: 'https://th.bing.com/th/id/OIP.ZLM7ThTbMdjDyCTm1sLO2QHaLE?w=184&h=275&c=7&r=0&o=5&pid=1.7',
      isOnline: true,
      unreadCount: 2,
      email: 'emily.j@university.edu',
      phone: '+1 (555) 987-6543',
      location: 'Library, Study Room 5',
      department: 'Business, Year 2'
    },
    {
      id: 3,
      name: 'Michael Brown',
      lastMessage: 'Thanks for your help!',
      timestamp: 'Yesterday',
      profileImage: 'https://th.bing.com/th/id/R.0301819f445a8855c4a577a6763fb62d?rik=TT%2fgaYZuz1YEig&riu=http%3a%2f%2fanhede.se%2fwp-content%2fuploads%2f2014%2f01%2f130221-2528.jpg&ehk=LToqkipED3KxGj7CVuMoQrvi487RY2HN6IPZ59FCWNQ%3d&risl=&pid=ImgRaw&r=0',
      isOnline: false,
      unreadCount: 0,
      email: 'mbrown@university.edu',
      phone: '+1 (555) 456-7890',
      location: 'Arts Building, Room 105',
      department: 'Fine Arts, Year 4'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      lastMessage: 'I will check and get back...',
      timestamp: 'Yesterday',
      profileImage: 'https://th.bing.com/th/id/OIP.HjCo-okyESGl53iCiO8udQHaHa?pid=ImgDet&w=474&h=474&rs=1',
      isOnline: true,
      unreadCount: 0,
      email: 'swilson@university.edu',
      phone: '+1 (555) 234-5678',
      location: 'Science Block, Lab 3',
      department: 'Biology, Year 3'
    },
    {
      id: 5,
      name: 'David Miller',
      lastMessage: 'When will the library be...',
      timestamp: 'Monday',
      profileImage: 'https://th.bing.com/th/id/OIP.ZLM7ThTbMdjDyCTm1sLO2QHaLE?w=184&h=275&c=7&r=0&o=5&pid=1.7',
      isOnline: true,
      unreadCount: 0,
      email: 'dmiller@university.edu',
      phone: '+1 (555) 876-5432',
      location: 'Student Center',
      department: 'Engineering, Year 2'
    }
  ];
  
  // Current conversation
  currentConversation = {
    userId: 1,
    messages: [
      // Messages will be loaded from your backend
    ]
  };
  
  constructor() { }

  ngOnInit(): void {
    // Your existing implementation would go here
    // Initialize with first user selected
    this.selectedUser = this.users[0];
  }

  // UI Methods
  toggleUserDetails(): void {
    this.showUserDetails = !this.showUserDetails;
  }
  
  selectUser(userId: number): void {
    this.selectedUser = this.users.find(user => user.id === userId);
    this.currentConversation.userId = userId;
    // In actual implementation, you would load the conversation history here
    
    // Mark messages as read when selecting a user
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.unreadCount = 0;
    }
  }
  
  // These methods would normally call your backend services
  sendMessage(content: string): void {
    // UI only implementation
    console.log('Sending message to user:', this.selectedUser.id, content);
    // Your actual implementation would call your backend service
  }
  
  editMessage(messageId: number, newContent: string): void {
    // UI only implementation
    console.log('Editing message:', messageId, newContent);
    // Your actual implementation would call your backend service
  }
  
  searchUsers(query: string): void {
    // UI only implementation
    console.log('Searching users with query:', query);
    // Your actual implementation would filter users based on the query
  }
}
