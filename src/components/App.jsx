import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store/store";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import css from './App.module.css';

const App = () => {
  return (
    <div className={css.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <h1>Phonebook</h1>
            <ContactForm />
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
          </div>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
