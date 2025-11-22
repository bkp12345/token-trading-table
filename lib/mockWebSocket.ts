import type { PriceUpdate } from "@/types/token";

/**
 * Mock WebSocket service for real-time price updates
 */
export class MockWebSocketService {
  private listeners: Set<(update: PriceUpdate) => void> = new Set();
  private interval: NodeJS.Timeout | null = null;
  private activeTokenIds: string[] = [];

  /**
   * Connect and start sending price updates
   */
  connect(tokenIds: string[]): void {
    this.activeTokenIds = tokenIds;
    
    if (this.interval) {
      this.disconnect();
    }

    // Send price updates every 2-5 seconds
    this.interval = setInterval(() => {
      this.sendRandomUpdate();
    }, Math.random() * 3000 + 2000);
  }

  /**
   * Disconnect and stop sending updates
   */
  disconnect(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Subscribe to price updates
   */
  subscribe(callback: (update: PriceUpdate) => void): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Send a random price update to a random token
   */
  private sendRandomUpdate(): void {
    if (this.activeTokenIds.length === 0) return;

    const randomTokenId = this.activeTokenIds[
      Math.floor(Math.random() * this.activeTokenIds.length)
    ];

    // Generate price change between -5% and +5%
    const priceChangePercent = (Math.random() - 0.5) * 10;
    const basePrice = Math.random() * 10;
    const newPrice = basePrice * (1 + priceChangePercent / 100);

    const update: PriceUpdate = {
      tokenId: randomTokenId,
      price: newPrice,
      timestamp: Date.now(),
    };

    this.notifyListeners(update);
  }

  /**
   * Notify all listeners of a price update
   */
  private notifyListeners(update: PriceUpdate): void {
    this.listeners.forEach((listener) => listener(update));
  }

  /**
   * Update the list of active token IDs
   */
  updateTokenIds(tokenIds: string[]): void {
    this.activeTokenIds = tokenIds;
  }
}

// Export singleton instance
export const mockWebSocket = new MockWebSocketService();
