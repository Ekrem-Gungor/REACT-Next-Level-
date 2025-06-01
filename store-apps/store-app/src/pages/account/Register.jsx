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
import request from "../../api/apiClient";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./accountSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const validateEmailRegex = /^\S+@\S+\.\S+$/;

  function handleFrom(data) {
    dispatch(registerUser(data));
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
          Register
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
            sx={{ mb: 2 }}
            helperText={errors.username?.message}
            error={!!errors.username}
          />

          <TextField
            {...register("email", {
              required: "Email is must required",
              pattern: {
                value: validateEmailRegex,
                message:
                  "E-mail should be in the right format. Orn: example@gmail.com",
              },
            })}
            label="Enter Email"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            helperText={errors.email?.message}
            error={!!errors.email}
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
            sx={{ mb: 2 }}
            helperText={errors.password?.message}
            error={!!errors.password}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            color="error"
            type="submit"
            disabled={!isValid}
            loading={status === "pending"}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
