import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

function ProductDetail() {
  const { productId } = useParams();

  return <div className={styles.container}>{productId}</div>;
}

export default ProductDetail;
