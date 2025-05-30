export interface FilterOptions {
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

export interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface EventState {
  events: any[];
  registrations: any[];
  filteredEvents: any[];
  registerForEvent: (eventId: string) => Promise<boolean>;
  unregisterFromEvent: (eventId: string) => Promise<boolean>;
  applyFilters: (filters: FilterOptions) => void;
  getUserRegistrations: (userId: string) => any[];
}
