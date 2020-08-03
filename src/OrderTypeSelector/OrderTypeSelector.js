import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import MyContext from '../MyContext';

const OrderTypeSelector = (props) => {

  const {categories} = useContext(MyContext);

  const options = categories.map((category) => {
    return (
      <button className="btn" key={category.name}>
        <Link to={"/" + category.name}>{category.name}</Link>
      </button>
    );
  });

  return (
    <div className="OrderTypeSelector">
      {options}
    </div>
  );
}

export default OrderTypeSelector;