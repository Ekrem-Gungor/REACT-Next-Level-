import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("cardname", {
              required: "cardname is must required",
              minLength: {
                value: 3,
                message: "cardname must be minimum 3 characters",
              },
            })}
            label="Enter Card Name"
            size="small"
            fullWidth
            autoFocus
            helperText={errors.cardname?.message}
            sx={{ mb: 2 }}
            error={!!errors.cardname}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("cardnumber", {
              required: "cardnumber is must required",
              minLength: {
                value: 3,
                message: "cardnumber must be minimum 3 characters",
              },
            })}
            label="Enter Card Number"
            size="small"
            fullWidth
            helperText={errors.cardnumber?.message}
            sx={{ mb: 2 }}
            error={!!errors.cardnumber}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("expirydate", {
              required: "expirydate is must required",
            })}
            label="Enter Expiry Date"
            size="small"
            fullWidth
            helperText={errors.expirydate?.message}
            sx={{ mb: 2 }}
            error={!!errors.expirydate}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("cvv", {
              required: "cvv is must required",
            })}
            label="Enter CVV"
            size="small"
            fullWidth
            helperText={errors.cvv?.message}
            sx={{ mb: 2 }}
            error={!!errors.cvv}
          />
        </Grid>
      </Grid>
    </>
  );
}
