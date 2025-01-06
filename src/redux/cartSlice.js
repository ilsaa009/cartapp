import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ITEMS: [],
    TOTAL_PRICE: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const {id, title, price} = action.payload;
            const existingItem = state.ITEMS.find(item => item.id === id);

            if(existingItem) {
                existingItem.quantity += 1
            }
            else{
                state.ITEMS.push({ id, title, quantity : 1, price});
            }

            state.TOTAL_PRICE = state.ITEMS.reduce((total, item) => total + item.quantity * item.price, 0);
        },
        removeFromCart: (state, action) => {
            state.ITEMS = state.ITEMS.filter(item => item.id !== action.payload);

            state.TOTAL_PRICE = state.ITEMS.reduce((total, item) => total + item.quantity * item.price, 0);
        }
    }
})

export const { addtoCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;