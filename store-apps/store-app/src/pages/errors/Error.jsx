import {
  Alert,
  AlertTitle,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import request from "../../api/apiClient";
import { useState } from "react";

export default function ErrorPage() {
  const [validationError, setValidationError] = useState({});

  function getValidationErrors() {
    request.errors.get403Error().catch((data) => {
      setValidationError(data);
    });
  }

  return (
    <Box>
      {validationError && validationError.errors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>{validationError.message}</AlertTitle>
          <List>
            {validationError.errors.map((error, index) => (
              <ListItem key={index}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}

      <Button
        sx={{ m: 2 }}
        variant="outlined"
        color="error"
        onClick={() => request.errors.get400Error()}
      >
        Bad Request
      </Button>

      <Button
        sx={{ mr: 2 }}
        variant="outlined"
        color="error"
        onClick={() => request.errors.get401Error()}
      >
        UnAuthorized
      </Button>

      <Button
        sx={{ mr: 2 }}
        variant="outlined"
        color="error"
        onClick={getValidationErrors}
      >
        Validation Error
      </Button>

      <Button
        sx={{ mr: 2 }}
        variant="outlined"
        color="error"
        onClick={() => request.errors.get404Error()}
      >
        Not Found
      </Button>

      <Button
        sx={{ mr: 2 }}
        variant="outlined"
        color="error"
        onClick={() => request.errors.get405Error()}
      >
        Server Error
      </Button>
    </Box>
  );
}
