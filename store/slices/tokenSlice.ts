import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Token, SortConfig, FilterConfig } from "@/types/token";

interface TokenState {
  items: Token[];
  loading: boolean;
  error: string | null;
  sortConfig: SortConfig | null;
  filterConfig: FilterConfig;
  selectedCategory: "new-pairs" | "final-stretch" | "migrated";
}

const initialState: TokenState = {
  items: [],
  loading: false,
  error: null,
  sortConfig: null,
  filterConfig: {},
  selectedCategory: "new-pairs",
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const token = state.items.find((t) => t.id === action.payload.id);
      if (token) {
        token.previousPrice = token.price;
        token.price = action.payload.price;
        token.priceChange24h =
          ((action.payload.price - token.previousPrice) / token.previousPrice) * 100;
      }
    },
    setSortConfig: (state, action: PayloadAction<SortConfig | null>) => {
      state.sortConfig = action.payload;
    },
    setFilterConfig: (state, action: PayloadAction<FilterConfig>) => {
      state.filterConfig = action.payload;
    },
    setCategory: (
      state,
      action: PayloadAction<"new-pairs" | "final-stretch" | "migrated">
    ) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setTokens,
  setLoading,
  setError,
  updatePrice,
  setSortConfig,
  setFilterConfig,
  setCategory,
} = tokenSlice.actions;

export default tokenSlice.reducer;
