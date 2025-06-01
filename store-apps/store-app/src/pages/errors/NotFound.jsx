import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function NotFoundPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Not Found Error
      </Typography>
      <Alert severity="warning">
        Aradığın şeyi bulamadım. Sanırım Yolunu kaybettin.
      </Alert>

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
