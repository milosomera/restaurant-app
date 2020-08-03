import React from 'react';
import { Link } from "react-router-dom";

const MenuCard = (props) =>{

  return (
    <div className="MenuCard">
      <img className="food" src={props.image} alt="food" />
      <div className="MenuCardDetails">
        <h4>{props.name}</h4>
        <p> PHP {props.price}</p>
        <button id={props.name} className="btn" type="button" onClick={props.click}>Order</button>
        <button id={props.id} className="btn" type="button" onClick={props.remove}>Remove</button>
        <button id={props.id} className="btn" type="button"><Link to={"/edit-form/" + props.name}>Edit</Link></button>
      </div>
    </div>
  );
}

export default MenuCard;