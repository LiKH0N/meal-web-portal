import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function UserInstruction() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundImage: "linear-gradient(to right, red ,#FFA610)",
          border: "1px solid #E97B0A",
          padding: "13px",
          borderRadius: "4px",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", fontWeight: 900, color: "#ffffff" }}
        >
          আপনি কি মেছে থাকেন?
        </Typography>
        নোট খাতায় মিলের হিসাব রাখা এবং মাস শেষে হিসাব করা ঝামেলা মনে হয়? আর নয়
        ঝামেলা, আমরা নিয়ে এসেছি এর সমাধান।এবার হিসাব হবে নিমিসেই! আজ থেকে মিলের
        সকল হিসাব করে দিবে সফটওয়্যার(Meal Web Portal)। হিসাব হবে নির্ভুল এবং
        ডাটা থাকবে নিরাপদে। এটি একটি সম্পূর্ণ ফ্রি সফটওয়্যার!ব্যাবহার একদম সহজ!
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 900,
            color: "#ffffff",
            mt: "25px",
          }}
        >
          আমাদের সিস্টেমটি যেভাবে ব্যাবহার করবেন|
        </Typography>
        যে মাসের হিসাব রাখতে চান সেই মাসে একটি নতুন একাউন্ট তৈরী করুন(একাউন্ট
        তৈরী করা একদমি সহজ)। এবার মাস শেষে হিসাব কমপ্লেট হয়ে গেলে একটি রিপোর্ট
        ডাউনলোড করে একাউন্ট ডিলিট করে দিতে পারেন। <br></br>
        <br></br>
        এবার, পরের মাসে যে ম্যানাজার থাকবেন ঠিক একিভাবে পরের মাসের জন্য একটি
        নতুন একাউন্ট তৈরী করে সেই মাসের হিসাব রাখবেন। এবার আগের মতই মাস শেষে
        হিসাব কমপ্লেট হয়ে গেলে একটি রিপোর্ট ডাউনলোড করে একাউন্ট ডিলিট করে দিতে
        পারেন।<br></br>
        <br></br>
        <span style={{ color: "wheat" }}>
          একাউন্ট ডিলিট করার পর একি নম্বব দিয়ে পুনরাই নতুন একাউন্ট খুলা যাবে।
        </span>
        <br></br>
        <br></br>একাউন্ট খুলতে এবং মিলের হিসাব রাখতে নিচের ভিডিওটি দেখুন।
        <br></br>
        <br></br>কোন প্রশ্ন থাকলে আমাদের জিজ্ঞাসা করুন।
        <Link href="https://wa.me/+8801623218618">
          <a style={{ display: "block", color: "black", textAlign: "center" }}>
            জিজ্ঞাসা করুন(❤️)
          </a>
        </Link>
        ধন্যবাদ।
      </Box>
    </Container>
  );
}
