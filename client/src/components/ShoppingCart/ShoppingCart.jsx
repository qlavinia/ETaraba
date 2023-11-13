import { React, useState, useEffect } from "react";
import { shoppingCartService } from "../../services/shoppingCartService";

export default function ShoppingCart() {
  const savedCartString = localStorage.getItem("cart");
  const savedItems = savedCartString != null ? JSON.parse(savedCartString) : [];
  const [cartItems, setCartItems] = useState(savedItems);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");

  function decrementItemsNo(itemToDecrement) {
    setCartItems((initialCartItems) => {
      if (itemToDecrement.itemsInCart > 1) {
        return initialCartItems.map((i) =>
          i.product.productId === itemToDecrement.product.productId
            ? { ...i, itemsInCart: i.itemsInCart - 1 }
            : i
        );
      } else {
        return initialCartItems.filter(
          (i) => i.product.productId != itemToDecrement.product.productId
        );
      }
    });
  }

  function incrementItemsNo(itemToIncrement) {
    setCartItems((initialCartItems) => {
      return initialCartItems.map((i) =>
        i.product.productId === itemToIncrement.product.productId
          ? { ...i, itemsInCart: i.itemsInCart + 1 }
          : i
      );
    });
  }

  function deleteItem(itemToDelete) {
    setCartItems((initialCartItems) => {
      return initialCartItems.filter(
        (i) => i.product.productId != itemToDelete.product.productId
      );
    });
  }

  useEffect(() => {
    
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const saveOrder = (event) => {
    event.preventDefault();

    let errorMessages = {};

    if (!firstName) errorMessages.firstName = "First name is required";
    if (!lastName) errorMessages.lastName = "Last name is required";
    if (!phone) errorMessages.phone = "Phone is required";

    setErrors(errorMessages);

    if (Object.keys(errorMessages).length === 0) { 
      shoppingCartService
        .sendOrder(cartItems, firstName, lastName, phone)
        .then((order) => {
          console.log("order saved" + order);
          setCartItems([]);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
        </div>
      )}
      {cartItems.length == 0 && "No products added to the shopping cart"}
      {cartItems.map((item) => (
        <div key={item.product.productId}>
          Name: {item.product.name}
          <button onClick={() => decrementItemsNo(item)}>-</button>
          Quantity: {item.itemsInCart}
          <button onClick={() => incrementItemsNo(item)}>+</button>
          <button onClick={() => deleteItem(item)}>Delete Product</button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <button onClick={(e) => saveOrder(e)}>Save Order</button>
      )}
    </>
  );
}
