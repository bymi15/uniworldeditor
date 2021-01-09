import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  CircularProgress,
} from "@material-ui/core";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import AddIcon from "@material-ui/icons/Add";
import TableGrid from "../components/TableGrid";
import EventRoomService from "../services/EventRoomService";
import { Link as RouterLink } from "react-router-dom";

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
  progressLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  listItemCreate: {
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    backgroundColor: theme.palette.success.main,
    color: "#fff",
  },
}));

const EventRooms = (props) => {
  const classes = useStyles();
  const [eventRooms, setEventRooms] = React.useState([]);
  const [currentEventRoom, setCurrentEventRoom] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchEventRooms() {
      try {
        setLoading(true);
        const data = await EventRoomService.getAll();
        if (props.match.params.id) {
          for (let i = 0; i < data.length; i++) {
            if (data[i]._id === props.match.params.id) {
              setCurrentEventRoom(i);
              break;
            }
          }
        }
        setEventRooms(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchEventRooms();
  }, [props]);

  const handleClickEventRoom = (index) => {
    setCurrentEventRoom(index);
  };

  const handleClickRemove = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await EventRoomService.delete(id);
        setCurrentEventRoom(0);
        setEventRooms(eventRooms.filter((eventRoom) => eventRoom._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClickEdit = (index) => {
    console.log(eventRooms[index]);
  };

  return (
    <Container className={classes.mainSection}>
      <Typography variant="h4">Event Rooms</Typography>
      {isLoading ? (
        <div className={classes.progressLoader}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <List component="nav" aria-label="event rooms">
              <ListItem
                button
                component={RouterLink}
                to="/create"
                className={classes.listItemCreate}
              >
                <ListItemIcon>
                  <AddIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Create event room"
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>
              {eventRooms.length > 0 &&
                eventRooms.map((eventRoom, index) => (
                  <ListItem
                    key={eventRoom._id}
                    button
                    selected={currentEventRoom === index}
                    onClick={() => handleClickEventRoom(index)}
                  >
                    <ListItemIcon>
                      <DesktopWindowsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={eventRoom.title}
                      primaryTypographyProps={{ noWrap: true }}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.eventInfoPanel}>
              {eventRooms.length > 0 && !!eventRooms[currentEventRoom] ? (
                <React.Fragment>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {moment(eventRooms[currentEventRoom].eventDate).format(
                        "MMMM DD YYYY, h:mm a"
                      )}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {eventRooms[currentEventRoom].title}
                    </Typography>
                    <Typography color="textSecondary">
                      Hosted by {eventRooms[currentEventRoom].host}
                    </Typography>
                    <div className={classes.divider} />
                    <Grid container>
                      <Grid item md={8} xs={12} className={classes.centerTableGrid}>
                        <TableGrid tables={eventRooms[currentEventRoom].meetingTables} />
                        <div className={classes.divider} />
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Typography variant="subtitle2">Scene: </Typography>
                        <Typography variant="body2">
                          {eventRooms[currentEventRoom].scene}
                        </Typography>
                        <div className={classes.divider} />
                        <Typography variant="subtitle2">Background: </Typography>
                        <Typography variant="body2">
                          {eventRooms[currentEventRoom].background
                            ? eventRooms[currentEventRoom].background
                            : "None"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        handleClickEdit(currentEventRoom);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        handleClickRemove(eventRooms[currentEventRoom]._id);
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </React.Fragment>
              ) : (
                <Typography color="textSecondary" gutterBottom>
                  Create an event room
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default EventRooms;
