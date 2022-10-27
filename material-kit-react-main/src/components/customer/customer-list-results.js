import React, { useState, useEffect, useCallback } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
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
import { getInitials } from "../../utils/get-initials";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../actions/users-action";
import { apiUser } from "../../constants/ApiConstants";

export const CustomerListResults = ({ customers, ...rest }) => {
  const data = useSelector((state) => state.userReducer.data);
  const [dataGetAll, setData] = useState([]);
  
  const [filter, setFilter] = useState("");
  const success = useSelector((state) => state.userReducer.success);
  const [pagination, setPagination] = useState({ skip: 1, limit: 100 });
  const dispatch = useDispatch();
  useEffect(() => {
    if (filter == "") {
      dispatch(
        GetAllUsers(apiUser.get_all + "?skip=" + pagination.skip + "&limit=" + pagination.limit)
      );
    } else {
      console.log("no data");
    }
  }, [filter, pagination, success]);
  
  useEffect(() => {
    if (data && data !== undefined) {
      if (filter === "") {
        setData(data);
        print(data)
      } 
      // else {
      //   setData([]);
      // }
    }
  }, [data]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataGetAll !== undefined && dataGetAll.length > 0 ? dataGetAll.map((order, index)=> (
                <TableRow
                  hover
                  key={index}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  {/* <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell> */}
                  <TableCell>{order.email}</TableCell>
                  {/* <TableCell>
                    {`${order.address.city}, ${customer.address.state}, ${customer.address.country}`}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{format(customer.createdAt, "dd/MM/yyyy")}</TableCell> */}
                </TableRow>
              )):
                <TableRow>
                    <TableCell colSpan={5} sx={{textAlign:'center'}}>
                          No records found.
                    </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
