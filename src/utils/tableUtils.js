import RoundTableImage from "../assets/img/roundtable.png";
import RectangularTableImage from "../assets/img/rectangulartable.png";

const getTableImage = (tableType) => {
  switch (tableType) {
    case "RoundMeetingTable":
      return RoundTableImage;
    case "RectangularMeetingTable":
      return RectangularTableImage;
    default:
      return RoundTableImage;
  }
};

const isCorner = (row, col) =>
  (row === 0 && col === 0) ||
  (row === 4 && col === 4) ||
  (row === 4 && col === 0) ||
  (row === 0 && col === 4);

const getTableIndex = (row, col, tables) => {
  for (let i = 0; i < tables.length; i++) {
    // convert (-2 to 2 range) coordinates into (0 to 4 range) coordinates
    const newX = Math.abs(tables[i].posX - 2);
    const newY = Math.abs(tables[i].posY - 2);
    if (newX === row && newY === col) {
      return i;
    }
  }
  return -1;
};

const toTablePos = (x) => (x - 2) * -1;

export { isCorner, getTableIndex, toTablePos, getTableImage };
