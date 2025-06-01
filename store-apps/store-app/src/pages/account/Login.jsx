import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./accountSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleFrom(data) {
    dispatch(loginUser(data));
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Avatar
          sx={{
            mx: "auto",
            mb: 2,
            color: "error.main",
            backgroundColor: "lightgray",
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFrom)}
          noValidate
          sx={{ mb: 2 }}
        >
          <TextField
            {...register("username", {
              required: "UserName is must required",
              minLength: {
                value: 3,
                message: "Username must be minimum 3 characters",
              },
            })}
            label="Enter UserName"
            size="small"
            fullWidth
            autoFocus
            helperText={errors.username?.message}
            sx={{ mb: 2 }}
            error={!!errors.username}
          />

          <TextField
            {...register("password", {
              required: "Password is must required",
              minLength: {
                value: 5,
                message: "Password must be minimum 5 characters",
              },
            })}
            type="password"
            label="Enter Password"
            size="small"
            fullWidth
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
            error={!!errors.password}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid}
            color="error"
            type="submit"
            loading={status === "pending"}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
