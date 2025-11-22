"use client";

import { useCallback, useState } from "react";
import type { SortConfig, Token } from "@/types/token";

/**
 * Custom hook for managing table sorting
 */
export function useTableSort(defaultSort?: SortConfig) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(
    defaultSort || null
  );

  const handleSort = useCallback(
    (key: string) => {
      setSortConfig((current) => {
        // If clicking the same column, toggle direction
        if (current?.key === key) {
          return {
            key: key as keyof Token,
            direction: current.direction === "asc" ? "desc" : "asc",
          };
        }
        // If clicking a new column, default to descending
        return {
          key: key as keyof Token,
          direction: "desc",
        };
      });
    },
    []
  );

  return {
    sortConfig,
    handleSort,
  };
}
