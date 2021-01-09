import moment from "moment";

const validateEventRoom = (eventRoom) => {
  return (
    eventRoom.title &&
    eventRoom.scene &&
    eventRoom.background &&
    eventRoom.host &&
    moment(eventRoom.eventDate).isValid() &&
    Array.isArray(eventRoom.meetingTables)
  );
};

export { validateEventRoom };
