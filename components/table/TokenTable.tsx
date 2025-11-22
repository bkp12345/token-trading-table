"use client";

import { memo, useCallback, useMemo } from "react";
import { TableHeader } from "./TableHeader";
import { TokenRow } from "./TokenRow";
import { MobileTokenCard } from "./MobileTokenCard";
import { TableSkeleton } from "@/components/LoadingStates";
import type { Token, SortConfig } from "@/types/token";

interface TokenTableProps {
  tokens: Token[];
  loading?: boolean;
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
  category: "new-pairs" | "final-stretch" | "migrated";
}

/**
 * Main token table component with sorting and categorization
 * Responsive: Shows table on desktop, cards on mobile
 */
export const TokenTable = memo(function TokenTable({
  tokens,
  loading = false,
  sortConfig,
  onSort,
  category,
}: TokenTableProps) {
  const handleSort = useCallback(
    (key: string) => {
      onSort(key);
    },
    [onSort]
  );

  const sortedTokens = useMemo(() => {
    if (!sortConfig) return tokens;

    return [...tokens].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [tokens, sortConfig]);

  if (loading) {
    return (
      <>
        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <TableSkeleton rows={10} columns={category === "new-pairs" ? 6 : 7} />
        </div>
        {/* Mobile skeleton */}
        <div className="space-y-4 md:hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-muted-foreground">
        No tokens found
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden w-full overflow-x-auto md:block">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b">
              <th className="py-3 pr-4 text-left">
                <TableHeader
                  label="Token"
                  sortKey="symbol"
                  currentSort={sortConfig}
                  onSort={handleSort}
                  tooltip="Token symbol and name"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <TableHeader
                  label="Price"
                  sortKey="price"
                  currentSort={sortConfig}
                  onSort={handleSort}
                  tooltip="Current token price"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <TableHeader
                  label="24h %"
                  sortKey="priceChange24h"
                  currentSort={sortConfig}
                  onSort={handleSort}
                  tooltip="24-hour price change"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <TableHeader
                  label="Market Cap"
                  sortKey="marketCap"
                  currentSort={sortConfig}
                  onSort={handleSort}
                  tooltip="Total market capitalization"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <TableHeader
                  label="Volume"
                  sortKey="volume24h"
                  currentSort={sortConfig}
                  onSort={handleSort}
                  tooltip="24-hour trading volume"
                />
              </th>
              {category === "final-stretch" && (
                <th className="px-4 py-3 text-left">
                  <TableHeader
                    label="Bonding"
                    sortKey="bondingProgress"
                    currentSort={sortConfig}
                    onSort={handleSort}
                    tooltip="Bonding curve progress"
                  />
                </th>
              )}
              {category === "migrated" && (
                <th className="px-4 py-3 text-left">
                  <TableHeader
                    label="Migration"
                    tooltip="Migration information"
                  />
                </th>
              )}
              <th className="px-4 py-3 text-right">
                <TableHeader
                  label="Holders"
                  sortKey="holders"
                  currentSort={sortConfig}
                  onSort={handleSort}
                  align="right"
                  tooltip="Number of token holders"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens.map((token) => (
              <TokenRow
                key={token.id}
                token={token}
                showBondingProgress={category === "final-stretch"}
                showMigrationInfo={category === "migrated"}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {sortedTokens.map((token) => (
          <MobileTokenCard
            key={token.id}
            token={token}
            showBondingProgress={category === "final-stretch"}
            showMigrationInfo={category === "migrated"}
          />
        ))}
      </div>
    </>
  );
});
