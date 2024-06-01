import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket, TicketsState } from 'types';
import { RootState } from '../store';

const initialState: TicketsState = {
  tickets: [],
  filters: ["all"],
  sort: 'cheapest',
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const response = await axios.get('data.json');
  return response.data;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      if (state.filters.includes(action.payload)) {
        state.filters = state.filters.filter(filter => filter !== action.payload);
      } else {
        state.filters.push(action.payload);
      }
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    });
  },
});

export const { setFilter, setSort } = ticketsSlice.actions;
export const selectTickets = (state: RootState) => state.tickets;

export default ticketsSlice.reducer;
