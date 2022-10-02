import {
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

export default function CostEntryForm({ managerId }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState();
  const router = useRouter();

  async function addCost() {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `আজকের বাজার ${amount} টাকা  যুক্ত করতে চাচ্ছেন`,
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
          `/api/manage/addCost?id=${managerId}`,
          { amount: amount }
        );
        setOpen(false);
        if (data == "আপনার বাজারের টাকা সঠিকভাবে যুক্ত করা হয়েছে!") {
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
        বাজারের টাকা উঠান
      </Typography>

      <Divider sx={{ mt: "10px" }}></Divider>
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
          disabled={amount > 0 ? false : true}
          variant="contained"
          color="btnColor"
          onClick={addCost}
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
