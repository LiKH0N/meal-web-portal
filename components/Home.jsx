import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FilterByName from "./FilterByName";
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRouter } from "next/router";
export default function View({ data }) {
  const [open, setOpen] = React.useState(false);
  const [peopleList, setPeopleList] = React.useState(data.persons);
  const ref = React.createRef();
  const router = useRouter();
  const searchUser = (userName) => {
    if (userName == " ") {
      setPeopleList(data.persons);
    } else {
      setPeopleList(data.persons.filter((item) => item.name == userName));
    }
  };

  async function deleteMember(name, id) {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `${name} কে ডিলিট করে দিতে চাচ্ছেন`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.delete(
          `/api/manage/deleteMember?id=${id}`
        );
        setOpen(false);
        if (data == "সঠিকভাবে ডিলিট হয়েছে") {
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
            icon: "warning",
          });
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
          মিলের হিসাব
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "gray",
          }}
        >
          {moment(data.whichMonth).format("MMM Do YY")}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: "10px" }}
        >
          <Typography>মোট জমাঃ {data.joma}</Typography>
          <Typography>বাজারঃ {data.bajar}</Typography>
          <Typography>ব্যালেন্সঃ {data.joma - data.bajar}</Typography>
          <Typography>
            মিল রেটঃ {data.mealRate ? data.mealRate.toFixed(2) : 0}
          </Typography>
          <Link href="meal-entry">
            <Button
              size="small"
              endIcon={<NoteAltIcon />}
              variant="contained"
              color="btnColor"
              component="a"
            >
              মিল
            </Button>
          </Link>
        </Stack>

        <FilterByName data={data.persons} searchUser={searchUser} />

        <Divider sx={{ mt: "10px" }}></Divider>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>নাম</TableCell>
              <TableCell align="right">জমা</TableCell>
              <TableCell align="right">মিল</TableCell>
              <TableCell align="right">খরচ</TableCell>
              <TableCell align="center">বুয়া</TableCell>
              <TableCell align="right">উটিলিটি</TableCell>
              <TableCell align="right">ব্যালেন্স</TableCell>
              <TableCell align="right">মিল শুরু</TableCell>
              <TableCell align="right">একশন</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peopleList.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.joma}</TableCell>
                <TableCell align="right">{row.mealCount}</TableCell>
                <TableCell align="right">
                  {(row.mealCount * data.mealRate).toFixed(2)}
                </TableCell>
                <TableCell align="right">{data.buyaBill.toFixed(2)}</TableCell>
                <TableCell align="right">
                  {data.utilityBill.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {(
                    row.joma -
                    row.mealCount * data.mealRate -
                    (data.buyaBill + data.utilityBill)
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {moment(row.createdAt).format("DD-MM-YY")}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      router.push(
                        `/update-member?id=${row.id}&name=${row.name}&joma=${row.joma}&mealCount=${row.mealCount}`
                      )
                    }
                  >
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon
                      color="error"
                      onClick={() => deleteMember(row.name, row.id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "100px",
        }}
      >
        <Link href="/genarate-meal-report">
          <Button
            size="small"
            endIcon={<PictureAsPdfIcon />}
            variant="contained"
            color="btnColor"
            component="a"
          >
            pdf তৈরী করুন
          </Button>
        </Link>
      </div>
      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
