import React, { useState, useEffect, useCallback } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
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
  DeleteIcon,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAllItems, InsertItem, GetItemById, DeleteItem } from "../../actions/item-action";
import { apiItems } from "../../constants/ApiConstants";
import { FormConfirm } from "./item-confirm";
import { Loading } from "../../theme/loading";
import { ItemListToolbar } from "./item-list-toolbar";
import { FormItem } from "./item-form";
export const ProductCard = () => {

  const dispatch = useDispatch();
  const [dataGetAll, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const data = useSelector((state) => state.itemReducer.data);
  const success = useSelector((state) => state.itemReducer.success);
  const [pagination, setPagination] = useState({ skip: 1, limit: 10 });
  const [id, setId] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [messageConfirm, setConfirm] = useState(true);
  const isLoading = useSelector((state) => state.itemReducer?.isLoading);
  const [isAdd, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [showButtonAdd, setshowButtonAdd] = useState(true);


  useEffect(() => {
    setId(data.map(item => item.owner_id))
  }, []);

  useEffect(() => {
    if (filter == "") {
      dispatch(GetAllItems());
    } else {
      console.log("no data");
    }
  }, [filter, pagination, success]);

  useEffect(() => {
    if (data && data !== undefined) {
      if (filter === "") {
        setData(data);
      } else {
        console.log("no data");
      }
    }
  }, [data]);
  const handleOpenConfirm = (e) => {
    setId(e);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleDelete = (e) => {
    handleCloseConfirm();
    if (messageConfirm === "Item") {
      dispatch(DeleteItem(id));
    }
  };
  const handleOpenAdd = () => {
    setStatus(true)
    setOpen(true);
  };
  const handleClose = (e) => {
    setStatus(false);
    setOpen(false);
  };

  return (
    <>
      <ItemListToolbar handleaddclick={handleOpenAdd}></ItemListToolbar>
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                      <Box sx={{ py: 1 }}>
                        <Loading />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : dataGetAll !== undefined && dataGetAll.length > 0 ? (
                  dataGetAll.map((item, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.created_date}</TableCell>
                      <TableCell>{item.updated_date}</TableCell>
                      <TableCell>
                        <Button variant="outlined">Edit</Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenConfirm(item.item_id, setConfirm("Item"))}
                        >
                          Delete
                        </Button>
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
      <FormItem open={open} isAdd={isAdd} handleClose={handleClose} ownerId={id} />
      <FormConfirm
        messageConfirm={messageConfirm}
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        handleDelete={handleDelete}
      ></FormConfirm>
    </>
  );
};
