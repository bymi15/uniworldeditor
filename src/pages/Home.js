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
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import UniWorldScreenShotImg from "../assets/img/uniworldscreenshot.png";
import TableGrid from "../components/TableGrid";
import EventRoomService from "../services/EventRoomService";

const useStyles = makeStyles((theme) => ({
  jumbo: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  mainSection: {
    paddingTop: theme.spacing(5),
  },
  eventInfoPanel: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  img: {
    width: "100%",
  },
  divider: {
    padding: theme.spacing(1),
  },
  centerTableGrid: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [eventRooms, setEventRooms] = React.useState([]);
  const [currentEventRoom, setCurrentEventRoom] = React.useState(0);

  React.useEffect(() => {
    async function fetchEventRooms() {
      try {
        const data = await EventRoomService.getAll();
        console.log(data);
        setEventRooms(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEventRooms();
  }, []);

  const handleClickEventRoom = (index) => {
    setCurrentEventRoom(index);
  };

  return (
    <React.Fragment>
      <Paper>
        <Container>
          <Grid container className={classes.jumbo}>
            <Grid item md={8} xs={12}>
              <Typography variant="h2">UniWorld Editor</Typography>
              <Typography variant="subtitle1">
                This is a web editor tool for managing event rooms in the{" "}
                <a
                  href="https://brianmin.tech/UnityWebGL/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  UniWorld platform
                </a>
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <img src={UniWorldScreenShotImg} alt="" className={classes.img} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container className={classes.mainSection}>
        <Typography variant="h4">Event Rooms</Typography>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <List component="nav" aria-label="event rooms">
              {eventRooms.length > 0 &&
                eventRooms.map((eventRoom, index) => (
                  <ListItem
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
              {eventRooms.length > 0 ? (
                <React.Fragment>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {moment(eventRooms[currentEventRoom].eventDate).format(
                        "MMMM Do YYYY, h:mm a"
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
                    <Button size="small">Edit</Button>
                    <Button size="small">Remove</Button>
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
      </Container>
    </React.Fragment>
  );
};

export default Home;
