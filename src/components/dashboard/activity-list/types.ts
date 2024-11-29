export interface Activity {
  id: string;
  type: 'ticket' | 'service' | 'workspace';
  action: string;
  description: string;
  timestamp: Date;
}