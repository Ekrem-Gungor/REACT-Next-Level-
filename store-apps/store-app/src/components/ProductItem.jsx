import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { currenyTRY } from "../utils/formats";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import AddIcon from "@mui/icons-material/Add";

export default function ProductItem({
  product,
  handleAddItem,
  cartItem,
  isAdding,
}) {
  const cartItemCount = cartItem?.product.quantity;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 3 } }}>
          <img
            src={`http://localhost:5000/images/${product.image}`}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            alt={product.title}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 3 } }}>
          <Typography
            component="h1"
            variant="h5"
            color="textPrimary"
            sx={{ fontSize: { xs: "1.2rem", sm: "2rem" } }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="textPrimary"
            sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="h6"
            color="error"
            sx={{ mt: 2, fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
          >
            {currenyTRY.format(product.price)}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            gap={2}
            sx={{ mt: 2 }}
          >
            <Button
              onClick={() => handleAddItem(product.id)}
              variant="contained"
              color="error"
              fullWidth={true}
              sx={{ maxWidth: { sm: 200 } }}
              endIcon={<AddIcon />}
              loading={isAdding}
              loadingPosition="end"
            >
              Add To Cart
            </Button>

            {cartItemCount > 0 && (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <InfoOutlineIcon color="error" /> {cartItem.product.title}{" "}
                ürününden sepetinizde {cartItemCount} adet ürün bulunmaktadır.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
