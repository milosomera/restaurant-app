import React from "react";
import MyContext from "./MyContext";
import { cloneDeep } from "lodash";
import axios from "axios";

class MyProvider extends React.Component {
  categories = [];

  items = [];

  orderClicked = (orderGiven) => {
    const newOrder = {
      ...orderGiven,
    };

    const orderIndex = this.state.orders.findIndex((order) => {
      return order.id === newOrder.id;
    });

    let ordersCopy = cloneDeep(this.state.orders);
    let newTotal = this.state.total + newOrder.price;

    if (orderIndex > -1) {
      ordersCopy[orderIndex].qty = ordersCopy[orderIndex].qty * 1 + 1;
      ordersCopy[orderIndex].subTotal += newOrder.price;
    } else {
      newOrder.qty = 1;
      newOrder.subTotal = newOrder.price;
      ordersCopy = [...this.state.orders, newOrder];
    }

    this.setState({
      total: newTotal,
    });
    this.setState({
      orders: ordersCopy,
    });
  };

  addItemBtn = (newItem) => {
    axios
      .post("https://restaurant-application-server.herokuapp.com/items", {
        item: newItem,
      })
      .then((res) => {
        this.setState({
          showCards: [...this.state.showCards, res.data],
        });
      });
  };

  updateItem = (item) => {
    let updatedItems = this.state.showCards.map((card) => {
      if (item._id === card._id) {
        return item;
      } else {
        return card;
      }
    });
    this.setState({
      showCards: updatedItems,
    });
  };

  removeBtn = (e) => {
    let removeItem = [...this.state.showCards];
    removeItem.map((item) => {
      if (e.target.id === item._id) {
        removeItem.splice(removeItem.indexOf(item), 1);
      }
      return removeItem;
    });
    this.setState({
      showCards: removeItem,
    });
    axios.delete(
      "https://restaurant-application-server.herokuapp.com/items/" + e.target.id
    );
  };

  qtyChangeHandler = (id, qty) => {
    let ordersCopy = cloneDeep(this.state.orders);
    let newTotal = 0;
    ordersCopy = ordersCopy.map((order) => {
      if (order.id === id) {
        order.qty = qty;
        order.subTotal = order.price * qty;
      }
      newTotal += order.subTotal;
      return order;
    });
    this.setState({
      orders: ordersCopy,
      total: newTotal,
    });
  };

  checkoutBtn = () => {
    axios
      .post("https://restaurant-application-server.herokuapp.com/orders", {
        total: this.state.total,
        items: this.state.orders,
      })
      .then((res) => {
        alert("Order successful");
        this.setState({
          orders: [],
        });
      });
  };

  userCredential = (username, password) => {
    this.setState({
      user: {
        username: username,
        password: password,
        role: "Admin",
      },
    });
    axios
      .post("https://restaurant-application-server.herokuapp.com/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.error) {
          alert("Invalid username/password");
        } else {
          localStorage.setItem("appUser", JSON.stringify(res.data));
          this.userLogin();
        }
      });
  };

  userLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  logout = () => {
    localStorage.removeItem("appUser");
    this.setState({
      isLoggedIn: false,
    });
  };

  state = {
    orders: [],
    total: 0,
    showCards: [...this.items],
    categories: this.categories,
    orderClicked: this.orderClicked,
    qtyChangeHandler: this.qtyChangeHandler,
    checkoutBtn: this.checkoutBtn,
    addItemBtn: this.addItemBtn,
    removeBtn: this.removeBtn,
    updateItem: this.updateItem,
    userCredential: this.userCredential,
    userLogin: this.userLogin,
    logout: this.logout,
    drinkArr: this.drinkArr,
    foodArr: this.foodArr,
    user: JSON.parse(localStorage.getItem("appUser")),
    isLoggedIn: localStorage.getItem("appUser") ? true : false,
  };

  componentDidMount() {
    axios("https://restaurant-application-server.herokuapp.com/items").then(
      (res) => {
        let items = res.data;
        this.setState({
          showCards: items,
        });
      }
    );
    axios(
      "https://restaurant-application-server.herokuapp.com/categories"
    ).then((res) => {
      this.categories = res.data;
      let categories = res.data;
      this.setState({
        categories: categories,
      });
    });
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
