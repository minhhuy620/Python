import React, { useState, useEffect, useCallback } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  EditIcon,
  DeleteIcon,
} from "@mui/material";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../actions/users-action";
import { apiUser } from "../../constants/ApiConstants";
import { SeverityPill } from '../severity-pill';

export const CustomerListResults = () => {
  const dispatch = useDispatch();
  const [dataGetAll, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const data = useSelector((state) => state.userReducer.data);
  const success = useSelector((state) => state.userReducer.success);
  const [pagination, setPagination] = useState({ skip: 1, limit: 10 });

  useEffect(() => {
    if (filter == "") {
      dispatch(
        GetAllUsers()
      );
    } else {
      console.log("no data");
    }
  }, [filter, pagination, success]);

  useEffect(() => {
    if (data && data !== undefined) {
      if (filter === "") {
        setData(data);
      } else {
        setData([]);
      }
    }
  }, [data]);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actice</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataGetAll !== undefined && dataGetAll.length > 0 ? (
                dataGetAll.map((order, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{order.user_id}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>
                      <SeverityPill>{(order.is_active).toString() === "true" ? 'online' : 'offline'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{order.created_date}</TableCell>
                    <TableCell>{order.updated_date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
