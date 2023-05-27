import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { loginRequest } from "../../common/config";
import apiClient from "../../utils/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import { useRouter } from "next/router";
function MyProfile() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      async function getData() {
        const { accessToken } = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });
        const rawResponse = await apiClient().get("me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const response = await rawResponse.data;
        setData(response);
      }
      getData();
    }
  }, [accounts, instance, isAuthenticated]);
  return (
    <>
      {
        <Profile
          name={data !== null ? data.displayName : ""}
          email={data !== null ? (data.mail !== null ? data.mail : "") : ""}
          phone={
            data !== null
              ? data.mobilePhone !== null
                ? data.mobilePhone
                : ""
              : ""
          }
        />
      }
    </>
  );
}

export default MyProfile;

const Profile = ({ name, email, phone }) => {
  const router = useRouter();

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
              Profile Information
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em", marginTop: "1em" }}
          >
            <AccountCircleIcon fontSize="large" color="primary" />
            <Typography
              variant="h6"
              fontSize="small"
              minWidth={85}
              textAlign={"center"}
            >
              {name.length > 0 ? name : "-"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em" }}
          >
            <EmailIcon fontSize="large" color="primary" />
            <Typography
              variant="h6"
              fontSize="small"
              minWidth={85}
              textAlign={"center"}
            >
              {email.length > 0 ? email : "-"}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em" }}
          >
            <StayCurrentPortraitIcon fontSize="large" color="primary" />
            <Typography
              variant="h6"
              fontSize="small"
              minWidth={85}
              textAlign={"center"}
            >
              {phone.length > 0 ? phone : "-"}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ marginBottom: "1em" }}
          >
            <Button variant="contained" onClick={() => router.push("/")}>
              Return to home
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
