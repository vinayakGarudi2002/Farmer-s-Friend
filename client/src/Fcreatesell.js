import React from 'react'
import CreateSell from './Pages/CreateSell';
import { useSelector, useDispatch } from "react-redux";
const Fcreatesell = () => {

    const changeTheNumber = useSelector(state => state.changeTheNumber);
        console.log(changeTheNumber)
  return (
    <CreateSell prams={changeTheNumber} />
  )
}

export default Fcreatesell