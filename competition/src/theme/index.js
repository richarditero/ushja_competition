import {createMuiTheme, colors} from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      // dark
      light: '#63ccff',
      main: '#006db3',
      res: '#AE132A',
      blue: '#00468B',
      yellow: '#FFC423'
    },
    secondary: {
      main: '#006db3',
      red: '#EC5269',
      blue: '#0073E4',
      yellow: '#FCF3DB',
      lightBlue: '#2B96FF'
    },
    neutral: {
      darkNavy: '#001325',
      grey: '#687F95',
      offWhite: '#FBFDFF',
      white: '#FFFFFF'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
