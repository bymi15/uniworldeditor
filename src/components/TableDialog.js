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
  Radio,
  RadioGroup,
  InputAdornment,
  Avatar,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FileUpload from "./FileUpload";
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
  padLeft: {
    paddingLeft: theme.spacing(1),
  },
  padRight: {
    paddingRight: theme.spacing(1),
  },
  flexDisplay: {
    display: "flex",
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

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const logoUrl = await BlobService.upload(formData, "logos");
      setLogos([...logos, logoUrl]);
      setTable({ logoUrl });
    }
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
        <Grid container>
          <Grid className={classes.flexDisplay} item xs>
            <Autocomplete
              className={classes.padRight}
              fullWidth
              disableClearable
              options={logos}
              loading={loading}
              getOptionLabel={(logo) => getFileNameFromBlobUrl(logo)}
              renderOption={(option) => (
                <React.Fragment>
                  <Avatar alt="logo" src={option || "https://via.placeholder.com/150"} />
                  <span className={classes.padLeft}>{getFileNameFromBlobUrl(option)}</span>
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
                        <Avatar
                          alt="logo"
                          src={table.logoUrl || "https://via.placeholder.com/150"}
                        />
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
            <FileUpload name="uploadLogo" onChange={handleUpload}>
              Upload Logo
            </FileUpload>
          </Grid>
        </Grid>
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
