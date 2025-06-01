import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function ServerErrorPage() {
  const { state } = useLocation();
  return (
    <Paper sx={{ p: 3 }}>
      {state?.error ? (
        <>
          <Typography variant="h4" gutterBottom>
            {state.error.message} - {state.status}
          </Typography>
          <Alert severity="error">
            {state.error.details || "Bilinmeyen bir hata meydana geldi!"}
          </Alert>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Server Error
          </Typography>
          <Alert severity="error">Bilinmeyen bir hata meydana geldi!</Alert>
        </>
      )}
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="info"
        sx={{ mt: 2 }}
      >
        Anasayfa
      </Button>
    </Paper>
  );
}
