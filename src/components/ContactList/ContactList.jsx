import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import { deleteContact, selectContacts } from "../../store/contactSlice";

const ContactList = () => {
    const contacts = useSelector(selectContacts);
    const filter = useSelector((state) => state.contacts.filter);
    const dispatch = useDispatch();

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

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
