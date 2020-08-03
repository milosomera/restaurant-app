import React, { useContext } from "react";
import MenuCard from "./MenuCard";
import MyContext from "../MyContext";

const MenuCardContainer = (props) => {

    const {orderClicked} = useContext(MyContext);
    const {removeBtn} = useContext(MyContext);

    let MenuCards = props.showCards.map((item) => {
        return (
            <MenuCard
            key={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            id={item._id}
            click={() => orderClicked(item)}
            remove={removeBtn}
            />
        );
    });

    return(
        <React.Fragment>
            {MenuCards}
        </React.Fragment>
    )

}

export default MenuCardContainer;