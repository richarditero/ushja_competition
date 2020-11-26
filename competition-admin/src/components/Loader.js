import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader() {
  const { loader } = useSelector((state) => state.loader);

  return (
    <div>
      {loader && <CircularProgress size={50} className="spinnerStyle" />}
    </div>
  );
}
