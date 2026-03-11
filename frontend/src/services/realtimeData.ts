// Real-time data service for UniPath Explorer
// Provides exchange rates, live statistics, and application deadlines

export interface ExchangeRates {
  base: string;
  timestamp: number;
  rates: {
    USD: number;
    GBP: number;
    CAD: number;
    AUD: number;
    EUR: number;
    INR: number;
    JPY: number;
    CNY: number;
  };
}

export interface LiveStats {
  activeUsers: number;
  totalUniversitiesViewed: number;
  applicationsToday: number;
  lastUpdated: string;
}

export interface ApplicationDeadline {
  id: string;
  universityName: string;
  country: string;
  deadline: string;
  type: "early" | "regular" | "rolling";
}

export interface TrendingUniversity {
  id: string;
  name: string;
  country: string;
  views: number;
  trend: "up" | "down" | "stable";
}

// Simulated exchange rates (would be fetched from API in production)
const baseRates: ExchangeRates["rates"] = {
  USD: 1,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  EUR: 0.92,
  INR: 83.12,
  JPY: 149.5,
  CNY: 7.24,
};

// Simulate realistic rate fluctuations
const simulateRateFluctuation = (rate: number): number => {
  const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% fluctuation
  return rate * (1 + fluctuation);
};

export const realtimeService = {
  // Get current exchange rates with slight simulation
  getExchangeRates: async (): Promise<ExchangeRates> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const rates: ExchangeRates["rates"] = {
      USD: simulateRateFluctuation(baseRates.USD),
      GBP: simulateRateFluctuation(baseRates.GBP),
      CAD: simulateRateFluctuation(baseRates.CAD),
      AUD: simulateRateFluctuation(baseRates.AUD),
      EUR: simulateRateFluctuation(baseRates.EUR),
      INR: simulateRateFluctuation(baseRates.INR),
      JPY: simulateRateFluctuation(baseRates.JPY),
      CNY: simulateRateFluctuation(baseRates.CNY),
    };

    return {
      base: "USD",
      timestamp: Date.now(),
      rates,
    };
  },

  // Get live statistics
  getLiveStats: async (): Promise<LiveStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    return {
      activeUsers: Math.floor(Math.random() * 500) + 200,
      totalUniversitiesViewed: Math.floor(Math.random() * 10000) + 5000,
      applicationsToday: Math.floor(Math.random() * 50) + 10,
      lastUpdated: new Date().toISOString(),
    };
  },

  // Get upcoming application deadlines
  getDeadlines: async (): Promise<ApplicationDeadline[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    
    const now = new Date();
    const deadlines: ApplicationDeadline[] = [
      {
        id: "1",
        universityName: "MIT",
        country: "USA",
        deadline: "2025-01-15",
        type: "early",
      },
      {
        id: "2",
        universityName: "University of Oxford",
        country: "UK",
        deadline: "2025-10-15",
        type: "regular",
      },
      {
        id: "3",
        universityName: "University of Toronto",
        country: "Canada",
        deadline: "2025-02-01",
        type: "regular",
      },
      {
        id: "4",
        universityName: "University of Melbourne",
        country: "Australia",
        deadline: "2025-12-31",
        type: "rolling",
      },
      {
        id: "5",
        universityName: "Technical University of Munich",
        country: "Germany",
        deadline: "2025-07-15",
        type: "regular",
      },
    ];

    return deadlines;
  },

  // Get trending universities
  getTrendingUniversities: async (): Promise<TrendingUniversity[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const trending: TrendingUniversity[] = [
      { id: "1", name: "MIT", country: "USA", views: 1250, trend: "up" },
      { id: "3", name: "University of Oxford", country: "UK", views: 980, trend: "up" },
      { id: "5", name: "University of Toronto", country: "Canada", views: 875, trend: "stable" },
      { id: "9", name: "Technical University of Munich", country: "Germany", views: 720, trend: "up" },
      { id: "11", name: "Harvard University", country: "USA", views: 1100, trend: "down" },
    ];

    return trending;
  },

  // Convert currency
  convertCurrency: async (
    amount: number,
    from: string,
    to: string
  ): Promise<number> => {
    const rates = await realtimeService.getExchangeRates();
    const fromRate = rates.rates[from as keyof typeof rates.rates];
    const toRate = rates.rates[to as keyof typeof rates.rates];
    
    if (!fromRate || !toRate) {
      throw new Error("Invalid currency code");
    }
    
    // Convert to USD first, then to target currency
    const inUSD = amount / fromRate;
    return inUSD * toRate;
  },
};

export default realtimeService;

