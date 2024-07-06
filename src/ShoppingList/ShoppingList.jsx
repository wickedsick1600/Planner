import { useState } from "react";
import styles from './ShoppingList.module.css'

function ShoppingList(){

    const[item, setItem] = useState([{name:"Potatoes", quantity:5, unit:"pcs" }, {name:"Tomatoes", quantity: 5, unit:"pcs"}, {name:"Garlic", quantity:5, unit:"pcs"}]);
    const[newItem, setNewItem] = useState("");
    let[quantity, setQuantity] = useState("");

    // Add Task Function
    function addItem(event){
        event.preventDefault();
        let unit = document.getElementById("selectedUnit");
        let display = unit.options[unit.selectedIndex].text;

        if (newItem !== "" && quantity !== ""){
            setItem(i => [...i, {name: newItem, quantity: quantity, unit: display}])
        }
        

        setNewItem("");
        setQuantity("");
    }
    // Add Button function
    function addQuan(index) {
        setItem(i =>
            i.map((item, idx) =>
                idx === index ? { ...item, quantity: parseInt(item.quantity) + 1 } : item
            )
        );
    }
    // Subtract button function
    function subtractQuan(index){
        setItem(i => 
            i.map((item, idx) => 
                idx === index ? {... item, quantity: item.quantity > 0 ? item.quantity - 1 : 0} : item
            )
        )
    }
    function removeItem(index){
        setItem(i => i.filter((_, idx) => idx != index))
    }

    return(
    <div className={styles.shoppingListCont}>
        <form onSubmit={addItem}>
            <h1>SHOPPING LIST</h1>
            <input type="number" min="1" style={{width: "50px"}} placeholder="No." onChange={(event) => setQuantity(event.target.value)} value={quantity} required/>
            <select id="selectedUnit" placeholder="Select a unit">
                <option value="pcs">PCS</option>
                <option value="liters">L</option>
                <option value="grams">G</option>
                <option value="kilograms">Kg</option>
                <option value="boxes">Bx</option>
            </select>
            <input type="text" placeholder="Enter a product" onChange={(event) => setNewItem(event.target.value)} value={newItem} required/>
            <button type="submit">Add to Cart </button>
        </form>
        <div className={styles.cartList}>
            <div className={styles.header}>
                <span>QUANTITY</span>
                <span>UNIT</span>
                 <span>PRODUCT</span>          
            </div>     
            {item.map((i, index) => 
            <div key={index} className={styles.itemRow}>
                <div className={styles.quantityContainer}>
                <span style={{margin: "5px"}}>{i.quantity}</span>
                    <div className={styles.buttonContainer}>
                        <button className={styles.quanBtnAdd} onClick={() => addQuan(index)}>+</button>
                        <button className={styles.quanBtnSubt} onClick={() => subtractQuan(index)}>-</button>
                    </div>
                </div>
                <span>{i.unit}</span>
                <span>{i.name}<button className={styles.removeBtn} onClick={() => removeItem(index)}>Remove Item</button></span>
            </div>
                )}
        </div>  
    </div>);
}
export default ShoppingList