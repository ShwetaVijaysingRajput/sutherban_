import React, { useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../common/config";
export default function Layout({ children }) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  // const {result,error}=useMsalAuthentication(InteractionType.Redirect,loginRequest);
  console.log("env", process.env.NEXT_PUBLIC_CLIENT_ID);
  useEffect(() => {
    console.log("running useEffect");
    if (!isAuthenticated) {
      instance
        .loginRedirect(loginRequest)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [instance, isAuthenticated]);

  return (
    <>
      <main>{isAuthenticated ? children : null}</main>
    </>
  );
}
