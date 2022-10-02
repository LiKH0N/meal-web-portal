import { Button, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import axios from "axios";
import { writeStorage } from "@rehooks/local-storage";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function Login() {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const loginHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `/api/auth/login?phone=${phone}&password=${password}`
    );
    if (phone.localeCompare(data.phone) == 0) {
      writeStorage("mealUserInfo", data);
      Cookies.set("token", data.token);
      return router.push("/");
    } else {
      Swal.fire("Oppos...!", data, "error");
    }
  };
  return (
    <Stack component="form" onSubmit={loginHandler} spacing={2}>
      <Typography
        align="center"
        sx={{ fontSize: "30px", fontWeight: 900, color: "#FFFFFF" }}
      >
        Meal Web Portal
      </Typography>
      <Divider></Divider>
      <Typography align="center">অপিনার একাউন্টে প্রাবেশ করুন</Typography>

      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="tel"
        placeholder="ফোন নম্বরটি লেখুন"
        required
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="password"
        placeholder="পাসওয়ার্ড লেখুন"
        required
        InputProps={{
          endAdornment: <VisibilityOffIcon />,
          disableUnderline: true,
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" color="btnColor">
        Login
      </Button>
      <Typography>
        <Link href="reset-your-password">
          <a>পাসওয়ার্ড ভোলে গেছেন?</a>
        </Link>
      </Typography>
      <Typography>
        <Link href="registration">
          <a>নতুন একাউন্ট তৈরী করুন</a>
        </Link>
      </Typography>
    </Stack>
  );
}
