import React from "react";
import PropTypes from "prop-types";

const ContactItem = ({ contact, onDeleteContact }) => {
    const handleDeleteClick = () => {
        onDeleteContact(contact.id);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {contact.name} - {contact.number}
            <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
                Delete
            </button>
        </li>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
