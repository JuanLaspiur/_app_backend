export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "moderator";
  username: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  avatarUrl?: string;
  password: string;
  session: {
    token: string;
    expiresAt: string;
    lastLogin: string;
  };
  jobTitle: string;    
  location?: string;   
}
