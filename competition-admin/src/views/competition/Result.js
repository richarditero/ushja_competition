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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

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
      sort: "status",
    },
    {
      name: "Card type",
    },
    {
      name: "Download",
      sort: "download",
    },
    {
      name: "Download Invoice",
      sort: "invoice",
    },
    {
      name: "Resend Invoice",
      sort: "invoice",
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
    setRows((prevRows) =>
      prevRows.map((val) => {
        if (val.openCompetitionPaymentId === openCompetitionPaymentId) {
          val.resent = true;
          return val;
        }
        return val;
      })
    );

    ApiUtil.getWithToken(
      `open-competition/resendInvoice/${openCompetitionPaymentId}`
    ).then((result) => {
     
    }).catch((err)=>console.log(err));

  };

  return (
    <div className={classes.root}>
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
                  >
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
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <Row {...row} resendInvoice={resendInvoice} />
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
