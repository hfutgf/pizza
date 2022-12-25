import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PizzaSliceState {
  pizzas: [];
  status: string;
}
export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

type ParamsType = {
  category: string;
  search: string;
  sortBy: string;
  pageCount: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export const fetchPizzas = createAsyncThunk<Pizza[], ParamsType>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, sortBy, pageCount } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://638109d3786e112fe1c11c3d.mockapi.io/pizzas?page=${pageCount}&limit=4${category}${sortBy}${search}&order=desc`
    );
    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state: { pizzas: Pizza[] }, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
    setIsLoading(state, action) {
      state.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(
      fetchPizzas.pending,
      (
        state: { pizzas: Pizza[]; status: string },
        action: PayloadAction<any>
      ) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const { setItems, setIsLoading } = pizzaSlice.actions;
export default pizzaSlice.reducer;
