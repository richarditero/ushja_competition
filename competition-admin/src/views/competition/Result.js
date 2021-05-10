import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ApiUtil from "../../util/ApiUtil";
import Row from "./RowGrid";
import { useDispatch } from "react-redux";
import {
  showSuccessSnackbar,
  showFailureSnackbar,
} from "../../store/action/snackbarAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    fontWeight: 600,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      style={{ background: "#f6f2f2" }}
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Competition
      </Typography>

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
    color: theme.palette.common.black,
  },
  header: {
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function EnhancedTable({ searchquery, handlePageLoder }) {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("competitionName");
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHeader = [
    {
      name: "Name",
      sort: "competitionName",
    },
    {
      name: "User name",
      sort: "username",
    },
    {
      name: "e-mail",
      sort: "userEmail",
    },
    {
      name: "Transaction Id",
      sort: "transactionId",
    },
    {
      name: "Date",
      sort: "date",
    },
    {
      name: "Form name",
      sort: "compFormName",
    },
    {
      name: "Location",
      sort: "location",
    },
    {
      name: "Total amount",
      sort: "amount",
    },
    {
      name: "Status",
    },
    {
      name: "Card type",
    },
    {
      name: "Uploaded File",
    },
    {
      name: "Download Invoice",
    },
    {
      name: "Resend Invoice",
    },
  ];

  useEffect(() => {
    fetchTableData();
  }, [page, rowsPerPage, orderBy, order]);

  const fetchTableData = () => {
    handlePageLoder(true);
    ApiUtil.getWithToken(
      `open-competition?search=&limit=${rowsPerPage}&offset=${page}&orderby=${orderBy}&order=${order}`
    ).then((result) => {
      if (result.status === 200) {
        setTotal(result.data.count);
        setRows(result.data.rows);
        handlePageLoder(false);
      }
    });
  };

  const handleRequestSort = (event, property) => {
    const changesOrder =
      orderBy !== property ? "asc" : order === "asc" ? "desc" : "asc";
    setOrderBy(property);
    setOrder(changesOrder);
  };

  const resendInvoice = ({ openCompetitionPaymentId }) => {
    dispatch(showSuccessSnackbar("Invoice email resent successfully"));

    ApiUtil.getWithToken(
      `open-competition/resendInvoice/${openCompetitionPaymentId}`
    )
      .then((result) => {})
      .catch((err) => console.log(err));
  };

  const deleteUploadedFile = ({ openCompetitionPaymentId }) => {
    setIsAlertOpen(true);
    setFileToDelete(openCompetitionPaymentId);
  };

  const deleteApi = () => {
    ApiUtil.deleteWithToken(`open-competition/deleteFile/${fileToDelete}`)
      .then((result) => {
        setRows((r) =>
          r.map((val) => {
            if (val.openCompetitionPaymentId === fileToDelete) {
              val.uploadedDocument = null;
            }
            return val;
          })
        );
        setFileToDelete("");
        dispatch(showSuccessSnackbar("Deleted successfully"));
      })
      .catch((err) => {
        setFileToDelete("");
        dispatch(showFailureSnackbar("Something went wrong"));
      });
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={isAlertOpen}
        onClose={() => {
          setIsAlertOpen(false);
          setFileToDelete("");
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure do you want to delete this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsAlertOpen(false);
              setFileToDelete("");
            }}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              setIsAlertOpen(false);
              deleteApi();
            }}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead style={{ background: "#f6f2f2" }}>
              <TableRow>
                {tableHeader.map((header, index) => (
                  <TableCell
                    key={`${index}${header.name}`}
                    className={classes.header}
                    sortDirection={false}
                  >
                    {header.sort ? (
                      <TableSortLabel
                        active={orderBy === header.sort}
                        direction={
                          orderBy !== header.sort
                            ? "desc"
                            : order === "asc"
                            ? "asc"
                            : "desc"
                        }
                        onClick={(e) => handleRequestSort(e, header.sort)}
                      >
                        {header.name}
                      </TableSortLabel>
                    ) : (
                      <div>{header.name}</div>
                    )}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <Row
                  {...row}
                  resendInvoice={resendInvoice}
                  deleteUploadedFile={deleteUploadedFile}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchquery ? rows.length : total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
