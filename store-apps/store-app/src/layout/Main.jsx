import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { Bounce, ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Navbar />
      <Container sx={{ marginTop: 5 }}>
        <Outlet />
      </Container>
    </>
  );
}
