import React, { useContext } from 'react';
import './App.css';
import OrderTypeSelector from './OrderTypeSelector/OrderTypeSelector';
import OrderCart from './OrderCart/OrderCart';
import MenuCardContainer from './MenuCard/MenuCardContainer';
import { Link, useHistory } from "react-router-dom";
import { Route } from 'react-router';
import MyContext from './MyContext';
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import EditSuccessful from './EditSuccessful';
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import LoginForm from "./LoginForm/LoginForm";

const App = () => {

  const {
    showCards, 
    categories,
    updateItem, 
    user,
    userCredential,
    addItemBtn,
    isLoggedIn,
    userLogin,
    logout
  } = useContext(MyContext);

  const history = useHistory();
    
  const drinkArr = showCards.filter(item => {
    return item.category === "Drink"
  })

  const foodArr = showCards.filter(item => {
    return item.category === "Food"
  })

  const editForm = showCards.map(item => {
    return <Route path={"/edit-form/" + item.name} key={item._id}>
            <EditItem item={item} updateItem={updateItem}/>
          </Route>
  })

  return (
    <div className="App">
      <h1>
        Restaurant App
        {isLoggedIn ? 
        <Link to="/register"><button className="btn" onClick={() => {logout(); history.push("/register")}}>Logout</button></Link> : 
        ""}
      </h1>
      {
        isLoggedIn ?
        <div>
          <OrderTypeSelector/>
          <div className="restaurant">
            <div className="menu">
              <Route path="/" exact>
                <MenuCardContainer showCards={showCards}/>
              </Route>
              <Route path="/All">
                <MenuCardContainer showCards={showCards}/>
              </Route>
              <Route path="/Food">
                <MenuCardContainer showCards={foodArr}/>
              </Route>
              <Route path="/Drink">
                <MenuCardContainer showCards={drinkArr}/>
              </Route>
              {editForm}
              <Route path="/item-edited">
                <EditSuccessful/>
              </Route>
            </div>          
            <OrderCart/> 
            <AddItem addItemBtn={addItemBtn} categories={categories}/>
          </div>
        </div> :
        <div>
          <Route path="/register">            
            <RegistrationForm userCredential={userCredential}/>
          </Route>
          <Route path="/login">
            <LoginForm user={user} userCredential={userCredential} userLogin={userLogin}/>
          </Route>
        </div>
      }
    </div>
  );

}

export default App;
