import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditItem extends React.Component {

    state = {
        itemName: this.props.item.name,
        itemPrice: this.props.item.price,
        itemImage: this.props.item.image
    }

    nameChangeBtn = (e) => {
        this.setState({
            itemName: e.target.value
        });
    }

    priceChangeBtn = (e) => {
        this.setState({
            itemPrice: e.target.value * 1
        })
    }
    imageChangeBtn = (e) => {
        this.setState({
            itemImage: e.target.value
        })
    }

    submitEditBtn = () => {
        axios.put("http://localhost:8080/items/" + this.props.item._id, {
            name: this.state.itemName,
            price: this.state.itemPrice,
            image: this.state.itemImage
        }).then((res) => {
            this.props.updateItem(res.data);
        })
    }

    render() {

        return(
            <div className="edit-item">
                <div className="edit">
                    <span>Name:</span> <input type="text" value={this.state.itemName} onChange={this.nameChangeBtn}/>
                </div>
                <div className="edit">
                    <span>Price:</span> <input type="number" value={this.state.itemPrice} onChange={this.priceChangeBtn}/>
                </div>
                <div className="edit">
                    <span>Image:</span> <input type="text" value={this.state.itemImage} onChange={this.imageChangeBtn}/>
                </div>
                <button id={this.props.item._id} onClick={this.submitEditBtn}>
                    <Link to="/item-edited">Submit</Link>
                </button>
            </div>
        )

    }
}

export default EditItem;