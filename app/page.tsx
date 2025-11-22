"use client";

import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CategoryTabs } from "@/components/CategoryTabs";
import { TokenTable } from "@/components/table/TokenTable";
import { useTokens } from "@/hooks/useTokens";
import { useTableSort } from "@/hooks/useTableSort";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<
    "new-pairs" | "final-stretch" | "migrated"
  >("new-pairs");

  const { tokens, loading, error } = useTokens(activeCategory);
  const { sortConfig, handleSort } = useTableSort({
    key: "marketCap",
    direction: "desc",
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Token Discovery</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="hidden sm:inline">
                  Real-time Price Updates
                </span>
                <div className="h-2 w-2 animate-pulse rounded-full bg-positive" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="rounded-lg border bg-card shadow-sm">
            {/* Category Tabs */}
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Token Table */}
            <div className="p-6">
              {error ? (
                <div className="flex min-h-[400px] items-center justify-center text-destructive">
                  Error: {error}
                </div>
              ) : (
                <TokenTable
                  tokens={tokens}
                  loading={loading}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  category={activeCategory}
                />
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Showing {tokens.length} tokens · Updates every 2-5 seconds
            </p>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
