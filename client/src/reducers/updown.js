
import React, { useState } from 'react';
const initialState = false;
// const [pay,setPay]=useState(false);
const changeTheNumber = (state = initialState, action) => {
    switch (action.type) {
        case "SET": state=action.payload;
        case "GET": return state;
        default: return state;
    }
}

export default changeTheNumber;