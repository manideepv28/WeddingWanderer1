import { User, WeddingEvent, Registration } from '@shared/schema';

const STORAGE_KEYS = {
  USERS: 'weddingwander_users',
  CURRENT_USER: 'weddingwander_current_user',
  EVENTS: 'weddingwander_events',
  REGISTRATIONS: 'weddingwander_registrations',
} as const;

// Sample wedding events data
const SAMPLE_EVENTS: WeddingEvent[] = [
  {
    id: '1',
    title: "Elena & Marco's Santorini Dream",
    coupleName: "Elena & Marco",
    location: "Santorini, Greece",
    country: "greece",
    date: "2024-06-15",
    time: "18:00",
    venue: "Blue Domed Church, Oia",
    description: "A breathtaking clifftop ceremony overlooking the Aegean Sea with spectacular sunset backdrop and traditional Greek elements.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    maxGuests: 80,
    currentGuests: 24,
    price: 450,
    category: "Island Wedding",
    features: ["Sunset Ceremony", "Greek Traditional Music", "Mediterranean Cuisine", "Boat Transfer", "Photo Session"],
    dresscode: "Cocktail attire in light colors",
    coupleStory: "Elena and Marco met during a cooking class in Rome and have been inseparable ever since. They're passionate about travel and wanted to share their special day with friends from around the world.",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: "Alessandro & Sofia's Tuscan Romance",
    coupleName: "Alessandro & Sofia",
    location: "Tuscany, Italy",
    country: "italy",
    date: "2024-07-22",
    time: "17:30",
    venue: "Villa Bella Vista Vineyard",
    description: "An intimate celebration among rolling vineyards with wine tasting and traditional Italian feast in the heart of Tuscany.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    maxGuests: 60,
    currentGuests: 18,
    price: 520,
    category: "Vineyard Wedding",
    features: ["Vineyard Ceremony", "Wine Tasting", "Traditional Italian Menu", "Live Band", "Accommodation Assistance"],
    dresscode: "Garden party elegant",
    coupleStory: "Alessandro is a sommelier and Sofia is a chef. Their love story began in the vineyards of Tuscany where they now invite you to celebrate their union surrounded by the wines they've crafted together.",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: "Kai & Aisha's Tropical Paradise",
    coupleName: "Kai & Aisha",
    location: "Bali, Indonesia",
    country: "indonesia",
    date: "2024-08-10",
    time: "16:00",
    venue: "Bamboo Forest Temple, Ubud",
    description: "A bohemian beach ceremony with traditional Balinese blessings and tropical flower arrangements in paradise.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    maxGuests: 90,
    currentGuests: 32,
    price: 380,
    category: "Beach Wedding",
    features: ["Beachfront Ceremony", "Traditional Balinese Blessing", "Tropical Cuisine", "Fire Show", "Spa Treatments"],
    dresscode: "Bohemian chic, earth tones",
    coupleStory: "Kai and Aisha are yoga instructors who fell in love during a retreat in Bali. They're inviting their global community to witness their commitment in the sacred space where their journey began.",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: "Pierre & Camille's Château Romance",
    coupleName: "Pierre & Camille",
    location: "Provence, France",
    country: "france",
    date: "2024-09-05",
    time: "19:00",
    venue: "Château de Lavande",
    description: "A fairytale wedding in a historic château surrounded by endless lavender fields and French countryside charm.",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    maxGuests: 120,
    currentGuests: 45,
    price: 650,
    category: "Château Wedding",
    features: ["Lavender Field Ceremony", "French Wine Tasting", "Château Reception", "Provence Market Tour", "Cooking Class"],
    dresscode: "Formal romantic attire",
    coupleStory: "Pierre is a perfumer and Camille is an artist. They met at a lavender festival and their romance bloomed like the flowers around them. Join them for an enchanting evening in their magical château.",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: "Diego & Luna's Desert Magic",
    coupleName: "Diego & Luna",
    location: "Tulum, Mexico",
    country: "mexico",
    date: "2024-10-12",
    time: "17:00",
    venue: "Mystical Cenote Gardens",
    description: "A mystical ceremony in the desert with traditional Mexican music, colorful decorations, and ancient Mayan influences.",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    maxGuests: 100,
    currentGuests: 28,
    price: 420,
    category: "Desert Wedding",
    features: ["Desert Ceremony", "Traditional Mariachi", "Mexican Feast", "Cenote Swimming", "Stargazing Experience"],
    dresscode: "Colorful festive attire",
    coupleStory: "Diego and Luna are musicians who traveled the world before finding their home in Mexico's sacred cenotes. Their wedding celebrates the fusion of their cultures and their love for music.",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: "Yuki & Takeshi's Cherry Blossom Wedding",
    coupleName: "Yuki & Takeshi",
    location: "Kyoto, Japan",
    country: "japan",
    date: "2024-04-20",
    time: "14:00",
    venue: "Maruyama Park Temple",
    description: "A traditional Japanese ceremony during cherry blossom season in the ancient capital with authentic cultural experiences.",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    maxGuests: 70,
    currentGuests: 45,
    price: 580,
    category: "Garden Wedding",
    features: ["Traditional Tea Ceremony", "Kimono Experience", "Sake Tasting", "Garden Reception", "Cultural Performances"],
    dresscode: "Traditional attire welcome",
    coupleStory: "Yuki and Takeshi honor their heritage with a ceremony that brings together ancient traditions and modern celebration. Experience the beauty of Japanese culture and hospitality during the magical sakura season.",
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];

class LocalStorage {
  // User methods
  static getUsers(): User[] {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  }

  static saveUser(user: User): void {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  // Events methods
  static getEvents(): WeddingEvent[] {
    const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!events) {
      // Initialize with sample data
      this.saveEvents(SAMPLE_EVENTS);
      return SAMPLE_EVENTS;
    }
    return JSON.parse(events);
  }

  static saveEvents(events: WeddingEvent[]): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }

  static getEventById(id: string): WeddingEvent | null {
    const events = this.getEvents();
    return events.find(e => e.id === id) || null;
  }

  static updateEvent(event: WeddingEvent): void {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      events[index] = event;
      this.saveEvents(events);
    }
  }

  // Registration methods
  static getRegistrations(): Registration[] {
    const registrations = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return registrations ? JSON.parse(registrations) : [];
  }

  static saveRegistration(registration: Registration): void {
    const registrations = this.getRegistrations();
    const existingIndex = registrations.findIndex(r => r.id === registration.id);
    if (existingIndex >= 0) {
      registrations[existingIndex] = registration;
    } else {
      registrations.push(registration);
    }
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }

  static getUserRegistrations(userId: string): Registration[] {
    const registrations = this.getRegistrations();
    return registrations.filter(r => r.userId === userId && r.status === 'registered');
  }

  static getEventRegistration(userId: string, eventId: string): Registration | null {
    const registrations = this.getRegistrations();
    return registrations.find(r => r.userId === userId && r.eventId === eventId) || null;
  }

  static removeRegistration(userId: string, eventId: string): void {
    const registrations = this.getRegistrations();
    const registration = registrations.find(r => r.userId === userId && r.eventId === eventId);
    if (registration) {
      registration.status = 'cancelled';
      this.saveRegistration(registration);
    }
  }
}

export default LocalStorage;
