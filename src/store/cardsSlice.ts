import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Card = {
  id: string;
  title: string;
};

type CardsState = {
  cards: Card[];
};

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    logText: () => {
      console.log(1);
    },
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
});

export const { addCard, removeCard, logText } = cardsSlice.actions;
export default cardsSlice.reducer;
