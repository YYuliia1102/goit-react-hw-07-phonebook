import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addContact } from "../../store/contactSlice";
import { selectContacts } from "../../store/contactSlice";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "" || number.trim() === "") {
            alert("Будь ласка, заповніть всі поля форми.");
            return;
        }

        const isExistingContact = contacts.some(
            (contact) => contact.name.toLowerCase() === name.toLowerCase()
        );

        if (isExistingContact) {
            alert("Такий контакт вже існує.");
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
                    Ім'я:
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    placeholder="Yuliia Yehorova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="number" className="form-label">
                    Номер:
                </label>
                <input
                    type="tel"
                    id="number"
                    className="form-control"
                    name="number"
                    placeholder="+380(97)-000-00-00"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Додати контакт
            </button>
        </form>
    );
};

export default ContactForm;
