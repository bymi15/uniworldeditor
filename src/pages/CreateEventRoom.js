import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import TableGridEditor from "../components/TableGridEditor";
import EventRoomService from "../services/EventRoomService";
import { useReducerState } from "../utils/customHooks";
import { validateEventRoom } from "../utils/validate";
import roundTable from "../assets/img/roundtable.png";
import rectangularTable from "../assets/img/rectangulartable.png";

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
    background: "none",
    host: "",
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
        // showAlert("Successfully created event room.", "success");
        props.history.push(`/eventrooms/${createdEventRoom._id}`);
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
        <Grid item md={9} xs={12}>
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
                    <div className={classes.divider} />
                    <TextField
                      fullWidth
                      disabled={isLoading}
                      name="host"
                      label="Host"
                      value={eventRoom.host}
                      placeholder="Enter the event host"
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
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Scene</FormLabel>
                      <RadioGroup
                        aria-label="scene"
                        name="scene"
                        value={eventRoom.scene}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          disabled={isLoading}
                          value="Default"
                          control={<Radio color="primary" />}
                          label="Default"
                        />
                        <FormControlLabel
                          disabled={isLoading}
                          value="ConferenceHall"
                          control={<Radio color="primary" />}
                          label="Conference Hall"
                        />
                      </RadioGroup>
                    </FormControl>
                    <div className={classes.divider} />
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Background</FormLabel>
                      <RadioGroup
                        aria-label="background"
                        name="background"
                        value={eventRoom.background}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          disabled={isLoading}
                          value="none"
                          control={<Radio color="primary" />}
                          label="None"
                        />
                        <FormControlLabel
                          disabled={isLoading}
                          value="UclMainQuad"
                          control={<Radio color="primary" />}
                          label="UCL Main Quad"
                        />
                        <FormControlLabel
                          disabled={isLoading}
                          value="Hall"
                          control={<Radio color="primary" />}
                          label="Hall"
                        />
                      </RadioGroup>
                    </FormControl>
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
        <Grid item md={3} xs={12}>
          <List component="nav" aria-label="meeting tables">
            <Typography variant="subtitle2">Table Objects</Typography>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Round Meeting Table" src={roundTable} />
              </ListItemAvatar>
              <ListItemText
                primary="Round Meeting Table"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Rectangular Meeting Table" src={rectangularTable} />
              </ListItemAvatar>
              <ListItemText
                primary="Rectangular Meeting Table"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateEventRoom;
