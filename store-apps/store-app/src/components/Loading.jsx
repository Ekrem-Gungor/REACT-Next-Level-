import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ message = "Loading..." }) {
  return (
    <>
      <Backdrop open={true} invisible={false}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="primary.dark" />
          <Typography
            variant="h4"
            sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
          >
            {message}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
