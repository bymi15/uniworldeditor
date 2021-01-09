import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { isCorner, getTableIndex, getTableImage } from "../utils/tableUtils";

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

  const generateGridItems = () => {
    const gridItems = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const tableIndex = getTableIndex(row, col, tables);
        if (isCorner(row, col)) {
          gridItems.push(<div className={classes.gridItemBlank}> </div>);
        } else if (tableIndex !== -1) {
          gridItems.push(
            <div id={tableIndex} className={classes.gridItem}>
              <Avatar src={getTableImage(tables[tableIndex].type)} />
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
        {generateGridItems().map((gridItem, i) => (
          <React.Fragment key={i}>{gridItem}</React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TableGrid;
