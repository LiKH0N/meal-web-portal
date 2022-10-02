import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request) {
  const cookie = request.cookies.get("token");
  if (cookie == undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const { payload } = await jwtVerify(
    cookie,
    new TextEncoder().encode(process.env.JWT_Secreet)
  );
  if (payload) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "//:path*",
    "/meal-entry/:path*",
    "/cost-entry/:path*",
    "/pay-now/:path*",
    "/others-bill/:path*",
    "/add-new-person/:path*",
    "/update-member/:path*",
    "/genarate-meal-report/:path*",
    "/settings/:path*",
  ],
};
