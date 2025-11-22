"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTokens, setLoading, setError, updatePrice } from "@/store/slices/tokenSlice";
import { mockApi } from "@/lib/mockData";
import { mockWebSocket } from "@/lib/mockWebSocket";
import type { PriceUpdate } from "@/types/token";

/**
 * Custom hook to fetch tokens by category
 */
export function useTokens(category: "new-pairs" | "final-stretch" | "migrated") {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.tokens);

  const { data, isLoading, error: queryError } = useQuery({
    queryKey: ["tokens", category],
    queryFn: async () => {
      dispatch(setLoading(true));
      try {
        let tokens;
        switch (category) {
          case "new-pairs":
            tokens = await mockApi.fetchNewPairs();
            break;
          case "final-stretch":
            tokens = await mockApi.fetchFinalStretch();
            break;
          case "migrated":
            tokens = await mockApi.fetchMigrated();
            break;
        }
        dispatch(setTokens(tokens));
        return tokens;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch tokens";
        dispatch(setError(errorMessage));
        throw err;
      }
    },
    staleTime: 30000, // 30 seconds
  });

  // Setup WebSocket for real-time price updates
  useEffect(() => {
    if (data && data.length > 0) {
      const tokenIds = data.map((token) => token.id);
      mockWebSocket.connect(tokenIds);

      const unsubscribe = mockWebSocket.subscribe((update: PriceUpdate) => {
        dispatch(updatePrice({ id: update.tokenId, price: update.price }));
      });

      return () => {
        unsubscribe();
        mockWebSocket.disconnect();
      };
    }
  }, [data, dispatch]);

  return {
    tokens: items,
    loading: loading || isLoading,
    error: error || (queryError ? queryError.message : null),
  };
}
