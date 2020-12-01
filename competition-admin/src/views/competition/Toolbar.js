import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Download from './download';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchButton: {
    height: 'fit-content',
    marginLeft: theme.spacing(1),
    fontWeight: 600,
  },
}));

const Toolbar = ({
  className,
  onSearchClick,
  query,
  handlePageLoder,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchquery, setsearchquery] = useState('');

  useEffect(() => {
    setsearchquery(query);
  }, [query]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box
              display='flex'
              justifyContent='flex-end'
              alignItems='center'
            >
              {/* <Box
                maxWidth={500}
                display='flex'
                flexDirection='row'
                alignItems='center'
              >
                <TextField
                  value={searchquery}
                  onChange={(e) => {
                    setsearchquery(e.target.value);
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Search competition'
                  variant='outlined'
                />
                <Button
                  color='primary'
                  variant='contained'
                  className={classes.searchButton}
                  onClick={() => onSearchClick(searchquery)}
                >
                  Search
                </Button>
              </Box> */}
              <Download handlePageLoder={handlePageLoder} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
