import React, { useState, useEffect, useCallback } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Button,
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAllItems } from "../../actions/item-action";
import { apiItems } from "../../constants/ApiConstants";

export const ProductCard = () => {

  const dispatch = useDispatch();
  const [dataGetAll, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const data = useSelector((state) => state.itemReducer.data);
  console.log(data)
  const success = useSelector((state) => state.itemReducer.success);
  const [pagination, setPagination] = useState({ skip: 1, limit: 10 });

  useEffect(() => {
    if (filter == "") {
      dispatch(
        GetAllItems(apiItems.get_all+ "?skip=" + pagination.skip + "&limit=" + pagination.limit)
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
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataGetAll !== undefined && dataGetAll.length > 0 ? (
                dataGetAll.map((item, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.created_date}</TableCell>
                    <TableCell>{item.updated_date}</TableCell>
                    <TableCell>
                      <Button variant="outlined">Edit</Button>
                      <Button variant="outlined">Delete</Button>
                    </TableCell>
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
