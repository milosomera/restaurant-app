import React from "react";
import { Link } from "react-router-dom";

const EditSuccessful = () => {

    return(
        <div id="edit-success">
            <h2>
                Item has been edited successfully
            </h2>
            <button className="btn"><Link to="/">OK</Link></button>
        </div>
    )

}

export default EditSuccessful;