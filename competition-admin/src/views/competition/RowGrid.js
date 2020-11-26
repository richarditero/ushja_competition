import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Grid,
  Typography,
  Box,
  Tooltip,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GetAppIcon from '@material-ui/icons/GetApp';

const useRowStyles = makeStyles({
  gridDeatilsrow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridDeatilscolumn: {
    flex: '0 1 auto',
    margin: 3,
  },
  gridDataText: {
    color: '#7c7c7c',
    fontWeight: 600,
    margin: 1,
  },
  gridHeadDataText: {
    fontWeight: 600,
    margin: 1,
  },
});

export default function RowGrid(props) {
  const classes = useRowStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className={classes.gridDataText}>
          {props.competitionName}
        </TableCell>
        <TableCell className={classes.gridDataText}>{props.username}</TableCell>
        <TableCell className={classes.gridDataText}>
          {props.userEmail}
        </TableCell>
        <TableCell className={classes.gridDataText}>
          {props.transactionId}
        </TableCell>
        <TableCell className={classes.gridDataText}>
          {props.compFormName}
        </TableCell>
        <TableCell className={classes.gridDataText}>{props.location}</TableCell>
        <TableCell className={classes.gridDataText}>
          {props.amount}
          {' '}
          {props.currency}
        </TableCell>
        <TableCell align="center">
          <Tooltip title={props.status === 'succeeded' ? 'Success' : 'Failed'}>
            {props.status === 'succeeded' ? (
              <ThumbUpIcon style={{ color: 'green' }} />
            ) : (
              <ThumbDownIcon style={{ color: 'red' }} />
            )}
          </Tooltip>
        </TableCell>

        <TableCell align="center">
          <Tooltip title={props.uploadedDocument ? 'download file' : 'file not available'}>
            <GetAppIcon
              href={props.uploadedDocument}
              style={{ color: props.uploadedDocument ? 'black' : '#777777', cursor: 'pointer' }}
              onClick={() => {
                if (props.uploadedDocument) {
                  const link = document.createElement('a');
                  link.href = props.uploadedDocument;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            />
          </Tooltip>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, background: '#f6f2f2' }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} style={{ minHeight: '50px' }}>
              {props.open_competition_purchaseds.map((item, index) => (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Grid container direction="row">
                      <Typography
                        variant="body2"
                        className={classes.gridHeadDataText}
                      >
                        Event:
                      </Typography>
                      <Typography
                        variant="body2"
                        className={classes.gridDataText}
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Grid container direction="row">
                      <Typography
                        variant="body2"
                        className={classes.gridHeadDataText}
                      >
                        Quantity:
                      </Typography>
                      <Typography
                        variant="body2"
                        className={classes.gridDataText}
                      >
                        {item.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Grid container direction="row">
                      <Typography
                        variant="body2"
                        className={classes.gridHeadDataText}
                      >
                        Amount:
                      </Typography>
                      <Typography
                        variant="body2"
                        className={classes.gridDataText}
                      >
                        {item.amount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
