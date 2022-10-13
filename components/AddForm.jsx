import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function AddPersonForm() {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  const [name, setName] = useState();
  const router=useRouter()
  const addNewPerson = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "আপনি কি সিউর?",
      text: `আপনি কি ${name} কে নতুন মেম্বার হিসাবে যুক্ত করতে চাচ্ছেন`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.post(
          `/api/person/create?managerId=${
            mealUserInfo ? mealUserInfo.id : null
          }`,
          { name: name }
        );
        if (data == "alreadyExists") {
          Swal.fire({
            title: "Oops...!",
            text: `এই ${name} নামে একজন যুক্ত করেছেন। দয়া করে অন্য নাম ব্যাবহার করুন।`,
            icon: "warning",
          });
        } else {
          setName("");
          Swal.fire({
            title: "Success",
            text: data,
            icon: "success",
          }).then(result => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname)
            }
          })
        }
      }
    });
  };
  return (
  
      <Stack
        spacing={2}
      >
        <Typography
          align="center"
          sx={{ fontSize: "35px", fontWeight: 900, color: "#565B60" }}
        >
          Meal Web Portal
        </Typography>
        <Typography align="center">নতুন এক জন যুক্ত করুন</Typography>

        <TextField
          className="styleTextField"
          size="large"
          variant="standard"
          type="text"
          placeholder="নাম লিখুন"
          required
          InputProps={{ disableUnderline: true }}
          onChange={(e) => setName(e.target.value)}
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
          type="submit"
          variant="contained"
          color="btnColor"
          disabled={name ? false : true}
          onClick={addNewPerson}
        >
        যুক্ত করুন
        </Button>
      </div>
    
      </Stack>
    
  );
}
