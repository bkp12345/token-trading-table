import type { Token } from "@/types/token";

/**
 * Mock token data generator
 */
const tokenNames = [
  "SolDoge", "BonkCat", "MoonRocket", "SafePepe", "ElonMars",
  "ShibaFloki", "DogeKing", "MetaMoon", "CryptoShark", "DiamondHands",
  "RocketFuel", "GoldenPepe", "LunarEclipse", "StellarDoge", "CosmicCat",
  "TurboShib", "MegaMoon", "UltraDoge", "HyperCat", "SuperBonk"
];

function generateMockToken(
  index: number,
  category: "new-pairs" | "final-stretch" | "migrated"
): Token {
  const basePrice = Math.random() * 10;
  const priceChange = (Math.random() - 0.5) * 20;
  const createdAt = new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(); // Within last 30 days
  
  return {
    id: `token-${category}-${index}`,
    symbol: tokenNames[index % tokenNames.length].toUpperCase(),
    name: tokenNames[index % tokenNames.length],
    price: basePrice,
    previousPrice: basePrice * (1 - priceChange / 100),
    marketCap: Math.random() * 10000000,
    volume24h: Math.random() * 1000000,
    priceChange24h: priceChange,
    liquidity: Math.random() * 500000,
    holders: Math.floor(Math.random() * 10000),
    createdAt,
    contractAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
    chain: ["SOL", "BNB", "ETH"][Math.floor(Math.random() * 3)] as "SOL" | "BNB" | "ETH",
    logoUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${tokenNames[index % tokenNames.length]}`,
    ...(category === "final-stretch" && {
      bondingProgress: Math.random() * 100,
    }),
    ...(category === "migrated" && {
      migrationStatus: "completed" as const,
      migrationDate: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Within last 7 days
    }),
  };
}

export function generateMockTokens(
  count: number,
  category: "new-pairs" | "final-stretch" | "migrated"
): Token[] {
  return Array.from({ length: count }, (_, i) => generateMockToken(i, category));
}

/**
 * Simulate API delay
 */
export async function simulateApiDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock API functions
 */
export const mockApi = {
  async fetchNewPairs(): Promise<Token[]> {
    await simulateApiDelay();
    return generateMockTokens(20, "new-pairs");
  },

  async fetchFinalStretch(): Promise<Token[]> {
    await simulateApiDelay();
    return generateMockTokens(15, "final-stretch");
  },

  async fetchMigrated(): Promise<Token[]> {
    await simulateApiDelay();
    return generateMockTokens(10, "migrated");
  },
};
