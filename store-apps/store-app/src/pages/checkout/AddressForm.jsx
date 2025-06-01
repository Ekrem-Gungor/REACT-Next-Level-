import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // stepper içerisinde useFormContext kullanarak form verilerine erişiyoruz
  // useFormContext, FormProvider ile sarmalanmış bir formun içindeki tüm form verilerine erişim sağlar
  // bu sayede formun her yerinde aynı form verilerini kullanabiliriz
  // stepper içerisindeki diğer adımlarda da bu form verilerini saklayabiliriz
  // bu sayede form verilerini adım adım ilerlerken kaybetmeyiz
  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("firstname", {
              required: "firstname is must required",
              minLength: {
                value: 3,
                message: "firstname must be minimum 3 characters",
              },
            })}
            label="Enter FirstName"
            size="small"
            fullWidth
            autoFocus
            helperText={errors.firstname?.message}
            sx={{ mb: 2 }}
            error={!!errors.firstname}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("lastname", {
              required: "lastname is must required",
              minLength: {
                value: 3,
                message: "lastname must be minimum 3 characters",
              },
            })}
            label="Enter LastName"
            size="small"
            fullWidth
            helperText={errors.lastname?.message}
            sx={{ mb: 2 }}
            error={!!errors.lastname}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("phone", {
              required: "phone is must required",
            })}
            label="Enter Phone"
            size="small"
            fullWidth
            helperText={errors.phone?.message}
            sx={{ mb: 2 }}
            error={!!errors.phone}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("city", {
              required: "city is must required",
            })}
            label="Enter City"
            size="small"
            fullWidth
            helperText={errors.city?.message}
            sx={{ mb: 2 }}
            error={!!errors.city}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            {...register("address", {
              required: "address is must required",
            })}
            label="Enter Address"
            size="small"
            fullWidth
            multiline
            rows={4}
            helperText={errors.address?.message}
            sx={{ mb: 2 }}
            error={!!errors.address}
          />
        </Grid>
      </Grid>
    </>
  );
}
