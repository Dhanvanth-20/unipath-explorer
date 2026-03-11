import { useQuery } from "@tanstack/react-query";
import realtimeService, {
  ExchangeRates,
  LiveStats,
  ApplicationDeadline,
  TrendingUniversity,
} from "@/services/realtimeData";

export const EXCHANGE_RATES_KEY = "exchange-rates";
export const LIVE_STATS_KEY = "live-stats";
export const DEADLINES_KEY = "application-deadlines";
export const TRENDING_UNIVERSITIES_KEY = "trending-universities";

// Hook for exchange rates with auto-refresh every 5 minutes
export function useExchangeRates() {
  return useQuery<ExchangeRates>({
    queryKey: [EXCHANGE_RATES_KEY],
    queryFn: () => realtimeService.getExchangeRates(),
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for live statistics with auto-refresh every 30 seconds
export function useLiveStats() {
  return useQuery<LiveStats>({
    queryKey: [LIVE_STATS_KEY],
    queryFn: () => realtimeService.getLiveStats(),
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
    staleTime: 10 * 1000,
  });
}

// Hook for application deadlines
export function useDeadlines() {
  return useQuery<ApplicationDeadline[]>({
    queryKey: [DEADLINES_KEY],
    queryFn: () => realtimeService.getDeadlines(),
    refetchInterval: 10 * 60 * 1000, // Refresh every 10 minutes
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for trending universities
export function useTrendingUniversities() {
  return useQuery<TrendingUniversity[]>({
    queryKey: [TRENDING_UNIVERSITIES_KEY],
    queryFn: () => realtimeService.getTrendingUniversities(),
    refetchInterval: 60 * 1000, // Refresh every minute
    staleTime: 30 * 1000,
  });
}

// Hook for currency conversion
export function useCurrencyConversion(
  amount: number,
  from: string,
  to: string,
  enabled: boolean = true
) {
  return useQuery<number>({
    queryKey: ["currency-conversion", amount, from, to],
    queryFn: () => realtimeService.convertCurrency(amount, from, to),
    enabled: enabled && amount > 0 && from !== to,
    staleTime: 5 * 60 * 1000,
  });
}

