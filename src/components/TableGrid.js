import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    gridGap: "5px",
    gridTemplateColumns: "repeat(5, 75px)",
    gridTemplateRows: "repeat(5, 75px)",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(5, 50px)",
      gridTemplateRows: "repeat(5, 50px)",
    },
    gridAutoFlow: "row",
  },
  gridItem: {
    background: "#ccc",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItemBlank: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const TableGrid = ({ tables }) => {
  const classes = useStyles();

  const isCorner = (row, col) =>
    (row === 0 && col === 0) ||
    (row === 4 && col === 4) ||
    (row === 4 && col === 0) ||
    (row === 0 && col === 4);

  const getTableIndex = (row, col) => {
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

  const generateGridItems = () => {
    const gridItems = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const tableIndex = getTableIndex(row, col);
        if (isCorner(row, col)) {
          gridItems.push(<div className={classes.gridItemBlank}> </div>);
        } else if (tableIndex !== -1) {
          gridItems.push(
            <div id={tableIndex} className={classes.gridItem}>
              x
            </div>
          );
        } else {
          gridItems.push(<div className={classes.gridItem}> </div>);
        }
      }
    }
    return gridItems;
  };

  return (
    <React.Fragment>
      <div className={classes.gridContainer}>
        {generateGridItems().map((gridItem) => (
          <React.Fragment>{gridItem}</React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TableGrid;
