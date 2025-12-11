export interface Toast {
  message: string;
  title?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  delay?: number;
  autohide?: boolean;
  classname?: string;
}
