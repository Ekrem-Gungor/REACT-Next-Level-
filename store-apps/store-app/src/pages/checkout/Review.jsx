import { Box, Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Review() {
  const { getValues } = useFormContext();
  return (
    <Stack spacing={2} sx={{ mb: 3 }} divider={<Divider />}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Teslimat bilgileri
        </Typography>
        <Typography gutterBottom>
          Ad Soyad : {getValues("firstname")} {getValues("lastname")}
        </Typography>
        <Typography gutterBottom>Telefon : +90 {getValues("phone")}</Typography>
        <Typography gutterBottom>
          Adres : {getValues("address")} - {getValues("city")}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Ödeme bilgileri
        </Typography>
        <Typography gutterBottom>Cart Adı : {getValues("cardname")}</Typography>
        <Typography gutterBottom>No : {getValues("cardnumber")}</Typography>
        <Typography gutterBottom>SKT : {getValues("expirydate")}</Typography>
      </Box>
    </Stack>
  );
}
