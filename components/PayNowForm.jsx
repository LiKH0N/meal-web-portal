import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function PayNowForm({ data }) {
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState();
  const [amount, setAmount] = useState();
  const router = useRouter();

  async function payNow() {
    const person = data.filter((item) => item.name == personName);

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `${personName} এর নামে ${amount} টাকা  যুক্ত করতে চাচ্ছেন`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.put(
          `/api/manage/payNow?id=${person[0].id}`,
          {
            amount: amount,
          }
        );
        setOpen(false);
        if (data == "টাকা সঠিকভাবে যুক্ত করা হয়েছে!") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        } else {
          Swal.fire("Oops..!", data, "error");
        }
      }
    });
  }

  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: 800,
          mt: "13px",
        }}
      >
        জমা টাকা উঠান
      </Typography>

      <Divider sx={{ mt: "10px" }}></Divider>
      <Autocomplete
        size="small"
        options={data.map((option) => option.name)}
        onChange={(event, newValue) => {
          setPersonName(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            color="textFielBorderColor"
            placeholder="নাম সিলেক্ট করুন"
          />
        )}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="টাকার পরিমান লিখুন"
        required
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => router.push("/")}
        >
          বাদ দিন
        </Button>
        <Button
          disabled={amount > 0 ? (personName ? false : true) : true}
          variant="contained"
          color="btnColor"
          onClick={payNow}
        >
          যুক্ত করুন
        </Button>
      </div>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </Stack>
  );
}
