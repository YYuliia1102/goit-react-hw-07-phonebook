import { createSlice } from "@reduxjs/toolkit";
// import contactsData from "../components/СontactsData/СontactsData";

const initialState = {
    contacts: [],
    filter: "",
};

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        deleteContact: (state, action) => {
            const id = action.payload;
            state.contacts = state.contacts.filter((contact) => contact.id !== id);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addContact, deleteContact, setFilter } = contactSlice.actions;

// Створення селектора за допомогою createSelector
export const selectContacts = (state) => state.contacts.contacts;

export default contactSlice.reducer;
