import React, { useContext } from 'react'
import CartItem from './CartItem';
import MyContext from '../MyContext';


const OrderCart = (props) => {

  const {orders} = useContext(MyContext);
  const {total} = useContext(MyContext);
  const {checkoutBtn} = useContext(MyContext);
   
  let items =  null;
  let itemTotal = null;

  if (orders.length > 0) {
    items = orders.map(order => {
      return (
        <CartItem order={order} key={order._id} input={props.input}/>
      );
    });

    itemTotal = (
      <div>
        <hr />
        <div className="orderTotal">
          Total: <span>{total} PHP</span>
        </div>
      </div>
    );

  }

  return (
    <div className="OrderCart">
      <h2>Cart</h2>
      <div className="orders">{items}</div>
      {itemTotal}
      {
        itemTotal !== null ?
        <button onClick={checkoutBtn}>Checkout</button> :
        ""
      }
    </div>
  );
}

export default OrderCart;