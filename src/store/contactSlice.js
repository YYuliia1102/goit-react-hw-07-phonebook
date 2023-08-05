import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    contacts: {
        items: [],
        isLoading: false,
        error: null,
    },
    filter: "",
};

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    try {
        const response = await axios.get("https://64ce0e610c01d81da3ee7a5d.mockapi.io/contacts");
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact) => {
    try {
        const response = await axios.post("https://64ce0e610c01d81da3ee7a5d.mockapi.io/contacts", contact);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
    try {
        await axios.delete(`https://64ce0e610c01d81da3ee7a5d.mockapi.io/contacts/${id}`);
        return id;
    } catch (error) {
        throw error;
    }
});

export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.contacts.filter;

export const selectVisibleContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        if (!contacts || !filter) {
            return [];
        }

        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
);


const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.contacts.isLoading = true;
                state.contacts.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts.items = action.payload;
                state.contacts.isLoading = false;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.error = action.error.message;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.items = [...state.contacts.items, action.payload];
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts.items = state.contacts.items.filter((contact) => contact.id !== action.payload);
            });

    },
});

export const { setFilter } = contactSlice.actions;
export default contactSlice.reducer;