import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function UpdateMemberForm({ id, name, joma, mealCount }) {
  const [updateInfo, seUpdateInfo] = useState({
    name: name,
    joma: joma,
    mealCount: mealCount,
  });

  const router = useRouter();
  function inputHandler(e) {
    seUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
  }

  const updateMemberInfo = async () => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `সঠিকভাবে সকল তথ্য লিখেছেন`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.put(
          `/api/manage/personUpdate?id=${id}`,
          updateInfo
        );
        if (data == "সঠিকভাবে যুক্ত করা হয়েছে!") {
          Swal.fire({
            title: "Success",
            text: data,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire({
            title: "Oops...!",
            text: data,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <Stack spacing={2}>
      <Typography
        align="center"
        sx={{ fontSize: "35px", fontWeight: 900, color: "#565B60" }}
      >
        Meal Web Portal
      </Typography>
      <Typography align="center">তথ্য হালনাগাদ করুন</Typography>

      <TextField
        className="styleTextField"
        size="large"
        value={updateInfo.name}
        variant="standard"
        type="text"
        placeholder="নাম লিখুন"
        name="name"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />

      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="মোট মিল লিখুন"
        value={updateInfo.mealCount}
        name="mealCount"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        value={updateInfo.joma}
        name="joma"
        placeholder="মোট টাকা লিখুন"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
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
          type="button"
          variant="contained"
          color="btnColor"
          onClick={updateMemberInfo}
        >
          যুক্ত করুন
        </Button>
      </div>
    </Stack>
  );
}
