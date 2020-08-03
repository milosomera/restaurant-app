import React, {useContext} from "react";
import MyContext from "../MyContext";

const CartItem = (props) => {

    const {qtyChangeHandler} = useContext(MyContext);

    let inputChangeHandler = (e) => {
       qtyChangeHandler(props.order.id, (e.target.value * 1));
    }

    return(
        <div className="orderChosen" key={props.order.id}>
            <span>{props.order.name}</span>
            <input type="number" value={props.order.qty} onChange={inputChangeHandler}/>
            <span>{props.order.subTotal} PHP</span>
        </div>
    )

}

export default CartItem;