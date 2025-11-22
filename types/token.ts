/**
 * Token data structure
 */
export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  previousPrice: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
  holders: number;
  createdAt: string; // ISO date string
  bondingProgress?: number; // For Final Stretch tokens (0-100%)
  migrationStatus?: "pending" | "completed"; // For Migrated tokens
  migrationDate?: string; // ISO date string
  logoUrl?: string;
  contractAddress: string;
  chain: "SOL" | "BNB" | "ETH";
}

/**
 * Token category types
 */
export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

/**
 * Sort configuration
 */
export interface SortConfig {
  key: keyof Token;
  direction: "asc" | "desc";
}

/**
 * WebSocket message types
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  timestamp: number;
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  minLiquidity?: number;
  chains?: string[];
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}
