import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Autocomplete
} from "@mui/material";
import Service from "../services/ApiConfig"
export const FormItem = (props) => {
  const [dataUser, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    Service.getAllUsers()
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleAdd = (e) => {
    if (true) {
      var data = {
        title: title,
        description: description
      };
      if (props.isAdd) {
        Service.create(parseInt(inputValue), data);
      }
      props.handleClose(props.isAdd ? "Add Success" : null);
    }

  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.isAdd ? "Add Item" : "Edit Item"}</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="combobox"
          options={dataUser.map(u => ((u.user_id).toString()))}
          sx={{ marginTop: 1, width: 300, height: 60 }}
          renderInput={(params) => <TextField {...params} label="Member" />}
        />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title || ""}
          onChange={(e) => {
            setTitle(e.target.value.toString());
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description || ""}
          onChange={(e) => {
            setDescription(e.target.value.toString());
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd}>Save</Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
