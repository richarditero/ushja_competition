import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Results from './Result';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Competition = () => {
  const classes = useStyles();
  const [searchquery, setSearchQuery] = useState('');
  const [pageLoader, setPageLoader] = useState(false);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handlePageLoder = (loader) => {
    setPageLoader(loader);
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      <Backdrop className={classes.backdrop} open={pageLoader}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Toolbar
        onSearchClick={(query) => {
          setSearchQuery(query);
        }}
        query={searchquery}
        handlePageLoder={handlePageLoder}
      />
      <Box mt={3}>
        <Results
          searchquery={searchquery}
          clearSearch={clearSearch}
          handlePageLoder={handlePageLoder}
        />
      </Box>
    </Container>
  );
};

export default Competition;
