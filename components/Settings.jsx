import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import useLocalStorage, { deleteFromStorage } from "@rehooks/local-storage";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
export default function Setting() {
  const [mealUserInfo] = useLocalStorage("mealUserInfo");
  const router = useRouter();
  function deleteAccount() {
    Swal.fire({
      title:"অপনি কি নিশ্চিত?",
      text:"আপনার আকাউন্ট ডিলিট করে ফেলতে চাচ্ছেন।",
      icon: "question",
      showCancelButton: true,
      reverseButtons:true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `/api/manage/deleteAccount?id=${
            mealUserInfo ? mealUserInfo.id : null
          }`
        );
        if (data == "অপনার একাউন্ট সঠিকভাবে ডিলিট হয়েছে") {
          deleteFromStorage("mealUserInfo");
          Cookies.remove("token");
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire("Oops...!", data, "error");
        }
      }
    });
  }
  return (
    <List dense={true}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            deleteFromStorage("mealUserInfo");
            Cookies.remove("token");
            router.reload(window.location.pathname);
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => router.push("/reset-your-password")}>
          <ListItemIcon>
            <LockResetIcon />
          </ListItemIcon>
          <ListItemText>Change password</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={deleteAccount}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete account</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
