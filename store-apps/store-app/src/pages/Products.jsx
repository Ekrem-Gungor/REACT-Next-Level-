import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import request from "../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "./catalog/catalogSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const loadedProducts = useSelector(selectAllProducts);
  const { status, isloaded } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (!isloaded) dispatch(fetchProducts());
  }, [isloaded]);

  if (status === "pendingFetchProducts") {
    return <Loading />;
  }

  return <ProductList products={loadedProducts} />;
}
