"use client";

import { memo } from "react";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatPrice, formatNumber, formatPercentage, cn } from "@/lib/utils";
import type { Token } from "@/types/token";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MobileTokenCardProps {
  token: Token;
  showBondingProgress?: boolean;
  showMigrationInfo?: boolean;
}

/**
 * Mobile-optimized token card for small screens
 */
export const MobileTokenCard = memo(function MobileTokenCard({
  token,
  showBondingProgress = false,
  showMigrationInfo = false,
}: MobileTokenCardProps) {
  const priceChangeClass =
    token.priceChange24h > 0
      ? "text-positive"
      : token.priceChange24h < 0
      ? "text-negative"
      : "";

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50">
      <div className="flex items-start justify-between">
        {/* Token Info */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src={token.logoUrl || "/placeholder.svg"}
              alt={token.symbol}
              fill
              className="rounded-full object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">{token.symbol}</h3>
            <p className="text-sm text-muted-foreground truncate">{token.name}</p>
          </div>
        </div>

        {/* Price & Change */}
        <div className="text-right">
          <div className="font-mono font-semibold">${formatPrice(token.price)}</div>
          <div className={cn("flex items-center justify-end gap-1 text-sm", priceChangeClass)}>
            {token.priceChange24h > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="font-mono">{formatPercentage(token.priceChange24h)}</span>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground">Market Cap</p>
          <p className="font-medium">${formatNumber(token.marketCap)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Volume</p>
          <p className="font-medium">${formatNumber(token.volume24h)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Holders</p>
          <p className="font-medium">{formatNumber(token.holders)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Liquidity</p>
          <p className="font-medium">${formatNumber(token.liquidity)}</p>
        </div>
      </div>

      {/* Bonding Progress */}
      {showBondingProgress && token.bondingProgress !== undefined && (
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Bonding Progress</span>
            <span className="font-medium">{token.bondingProgress.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${token.bondingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Migration Info */}
      {showMigrationInfo && token.migrationDate && (
        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                View Migration Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Migration Details - {token.symbol}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold capitalize">{token.migrationStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Migration Date:</span>
                  <span>{new Date(token.migrationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain:</span>
                  <span>{token.chain}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
});
