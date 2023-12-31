import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import { fetchContacts, deleteContact, selectFilteredContacts } from "../../store/contactSlice";

const ContactList = () => {
    const dispatch = useDispatch();
    const filteredContacts = useSelector(selectFilteredContacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };

    return (
        <ul>
            {filteredContacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                    onDeleteContact={handleDeleteContact}
                />
            ))}
        </ul>
    );
};

export default ContactList;
