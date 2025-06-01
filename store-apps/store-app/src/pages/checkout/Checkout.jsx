import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import request from "../../api/apiClient";
import { clearCart } from "../cart/cartSlice";

const steps = ["Delivery Information", "Payment", "Order summary"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handlePrevious() {
    setActiveStep(activeStep - 1);
  }

  async function handleNext(data) {
    if (activeStep === 2) {
      setLoading(true);
      try {
        const result = await request.orders.createOrder(data);
        setOrderId(result.orderId);
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper>
        <Grid container spacing={3}>
          {activeStep !== steps.length && (
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{
                p: 3,
                borderColor: "divider",
                borderBottom: { xs: "1px solid", md: "none" },
                borderRight: { xs: "none", md: "1px solid" },
              }}
            >
              <Info />
            </Grid>
          )}

          <Grid
            size={activeStep !== steps.length ? { md: 8, sx: 12 } : 12}
            sx={{ p: 3 }}
          >
            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
              {steps.map((label) => (
                <Step key={label} sx={{ color: "error" }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack sx={{ alignItems: "center" }}>
                <Typography variant="h4">Siparişinizi aldık.</Typography>
                <Typography variant="body2">
                  Sipariş numaranız <strong>{orderId}</strong>
                </Typography>
                <Typography variant="body1">
                  Siparişiniz onaylandığı zaman size mail gönderilecektir.
                </Typography>
                <Button sx={{ mt: 2 }} variant="contained" color="error">
                  Siparişleri Listele
                </Button>
              </Stack>
            ) : (
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    startIcon={<ChevronLeftRounded />}
                    variant="contained"
                    color="error"
                    onClick={handlePrevious}
                    disabled={activeStep === 0}
                  >
                    Prev
                  </Button>
                  <Button
                    endIcon={
                      activeStep === 2 ? <DoneIcon /> : <ChevronRightRounded />
                    }
                    variant="contained"
                    color="error"
                    type="submit"
                    loading={loading}
                  >
                    {activeStep === 2 ? "done" : "next"}
                  </Button>
                </Box>
              </form>
            )}
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}
