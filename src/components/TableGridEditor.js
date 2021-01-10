import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Avatar } from "@material-ui/core";
import { isCorner, getTableIndex, toTablePos, getTableImage } from "../utils/tableUtils";
import TableDialog from "./TableDialog";
import { useReducerState } from "../utils/customHooks";

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
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItemFill: {
    background: "#ccc",
    "&:hover": {
      background: "#aaa",
    },
  },
}));

const TableGridEditor = ({ tables, updateMeetingTables }) => {
  const classes = useStyles();
  const dialogInitialState = {
    open: false,
    posX: 0,
    posY: 0,
  };
  const editDialogInitialState = {
    open: false,
    index: 0,
    table: undefined,
  };
  const [dialog, setDialog] = useReducerState(dialogInitialState);
  const [editDialog, setEditDialog] = useReducerState(editDialogInitialState);

  const submitDialog = (table) => {
    table = { ...table, posX: dialog.posX, posY: dialog.posY };
    setDialog(dialogInitialState);
    updateMeetingTables([...(tables || {}), table]);
  };

  const submitEditDialog = (table) => {
    const newTables = [...(tables || {})];
    newTables[editDialog.index] = table;
    setEditDialog(editDialogInitialState);
    updateMeetingTables(newTables);
  };

  const editTable = (index) => {
    setEditDialog({ open: true, index: index, table: tables[index] });
  };

  const addTable = (posX, posY) => {
    setDialog({
      open: true,
      posX: posX,
      posY: posY,
    });
  };

  const generateGridItems = () => {
    const gridItems = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const tableIndex = getTableIndex(row, col, tables);
        if (isCorner(row, col)) {
          gridItems.push(<div className={classes.gridItem}> </div>);
        } else if (tableIndex !== -1) {
          gridItems.push(
            <Button
              className={`${classes.gridItem} ${classes.gridItemFill}`}
              onClick={() => editTable(tableIndex)}
            >
              <Avatar src={getTableImage(tables[tableIndex].type)} />
            </Button>
          );
        } else {
          gridItems.push(
            <Button
              className={`${classes.gridItem} ${classes.gridItemFill}`}
              onClick={() => addTable(toTablePos(row), toTablePos(col))}
            >
               
            </Button>
          );
        }
      }
    }
    return gridItems;
  };

  return (
    <React.Fragment>
      <TableDialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false })}
        onSubmit={submitEditDialog}
        updateTable={editDialog.table}
      />
      <TableDialog
        open={dialog.open}
        onClose={() => setDialog({ open: false })}
        onSubmit={submitDialog}
      />
      <div className={classes.gridContainer}>
        {generateGridItems().map((gridItem, i) => (
          <React.Fragment key={i}>{gridItem}</React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TableGridEditor;
