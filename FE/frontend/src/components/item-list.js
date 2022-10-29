import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FormConfirm } from "./item-confirm";
import { ItemListToolbar } from "./item-list-toolbar";
import { FormItem } from "./item-form";
import Service from "../services/ApiConfig"
export const Item = () => {
  const [data, setData] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [messageConfirm, setConfirm] = useState(true);
  const [isAdd, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    Service.getAll()
      .then(response => {
        setData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
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
      Service.remove(id).then((res) => {
        if (res.status === 200) {
          setData(
            data.filter((p) => p.item_id !== id)
          );
        }
      });
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
      <Card >
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
                {data !== undefined && data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.created_date}</TableCell>
                      <TableCell>{item.updated_date}</TableCell>
                      <TableCell>
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
      <FormItem open={open} isAdd={isAdd} handleClose={handleClose} />
      <FormConfirm
        messageConfirm={messageConfirm}
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        handleDelete={handleDelete}
      ></FormConfirm>
    </>
  );
};
