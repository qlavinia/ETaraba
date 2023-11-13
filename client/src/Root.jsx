import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductList from "./components/ProductList/ProductList";
import Product from "./components/ProductDetail/ProductDetails";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="products" element={<ProductList />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="shoppingCart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
