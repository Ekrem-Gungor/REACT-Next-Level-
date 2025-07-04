import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router";
import { currenyTRY } from "../utils/formats";
import request from "../api/apiClient";
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, setCart } from "../pages/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.cart);
  return (
    <>
      <Card>
        <CardActionArea component={Link} to={`/products/${product.id}`}>
          <CardMedia
            sx={{ height: 180, backgroundSize: "contain" }}
            image={`http://localhost:5000/images/${product.image}`}
          />
          <CardContent>
            <Typography
              sx={{
                textAlign: "center",
              }}
              gutterBottom
              variant="h6"
              component="h2"
              color="info.dark"
            >
              {product.title}
            </Typography>
            <Typography variant="body1" color="error.dark">
              {currenyTRY.format(product.price)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton>
            {/* <FavoriteIcon />  */}
            <FavoriteBorderIcon />
          </IconButton>
          <Button
            onClick={() => dispatch(addItemToCart({ productId: product.id }))}
            endIcon={<AddIcon />}
            loading={status === "pendingAddItem" + product.id}
            loadingPosition="end"
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
