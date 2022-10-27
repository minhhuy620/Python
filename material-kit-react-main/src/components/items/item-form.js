import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
// import { apiCustomer } from '../../constants/ApiConstant'
import { GetItemById, InsertItem } from "../../actions/item-action";
import { GetUserById } from "../../actions/users-action";
// import { validateFormCustomer } from '../validate-form';
import { GetAllUsers } from "../../actions/users-action";
export const FormItem = (props) => {

  const dispatch = useDispatch();
  const [dataUser, setData] = useState([]);

  const [filter, setFilter] = useState("");
  const data = useSelector((state) => state.userReducer.data);
  const success = useSelector((state) => state.userReducer.success);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (filter == "") {
      dispatch(
        GetAllUsers()
      );
    } else {
      console.log("no data");
    }
  }, [filter, success]);

  useEffect(() => {
    if (data && data !== undefined) {
      if (filter === "") {
        setData(data);
      } else {
        setData([]);
      }
    }
  }, [data]);

  const handleAdd = (e) => {
    if (true) {
      const item = {
        title: title,
        description: description,
      };
      if (props.isAdd) {
        dispatch(InsertItem(parseInt(inputValue), item));
      }
      // else {
      //   dispatch(Update(apiCustomer.update, id, customer));
      // }
      props.handleClose(props.isAdd ? "Add Success" : "Update Succes");
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
          inputValue={(inputValue.split(0,2)).toString()}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="combobox"
          options={dataUser.map(u => ((u.user_id).toString()+'_'+((u.email).toString()).split('@')[0]))}
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
            setTitle(e.target.value);
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
            setDescription(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd}>Save</Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </DialogActions>
      {/* </Form> */}
    </Dialog>
  );
};
