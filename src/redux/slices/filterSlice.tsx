import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HTMLProps } from "react";

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sort?: { name: string; sortProperty: string };
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{ name: string; sortProperty: string }>
    ) {
      state.sort = action.payload;
    },
    setPageCount(state, action:PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action:PayloadAction<FilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setPageCount,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
