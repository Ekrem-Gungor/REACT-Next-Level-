import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "./CounterSlice";

export default function Counter() {
  const { value } = useSelector((state) => state.counter);
  const dispacth = useDispatch();

  return (
    <>
      <Typography>{value}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispacth(increment())}>Increment</Button>
        <Button onClick={() => dispacth(decrement())}>Decrement</Button>
        <Button onClick={() => dispacth(incrementByValue(5))}>
          Increment By Value
        </Button>
      </ButtonGroup>
    </>
  );
}
