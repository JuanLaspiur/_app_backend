
export interface Notification {
  id: string;  
  userId:string |number         // ID único de la notificación
  title: string;        // Título o asunto de la notificación
  message: string;      // Mensaje o contenido
  isRead: boolean;        // Si ya fue leída o no
  createdAt: string;    // Fecha en ISO string
  type?: string; //  "info" | "warning" | "success" | "error" #TO_DO hacer ENUM
}
