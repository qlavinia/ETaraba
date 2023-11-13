import React, { useState, useEffect } from "react";
import { productsService } from "../../services/productsService";
import { Outlet, Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsService.getProducts();
        setProducts(response);
        setLoading(false);
      } catch (exception) {
        console.error(exception);
        setError(exception);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  function addToCart(productToAdd) {
    setCartItems((initialCartItems) => {
      const existingProduct = initialCartItems.find(
        (item) => item.product.productId === productToAdd.productId
      );
      if (existingProduct) {
        return initialCartItems.map((item) =>
          item.product.productId === productToAdd.productId
            ? { ...item, itemsInCart: item.itemsInCart + 1 }
            : item
        );
      } else {
        return [...initialCartItems, { product: productToAdd, itemsInCart: 1 }];
      }
    });
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <input
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredProducts.map((product) => (
          <div key={product.productId}>
            {product.name} {product.price}
            <Link to={`/products/${product.productId}`}>View Details</Link>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default ProductList;
