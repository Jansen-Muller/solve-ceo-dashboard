export interface HealthCheck {
  id: string;
  created_at: string;
  status: string;
}

export type Database = {
  public: {
    Tables: {
      health_check: {
        Row: HealthCheck;
        Insert: Omit<HealthCheck, 'id' | 'created_at'>;
        Update: Partial<Omit<HealthCheck, 'id'>>;
      };
    };
  };
};
