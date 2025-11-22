"use client";

import { memo, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, formatNumber, formatPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Token } from "@/types/token";

interface TokenRowProps {
  token: Token;
  showBondingProgress?: boolean;
  showMigrationInfo?: boolean;
}

/**
 * Memoized token row component with price animations
 */
export const TokenRow = memo(function TokenRow({
  token,
  showBondingProgress = false,
  showMigrationInfo = false,
}: TokenRowProps) {
  const [priceAnimation, setPriceAnimation] = useState<"up" | "down" | null>(
    null
  );
  const [prevPrice, setPrevPrice] = useState(token.price);

  // Detect price changes and trigger animations
  useEffect(() => {
    if (token.price !== prevPrice) {
      setPriceAnimation(token.price > prevPrice ? "up" : "down");
      setPrevPrice(token.price);

      // Clear animation after 1 second
      const timer = setTimeout(() => setPriceAnimation(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [token.price, prevPrice]);

  const priceChangeClass = useMemo(() => {
    if (token.priceChange24h > 0) return "text-positive";
    if (token.priceChange24h < 0) return "text-negative";
    return "";
  }, [token.priceChange24h]);

  return (
    <tr className="group border-b transition-colors hover:bg-accent/50">
      {/* Token Info */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src={token.logoUrl || "/placeholder.svg"}
              alt={token.symbol}
              fill
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{token.symbol}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{token.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {token.contractAddress.slice(0, 6)}...
                      {token.contractAddress.slice(-4)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xs text-muted-foreground">{token.name}</p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <div
          className={cn(
            "font-mono transition-colors duration-300",
            priceAnimation === "up" && "text-positive",
            priceAnimation === "down" && "text-negative"
          )}
        >
          ${formatPrice(token.price)}
        </div>
      </td>

      {/* 24h Change */}
      <td className="px-4 py-3">
        <div className={cn("flex items-center gap-1", priceChangeClass)}>
          {token.priceChange24h > 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="font-mono">
            {formatPercentage(token.priceChange24h)}
          </span>
        </div>
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3">
        <Popover>
          <PopoverTrigger className="text-left hover:underline">
            ${formatNumber(token.marketCap)}
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-semibold">Market Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span>${formatNumber(token.marketCap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume:</span>
                  <span>${formatNumber(token.volume24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Liquidity:</span>
                  <span>${formatNumber(token.liquidity)}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </td>

      {/* Volume */}
      <td className="px-4 py-3">${formatNumber(token.volume24h)}</td>

      {/* Bonding Progress (Final Stretch only) */}
      {showBondingProgress && (
        <td className="px-4 py-3">
          {token.bondingProgress !== undefined && (
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${token.bondingProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {token.bondingProgress.toFixed(1)}%
              </p>
            </div>
          )}
        </td>
      )}

      {/* Migration Info (Migrated only) */}
      {showMigrationInfo && (
        <td className="px-4 py-3">
          {token.migrationDate && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Migration Details - {token.symbol}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-semibold capitalize">
                      {token.migrationStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Migration Date:
                    </span>
                    <span>{new Date(token.migrationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chain:</span>
                    <span>{token.chain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Holders:</span>
                    <span>{formatNumber(token.holders)}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </td>
      )}

      {/* Holders */}
      <td className="px-4 py-3 text-right">
        {formatNumber(token.holders)}
      </td>
    </tr>
  );
});
