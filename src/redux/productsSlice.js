import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    ITEMS: [],
    STATE: 'IDLE',
    error: null,
    page: 1,
    perPage: 10,
    totalPages: 1,
    currentProduct: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async({page, perPage}) => {
        const skip = (page -1) * perPage
        const response = await axios.get(`https://dummyjson.com/products`, {
            params: {skip, page, limit: perPage},
        })
        return response.data;
    }
);
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        return response.data;
    }
);
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.STATE = 'PENDING';

        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.STATE = 'SUCCESS';
            state.ITEMS = action.payload.products;
            state.totalPages = Math.ceil(action.payload.total / state.perPage)
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.STATE = 'FAILIURE';
            state.error = action.error.message;
        })
        .addCase(fetchProductById.pending, (state) => {
            state.STATE = 'PENDING';
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.STATE = 'SUCCESS';
            state.currentProduct = action.payload;  
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.STATE = 'FAILIURE';
            state.error = action.error.message;
        })
    }
})
export const{ setPage, addToCart } = productsSlice.actions;
export default productsSlice.reducer;
