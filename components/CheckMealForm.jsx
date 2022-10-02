import {
  Paper,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

export default function PdfCom() {
  const [number, setNumber] = useState();
  const [data, setData] = useState();
  async function getReport() {
    const { data } = await axios.get(
      `/api/manage/getPdfInfo?userPhone=${number}`
    );
    setData(data);
  }
  console.log(data);
  return (
    <div style={{ padding: "20px" }}>
      <Typography
        sx={{ fontSize: "30px", fontWeight: 900, textAlign: "center" }}
      >
        মিল চেক করুন
      </Typography>
      <Divider sx={{ my: "15px" }}></Divider>
      <Stack direction="row">
        <TextField
          className="styleTextField"
          size="large"
          variant="standard"
          type="search"
          placeholder="ম্যানাজারের নম্বরটি লিখুন"
          required
          fullWidth
          InputProps={{ disableUnderline: true }}
          onChange={(e) => setNumber(e.target.value)}
        />
        <Button
          type="button"
          onClick={getReport}
          size="small"
          variant="contained"
          color="btnColor"
        >
          Search
        </Button>
      </Stack>
      {data ? (
        <>
          <Typography
            sx={{ fontSize: "30px", fontWeight: 900, textAlign: "center",mt:"10px" }}
          >
            Details
          </Typography>
          <Typography
            sx={{
              color: "gray",
              fontWeight: 900,
              textAlign: "center",
              mb: "5px",
            }}
          >
            Month: {moment(data.createdAt).format("MMM Do YY")}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Cash</TableCell>
                  <TableCell>Meal</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Coking</TableCell>
                  <TableCell>Utility</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.persons.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.joma}</TableCell>
                    <TableCell>{row.mealCount}</TableCell>
                    <TableCell>{data.mealRate}</TableCell>
                    <TableCell>
                      {(row.mealCount * data.mealRate).toFixed(2)}
                    </TableCell>
                    <TableCell>{data.buyaBillEachPerson.toFixed(2)}</TableCell>
                    <TableCell>
                      {data.utilityBillEachPerson.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {(
                        row.joma -
                        row.mealCount * data.mealRate -
                        (data.buyaBillEachPerson + data.utilityBillEachPerson)
                      ).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={1} sx={{ mt: "100px" }}>
            <Typography sx={{ fontWeight: 900, color: "gray" }}>
              Details Information
            </Typography>
            <Divider></Divider>
            <Typography>Total member: {data.persons.length} tk</Typography>
            <Typography>Total collect: {data.joma} tk</Typography>
            <Typography>
              Meal rate: {data.mealRate ? data.mealRate.toFixed(2) : 0} tk
            </Typography>
            <Typography sx={{ fontWeight: 900, color: "gray" }}>
              Meal Cost
            </Typography>
            <Divider></Divider>
            <Typography>Meal cost: {data.bajar} tk</Typography>
            <Typography>Coking bill: {data.buyaBill} tk</Typography>
            <Divider></Divider>
            <Typography>Total cost: {data.bajar + data.buyaBill} tk</Typography>
            <Typography sx={{ fontWeight: 900, color: "gray" }}>
              Utility Cost
            </Typography>
            <Divider></Divider>
            <Typography>Electricity bill: {data.electricityBill} tk</Typography>
            <Typography>Gas bill: {data.gasBill} tk</Typography>
            <Typography>Water bill: {data.waterBill} tk</Typography>
            <Typography>Paper bill: {data.paperBill} tk</Typography>
            <Typography>Dirt bill: {data.moylaBill} tk</Typography>
            <Typography>Others bill: {data.othersBill} tk</Typography>
            <Divider></Divider>
            <Typography>Total utility: {data.utilityBill} tk</Typography>

            <Typography>Total cost: {data.totalCost} tk</Typography>
          </Stack>
        </>
      ) : null}
    </div>
  );
}
