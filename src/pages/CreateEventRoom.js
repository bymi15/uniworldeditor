import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiAlert from "@material-ui/lab/Alert";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import TableGridEditor from "../components/TableGridEditor";
import EventRoomService from "../services/EventRoomService";
import { useReducerState } from "../utils/customHooks";
import { validateEventRoom } from "../utils/validate";
import {
  backgrounds,
  scenes,
  findBackground,
  findScene,
  findBackgroundThumbnail,
  findSceneThumbnail,
} from "../utils/presets";

const useStyles = makeStyles((theme) => ({
  mainSection: {
    paddingTop: theme.spacing(5),
  },
  eventInfoPanel: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  divider: {
    padding: theme.spacing(1),
  },
  centerTableGrid: {
    display: "flex",
    justifyContent: "center",
  },
  createButton: {
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    backgroundColor: theme.palette.success.main,
    color: "#fff",
  },
  addIcon: {
    color: "#fff",
    marginRight: theme.spacing(2),
  },
  progressLoader: {
    color: "#fff",
    marginRight: theme.spacing(2),
  },
}));

const CreateEventRoom = (props) => {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(false);
  const eventRoomInitialState = {
    title: "",
    scene: "Default",
    background: "Default",
    eventDate: moment().toISOString(),
    meetingTables: [],
  };
  const [eventRoom, setEventRoom] = useReducerState(eventRoomInitialState);
  const [alert, setAlert] = useReducerState({
    open: false,
    message: "",
    type: "success",
  });

  const updateMeetingTables = (newTables) => {
    setEventRoom({ meetingTables: newTables });
  };

  const showAlert = (msg, type = "error") => {
    setAlert({ open: true, message: msg, type: type });
  };

  const hideAlert = () => {
    setAlert({ open: false });
  };

  const handleSelectScene = (e, value) => {
    if (value !== "Default") {
      setEventRoom({ scene: value, background: "Default" });
    }
    setEventRoom({ scene: value });
  };

  const handleSelectBackground = (e, value) => {
    setEventRoom({ background: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventRoom({
      [name]: value,
    });
  };

  const handleDateChange = (val) => {
    setEventRoom({
      eventDate: moment(val).toISOString(),
    });
  };

  const handleClickCreate = async () => {
    setLoading(true);
    const data = { ...eventRoom };
    if (validateEventRoom(data)) {
      try {
        data.background = data.background === "none" ? undefined : data.background;
        const createdEventRoom = await EventRoomService.create(data);
        setEventRoom(eventRoomInitialState);
        props.history.push({
          pathname: `/eventrooms/${createdEventRoom._id}`,
          state: { created: true },
        });
      } catch (err) {
        showAlert("Failed to create event room. Please try again later.", "error");
        console.log(err);
      }
    } else {
      console.log(eventRoom);
      showAlert("Please make sure you have entered all the fields", "warning");
    }
    setLoading(false);
  };

  return (
    <Container className={classes.mainSection}>
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={hideAlert} severity={alert.type}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
      <Typography variant="h4">Create Event Room</Typography>
      <Grid container spacing={2}>
        {" "}
        <Grid item md={12}>
          <Card className={classes.eventInfoPanel}>
            <React.Fragment>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={5} xs={12}>
                    <TextField
                      fullWidth
                      disabled={isLoading}
                      name="title"
                      label="Title"
                      placeholder="Enter the event title"
                      value={eventRoom.title}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        disabled={isLoading}
                        autoOk
                        disablePast
                        disableToolbar
                        variant="inline"
                        format="YYYY-MM-DD"
                        margin="normal"
                        id="eventDate"
                        label="Event Date"
                        value={eventRoom.eventDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <div className={classes.divider} />
                    {scenes && (
                      <Autocomplete
                        fullWidth
                        disableClearable
                        options={scenes.map((scene) => scene.value)}
                        getOptionLabel={(val) => findScene(val)}
                        value={eventRoom.scene}
                        onChange={handleSelectScene}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Scene"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    )}
                    <div className={classes.divider} />
                    {backgrounds && eventRoom.scene === "Default" && (
                      <Autocomplete
                        fullWidth
                        disableClearable
                        options={backgrounds.map((background) => background.value)}
                        getOptionLabel={(val) => findBackground(val)}
                        value={eventRoom.background}
                        onChange={handleSelectBackground}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Background"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    )}
                    <div className={classes.divider} />
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Scene Preview</Typography>
                        <img
                          width="100%"
                          alt="scene preview"
                          src={findSceneThumbnail(eventRoom.scene)}
                        />
                        <Typography variant="caption">{findScene(eventRoom.scene)}</Typography>
                      </Grid>
                      {eventRoom.scene === "Default" && (
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Background Preview</Typography>
                          <img
                            width="100%"
                            alt="background preview"
                            src={findBackgroundThumbnail(eventRoom.background)}
                          />
                          <Typography variant="caption">
                            {findBackground(eventRoom.background)}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <Typography variant="subtitle2">Meeting Tables</Typography>
                    <div className={classes.divider} />
                    <div className={classes.centerTableGrid}>
                      <TableGridEditor
                        tables={eventRoom.meetingTables}
                        updateMeetingTables={updateMeetingTables}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.createButton}
                  color="primary"
                  variant="outlined"
                  size="large"
                  onClick={handleClickCreate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress className={classes.progressLoader} size={20} />
                  ) : (
                    <AddIcon className={classes.addIcon} />
                  )}
                  Create event room
                </Button>
              </CardActions>
            </React.Fragment>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateEventRoom;
