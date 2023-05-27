"use client";
import { Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect } from "react";
// import styles from './page.module.css'

import { useRouter } from "next/router";
import { useMsal } from "@azure/msal-react";
export default function Home() {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  return (
    <>
      <Box
        style={{ height: "100vh" }}
        display="flex"
        alignItems="center"
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Box
          w={50}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em", marginTop: "1em" }}
          >
            <Typography variant="h6" fontSize="large">
              Hello There..!!
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em", marginTop: "1em" }}
          >
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                router.push("/table");
              }}
            >
              Go to Table Component
            </Link>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em" }}
          >
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                router.push("/myProfile");
              }}
            >
              Go to My Profile
            </Link>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                instance.logoutRedirect({
                  postLogoutRedirectUri: "/",
                });
              }}
            >
              Log out
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
