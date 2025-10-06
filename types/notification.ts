
export interface Notification {
  id: string;  
  userId:string |number;         
  title: string;      
  message: string;    
  isRead: boolean;       
  createdAt: string;    
  type?: string; 
}
