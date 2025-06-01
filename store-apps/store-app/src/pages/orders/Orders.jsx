import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import request from "../../api/apiClient";
import Loading from "../../components/Loading";
import { currenyTRY } from "../../utils/formats";

export default function OrdersPage() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const subTotal = selectedOrder?.orderItems.reduce(
    (toplam, item) => toplam + item.price * item.quantity,
    0
  );

  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  function handleDialogClose() {
    setOpen(false);
    setSelectedOrder(null);
  }

  function handleDialogOpen(order) {
    setSelectedOrder(order);
    setOpen(true);
  }

  useEffect(() => {
    setLoading(true);
    request.orders
      .getOrders()
      .then((result) => setOrders(result))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Siparişler Yükleniyor" />;

  if (!orders || orders.length === 0)
    return <Alert severity="warning">Henüz siparişiniz bulunmamaktadır</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Chip
                    label={item.orderStatus}
                    color="error"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {new Date(item.orderDate).toLocaleString()}
                </TableCell>
                <TableCell>{currenyTRY.format(item.total)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDialogOpen(item)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg">
        <DialogTitle>Order Details</DialogTitle>
        <IconButton
          onClick={handleDialogClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Teslimat bilgileri
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedOrder?.firstName} {selectedOrder?.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              +90 {selectedOrder?.phone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {selectedOrder?.address} - {selectedOrder?.city}
            </Typography>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead id="dialog-title">
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder?.orderItems.map((item) => (
                  <TableRow id={item.id}>
                    <TableCell>
                      <img
                        src={`http://localhost:5000/images/${item.image}`}
                        style={{ height: 60 }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">
                      {currenyTRY.format(item.price)}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      {currenyTRY.format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    Ara Toplam
                  </TableCell>
                  <TableCell align="right">
                    {currenyTRY.format(subTotal)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} align="right">
                    Vergi
                  </TableCell>
                  <TableCell align="right">{currenyTRY.format(tax)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} align="right">
                    Toplam
                  </TableCell>
                  <TableCell align="right">
                    {currenyTRY.format(total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
