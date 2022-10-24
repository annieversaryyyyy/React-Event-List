import {createTheme} from "@mui/material";
import {purple} from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      }
    },
  },
  palette: {
    primary: {
      main: '#da2b40',
    },
  },
});

export default theme;