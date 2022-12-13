import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, sortBy, pageCount } = params;
    const { data } = await axios.get(
      `https://638109d3786e112fe1c11c3d.mockapi.io/pizzas?page=${pageCount}&limit=4${category}${sortBy}${search}&order=desc`
    );
     return data;
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.pizzas = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems, setIsLoading } = pizzaSlice.actions;
export default pizzaSlice.reducer;
