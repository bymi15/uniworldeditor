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
  InputAdornment,
  Avatar,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useReducerState } from "../utils/customHooks";
import BlobService from "../services/BlobService";
import { getFileNameFromBlobUrl } from "../utils/blobs";

const useStyles = makeStyles((theme) => ({
  divider: {
    padding: theme.spacing(1),
  },
  textMuted: {
    color: "rgba(0, 0, 0, 0.54)",
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
  const [logos, setLogos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (updateTable !== undefined) {
      setTable(updateTable);
    }
  }, [updateTable, setTable]);

  React.useEffect(() => {
    async function fetchLogos() {
      try {
        setLoading(true);
        const fetchedLogos = await BlobService.get("logos");
        setLogos(fetchedLogos);
        if (Array.isArray(fetchedLogos) && fetchedLogos.length > 0) {
          setTable({ logoUrl: fetchedLogos[0] });
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchLogos();
  }, [setTable]);

  const resetTableState = () => {
    setTable(tableInitialState);
    if (Array.isArray(logos) && logos.length > 0) {
      setTable({ logoUrl: logos[0] });
    }
  };

  const handleClose = () => {
    resetTableState();
    onClose();
  };

  const handleSubmit = () => {
    table.logoUrl = table.logoUrl === "" ? undefined : table.logoUrl;
    table.zoomUrl = table.zoomUrl === "" ? undefined : table.zoomUrl;
    onSubmit(table);
    resetTableState();
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.divider} />
        <FormControl component="fieldset">
          <Typography variant="caption" className={classes.textMuted}>
            Table Type
          </Typography>
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.divider} />
        <Autocomplete
          fullWidth
          disableClearable
          options={logos}
          loading={loading}
          getOptionLabel={(logo) => getFileNameFromBlobUrl(logo)}
          renderOption={(option) => (
            <React.Fragment>
              <InputAdornment position="start">
                <Avatar alt="logo" src={option || "https://via.placeholder.com/150"} />
              </InputAdornment>
              {getFileNameFromBlobUrl(option)}
            </React.Fragment>
          )}
          value={table.logoUrl}
          onChange={(e, value) => {
            setTable({ logoUrl: value });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Logo"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar alt="logo" src={table.logoUrl || "https://via.placeholder.com/150"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
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
