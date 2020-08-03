import React from "react";

class AddItem extends React.Component {

    state = {
        name: "",
        price: 0,
        category: "Food",
        image: ""
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    priceChangeHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    categoryChangeHandler = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    imageChangeHandler = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    addItemBtnHandler = () => {
        let newItem = {
            name: this.state.name,
            price: this.state.price,
            category: this.state.category,
            image: this.state.image
        }
        this.props.addItemBtn(newItem);
        this.setState({
            name: "",
            price: 0,
            image: ""
        })
    }
    
    render() {

        let options = this.props.categories.map(category => {
            return(
                <option key={category.name} value={category}>{category.name}</option>
            )
        })

        return(
            <div className="add-item">
                <h4>Add Item</h4>
                <label>Name: </label>
                <input type="text" onChange={this.nameChangeHandler} value={this.state.name}/><br/>
                <label>Price: </label>
                <input type="number" onChange={this.priceChangeHandler} value={this.state.price}/><br/>
                <label>Category: </label>
                <select onChange={this.categoryChangeHandler}>
                    {options}
                </select>
                <label>Image: </label>
                <input type="text" onChange={this.imageChangeHandler} value={this.state.image}/><br/>
                <button type="button" onClick={this.addItemBtnHandler}>Submit</button>
            </div>
        )

    }

}

export default AddItem;