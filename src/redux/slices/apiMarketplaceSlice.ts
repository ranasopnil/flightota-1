import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Marketplace UI state that must survive navigation between pages:
 * the API comparison tray. Search filters live in the URL instead
 * (shareable and crawlable), so they are not duplicated here.
 */
export const MAX_COMPARE = 3;

export interface ApiMarketplaceState {
  compare: string[];
  compareOpen: boolean;
}

const initialState: ApiMarketplaceState = {
  compare: [],
  compareOpen: false,
};

const apiMarketplaceSlice = createSlice({
  name: "apiMarketplace",
  initialState,
  reducers: {
    compareToggled(state, action: PayloadAction<string>) {
      const slug = action.payload;
      if (state.compare.includes(slug)) {
        state.compare = state.compare.filter((s) => s !== slug);
      } else if (state.compare.length < MAX_COMPARE) {
        state.compare.push(slug);
      }
    },
    compareRemoved(state, action: PayloadAction<string>) {
      state.compare = state.compare.filter((s) => s !== action.payload);
    },
    compareCleared(state) {
      state.compare = [];
      state.compareOpen = false;
    },
    compareOpenChanged(state, action: PayloadAction<boolean>) {
      state.compareOpen = action.payload;
    },
  },
  selectors: {
    selectCompare: (state) => state.compare,
    selectCompareOpen: (state) => state.compareOpen,
  },
});

export const { compareToggled, compareRemoved, compareCleared, compareOpenChanged } = apiMarketplaceSlice.actions;
export const { selectCompare, selectCompareOpen } = apiMarketplaceSlice.selectors;
export default apiMarketplaceSlice;
