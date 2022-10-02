import { Backdrop, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function Login() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const loginHandler = async (e) => {
    e.preventDefault();
    setOpen(true);
    const { data } = await axios.put(
      `/api/auth/resetPassword?phone=${phone}&password=${password}`
    );
    setOpen(false);
    if (data == "আপনার পাসওয়ার্ডটি সঠিকভাবে পরিবর্তন করা হয়েছে!") {
      Swal.fire("Success", data, "success");
    } else if (data == "কোন একাউন্ট খুজে পাওয়া যাইনি") {
      Swal.fire("Oppos...!", data, "warning");
    } else {
      Swal.fire("Oppos...!", data, "error");
    }
  };
  return (
    <Stack component="form" onSubmit={loginHandler} spacing={2}>
      <Typography
        align="center"
        sx={{ fontSize: "30px", fontWeight: 900, color: "black" }}
      >
        Meal Web Portal
      </Typography>
      <Divider></Divider>
      <Typography align="center">
        অপনার একাউন্ট এর পাসওয়ার্ড পরিবর্ন্ত করুন
      </Typography>

      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="tel"
        placeholder="আপনার ফোন নম্বরটি লেখুন"
        required
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="password"
        placeholder="নতুন একটি পাসওয়ার্ড লেখুন"
        required
        InputProps={{
          endAdornment: <VisibilityOffIcon />,
          disableUnderline: true,
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" color="btnColor">
        Reset password
      </Button>
      <Typography>
        <Link href="/login">
          <a>একাউন্ট এ প্রবেশ করুন</a>
        </Link>
      </Typography>
      <Backdrop open={open} >
        <FadeLoader color="#FFA610"/>
      </Backdrop>
    </Stack>
  );
}
