export interface ContactMessage {
  id: number;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContactMessage {
  email: string;
  message: string;
}
