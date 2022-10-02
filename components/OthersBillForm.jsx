import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function AddPersonForm({ data }) {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  const [billInfo, setBillInfo] = useState({
    buyaBill: 0,
    electricityBill: 0,
    gasBill: 0,
    moylaBill: 0,
    waterBill: 0,
    paperBill: 0,
    othersBill: 0,
  });
  const router = useRouter();
  function inputHandler(e) {
    setBillInfo({ ...billInfo, [e.target.name]: e.target.value });
  }

  const addUtilityBill = async (e) => {
    e.preventDefault();

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
          `/api/manage/setUtility?managerId=${
            mealUserInfo ? mealUserInfo.id : null
          }`,
          billInfo
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
      <Typography align="center">অন্যান সকল খরচ যুক্ত করুন</Typography>

      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="বুয়া বিল লিখুন(যদি থাকে)"
        required
        name="buyaBill"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="কারেন্ট বিল লেখুন(যদি থাকে)"
        required
        name="electricityBill"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="গ্যাস বিল লেখুন(যদি থাকে)"
        required
        name="gasBill"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="পানি বিল লেখুন(যদি থাকে)"
        required
        name="waterBill"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="পেপার বিল লেখুন(যদি থাকে)"
        required
        name="paperBill"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="ময়লা বিল লেখুন(যদি থাকে)"
        required
        name="moylaBill"
        InputProps={{ disableUnderline: true }}
        onChange={inputHandler}
      />
      <TextField
        className="styleTextField"
        size="large"
        variant="standard"
        type="number"
        placeholder="অন্যান খরচ লেখুন(যদি থাকে)"
        required
        name="othersBill"
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
          onClick={addUtilityBill}
        >
          যুক্ত করুন
        </Button>
      </div>
      <Stack
        sx={{
          padding: "20px 10px",
          background: "#FFFFFF",
          borderRadius: "10px",
          borderTop: "3px solid #34A853",
        }}
      >
        <Divider>
          <Typography
            align="center"
            sx={{ fontSize: "30px", fontWeight: 900, color: "#565B60" }}
          >
            অন্যান বিলের তথ্য
          </Typography>
        </Divider>
        <Typography>বুয়া বিলঃ {data.buyaBill ? data.buyaBill : 0}</Typography>
        <Typography>
          কারেন্ট বিলঃ {data.electricityBill ? data.electricityBill : 0}
        </Typography>
        <Typography>গ্যাস বিলঃ {data.gasBill ? data.gasBill : 0}</Typography>
        <Typography>পানি বিলঃ {data.waterBill ? data.waterBill : 0}</Typography>
        <Typography>
          পেপার বিলঃ {data.paperBill ? data.paperBill : 0}
        </Typography>
        <Typography>ময়লা বিলঃ {data.moylaBill ? data.moylaBill : 0}</Typography>

        <Typography>
          অন্যান বিলঃ {data.othersBill ? data.othersBill : 0}
        </Typography>
      </Stack>
    </Stack>
  );
}
