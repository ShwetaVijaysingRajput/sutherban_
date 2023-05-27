import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
  IconButton,
  Collapse,
  Typography,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState, useRef } from "react";
import apiClient2 from "../../utils/api2";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
function TableComp() {
  const [userData, setUserData] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const router = useRouter();
  const backupData = useRef(null);
  useEffect(() => {
    async function getTableData() {
      const tableDataRes = await apiClient2().get("users");
      const response = await tableDataRes.data;
      const modifiedData = response.map((ele) => {
        delete ele.company;
        return { ...ele, address: [ele.address] };
      });
      backupData.current = modifiedData;
      setUserData(modifiedData);
      console.log("userData", response);
    }
    getTableData();
  }, []);
  const searchHadler = useCallback(() => {
    const tableData = JSON.parse(JSON.stringify(backupData.current));
    const manipData = tableData.map((ele) => {
      const address = Object.values(JSON.parse(JSON.stringify(ele.address[0])));
      delete ele.address;
      return [...Object.values(ele), ...address];
    });

    let indices = [];
    for (let i = 0; i < manipData.length; i++) {
      if (
        manipData[i].some((ele) => {
          return ele
            .toString()
            .toLowerCase()
            .includes(inpVal.toLocaleLowerCase());
        })
      ) {
        indices.push(i);
      }
    }
    const result = indices.map((ele) => {
      return { ...backupData.current[ele] };
    });
    setUserData(result);
  }, [inpVal]);
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        style={{ height: "100vh" }}
        // p={40}
      >
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          style={{ marginBottom: "20px" }}
        >
          {" "}
          return to Home
        </Button>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={inpVal}
          onChange={(e) => {
            setInpVal(e.target.value);
          }}
          style={{ marginBottom: "20px" }}
        />
        <Button
          onClick={searchHadler}
          variant="contained"
          style={{ marginBottom: "20px" }}
        >
          {" "}
          Search
        </Button>
        <Button
          onClick={() => {
            setUserData(backupData.current !== null ? backupData.current : []);
          }}
          variant="contained"
          style={{ marginBottom: "40px" }}
        >
          {" "}
          Reset
        </Button>

        <TableContainer
          component={Paper}
          style={{ width: "80vw", height: "50vh" }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">user name</TableCell>
                <TableCell align="right">Email&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default TableComp;

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.username}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Adress
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Street</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell align="right">Zip code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.address.map((addressRow) => (
                    <TableRow key={addressRow.date}>
                      <TableCell component="th" scope="row">
                        {addressRow.street}
                      </TableCell>
                      <TableCell>{addressRow.city}</TableCell>
                      <TableCell align="right">{addressRow.zipcode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
