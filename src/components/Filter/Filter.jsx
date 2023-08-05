import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/contactSlice";

const Filter = () => {
    const dispatch = useDispatch();

    const handleFilterChange = (event) => {
        dispatch(setFilter(event.target.value));
    };

    return (
        <div>
            <input type="text" onChange={handleFilterChange} />
        </div>
    );
};

export default Filter;
