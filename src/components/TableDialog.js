import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useReducerState } from "../utils/customHooks";

const useStyles = makeStyles((theme) => ({
  divider: {
    padding: theme.spacing(1),
  },
}));

const TableDialog = ({ open, onClose, onSubmit, updateTable }) => {
  const classes = useStyles();
  const tableInitialState = {
    title: "",
    type: "RoundMeetingTable",
    zoomUrl: "",
    logoUrl: "",
  };
  const [table, setTable] = useReducerState(tableInitialState);

  React.useEffect(() => {
    if (updateTable !== undefined) {
      setTable(updateTable);
    }
  }, [updateTable, setTable]);

  const handleClose = () => {
    setTable(tableInitialState);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(table);
    setTable(tableInitialState);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTable({
      [name]: value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {!!updateTable ? "Edit" : "Add"} a meeting table
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Meeting Title"
          type="text"
          fullWidth
          value={table.title}
          onChange={handleChange}
        />
        <div className={classes.divider} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Table Type</FormLabel>
          <RadioGroup aria-label="type" name="type" value={table.type} onChange={handleChange} row>
            <FormControlLabel
              value="RoundMeetingTable"
              control={<Radio color="primary" />}
              label="Round Table"
            />
            <FormControlLabel
              value="RectangularMeetingTable"
              control={<Radio color="primary" />}
              label="Rectangular Table"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          margin="dense"
          name="zoomUrl"
          label="Zoom URL"
          type="text"
          fullWidth
          value={table.zoomUrl}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="logoUrl"
          label="Logo URL"
          type="text"
          fullWidth
          value={table.logoUrl}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Meeting Table
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableDialog;
