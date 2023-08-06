import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addContact, selectFilteredContacts } from "../../store/contactSlice";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const dispatch = useDispatch();
    const filteredContacts = useSelector(selectFilteredContacts);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || number.trim() === "") {
            alert("Please fill in all form fields.");
            return;
        }

        const isExistingContact = filteredContacts.some(
            (contact) => contact.name.toLowerCase() === name.toLowerCase()
        );

        if (isExistingContact) {
            alert("This contact already exists.");
            return;
        }

        const newContact = { id: nanoid(), name, number };
        dispatch(addContact(newContact));
        setName("");
        setNumber("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="number" className="form-label">
                    Number:
                </label>
                <input
                    type="tel"
                    id="number"
                    className="form-control"
                    name="number"
                    placeholder="+1-123-456-7890"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Add Contact
            </button>
        </form>
    );
};

export default ContactForm;
