import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { currenyTRY } from "../../utils/formats";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import request from "../../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, deleteItemFromCart, setCart } from "./cartSlice";
import { Link } from "react-router";

export default function CartPage() {
  const { cart, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subTotal = cart?.cartItems.reduce(
    (toplam, item) => toplam + item.product.price * item.product.quantity,
    0
  );

  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde henüz ürün yok..</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 10 }}>#</TableCell>
              <TableCell sx={{ width: 50 }}>Ürün Görseli</TableCell>
              <TableCell sx={{ width: 120 }}>Ürün</TableCell>
              <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
              <TableCell sx={{ width: 120 }}>Adet</TableCell>
              <TableCell sx={{ width: 120 }}>Toplam</TableCell>
              <TableCell sx={{ width: 50 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.cartItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:5000/images/${item.product.image}`}
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell>{item.product.title}</TableCell>
                <TableCell>{currenyTRY.format(item.product.price)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(
                        addItemToCart({ productId: item.product.productId })
                      )
                    }
                    loading={
                      status === "pendingAddItem" + item.product.productId
                    }
                  >
                    <AddCircleOutlineIcon />
                  </Button>

                  {item.product.quantity}

                  <Button
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.product.productId,
                          quantity: 1,
                          key: "pendingDeleteItem",
                        })
                      )
                    }
                    loading={
                      status ===
                      "pendingDeleteItem" +
                        item.product.productId +
                        "pendingDeleteItem"
                    }
                  >
                    <RemoveCircleOutlineIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  {currenyTRY.format(
                    item.product.price * item.product.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.product.productId,
                          quantity: item.product.quantity,
                          key: "pendingRemoveAllItem",
                        })
                      )
                    }
                    color="error"
                    loading={
                      status ===
                      "pendingDeleteItem" +
                        item.product.productId +
                        "pendingRemoveAllItem"
                    }
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={6}>
                Ara Toplam
              </TableCell>
              <TableCell align="right" colSpan={6}>
                {currenyTRY.format(subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={6}>
                Vergi Oranı
              </TableCell>
              <TableCell align="right" colSpan={6}>
                {currenyTRY.format(tax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={6}>
                Toplam
              </TableCell>
              <TableCell align="right" colSpan={6}>
                {currenyTRY.format(total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 3 }}>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="info"
        >
          Continue Shopping
        </Button>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="error"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}
