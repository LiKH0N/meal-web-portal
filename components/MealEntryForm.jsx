import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/router'
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function MealEntryForm({ data }) {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const [mealUpdate, setMealUpdate] = useState([]);
  const onClick=(evt)=> {
    setMealUpdate([
      ...mealUpdate,
      { id: evt.target.name, mealCount: evt.target.value },
    ]);
  }
  async function updateMeal() {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "সকলের মিল সঠিকভাবে উঠিয়েছেন",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.put(`/api/manage/mealUpdate`, mealUpdate);
        setOpen(false);
        if (data == "আপনার মিল সঠিকভাবে যুক্ত করা হয়েছে!") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname)

            }
          });
        } else {
          Swal.fire(
            "Oops..!",
            "কিছু একটা সমস্যা হয়েছে,আবার চেষ্টা করুন",
            "error"
          );
        }
      }
    });
  }

  return (
    <>
      <TableContainer>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: 800,
            mt: "13px",
          }}
        >
          মিল উঠান
        </Typography>

        <Divider sx={{ mt: "10px" }}></Divider>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>নাম</TableCell>
              <TableCell align="center">মোট মিল</TableCell>
              <TableCell align="center">আজকের মিল</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.mealCount}</TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    size="small"
                    name={row.id}
                    onChange={()=>onClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider></Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button variant="contained" color="error" onClick={()=>router.push("/")}>
          বাদ দিন
        </Button>
        <Button variant="contained" color="btnColor" onClick={updateMeal}>
          যুক্ত করুন
        </Button>
      </div>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
