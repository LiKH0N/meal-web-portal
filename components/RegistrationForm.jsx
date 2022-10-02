import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
export default function Registration() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const inputHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    if (userInfo.confirmPassword == userInfo.password) {
      Swal.fire({
        title: "আপনি কি সিউর?",
        text: "আপনি কি একাউন্টি তৈরী করতে চাচ্ছেন",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        showLoaderOnConfirm: true,
        reverseButtons: true,
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.post(`/api/auth/registration`, {
            name: userInfo.name,
            phone: userInfo.phone,
            password: userInfo.password,
          });
          if (data == "আপনার একাউন্টি সঠিকভাবে তৈরী করা হয়েছে!") {
            e.target.reset();
            Swal.fire({
              title: "Success",
              text: data,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Oppos...!",
              text: data,
              icon: "error",
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: "Oppos...!",
        text: "আপনি পাসওয়ার্ড সঠিকভাবে লিখেন নি",
        icon: "error",
      });
    }
  };
  return (
    <Stack component="form" onSubmit={registrationHandler} spacing={2}>
      <Typography
        align="center"
        sx={{ fontSize: "30px", fontWeight: 900, color: "#FFFFFF" }}
      >
        Meal Web Portal
      </Typography>
      <Divider></Divider>
      <Typography align="center">নতুন একাউন্ট তৈরী করুন</Typography>
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="text"
        placeholder="আপনার নাম লিখুন"
        required
        name="name"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="tel"
        placeholder="আপনার ফোন নম্বরটি লেখুন"
        required
        name="phone"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="password"
        placeholder="নতুন একটি পাসওয়ার্ড দিন"
        required
        name="password"
        InputProps={{
          endAdornment: <VisibilityOffIcon />,
          disableUnderline: true,
        }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="password"
        placeholder="পাসওয়ার্ডটি আবার লেখুন"
        required
        name="confirmPassword"
        InputProps={{
          endAdornment: <VisibilityOffIcon />,
          disableUnderline: true,
        }}
        onChange={inputHandler}
      />
      <Button type="submit" variant="contained" color="btnColor">
        Register
      </Button>
      <Typography>
        <Link href="/login">
          <a>একাউন্ট আছে?</a>
        </Link>
      </Typography>
      <Typography>
        <Link href="/login">
          <a>একাউন্ট এ প্রবেশ করুন</a>
        </Link>
      </Typography>
    </Stack>
  );
}
