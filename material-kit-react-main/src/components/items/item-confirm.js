import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';

export const FormConfirm = (props) => {
    return (
        <Dialog open={props.openConfirm} onClose={props.handleCloseConfirm}>
            <DialogTitle style={{ cursor: 'move' }}>
                Confirm
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.messageConfirm === "Item" ? "Do you want to delete this way?" : "Do you want to delete the item?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDelete}>Yes</Button>
                <Button onClick={props.handleCloseConfirm}>No</Button>
            </DialogActions>
        </Dialog>
    )
}
