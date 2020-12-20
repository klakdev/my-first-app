import Posts from "./Posts";
import AppBar from "./Appbar";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#ebeded",
      default: "#6b9cae"
    },
    primary:{
      main: "#6b9cae"
    },
    divider: "green"
  }
})

const useStyles = makeStyles((theme) => ({
  body: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "8px",
  },
}));
function App() {
  const styles = useStyles();
  return (
    <div className={styles.body}>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Posts/>
      </ThemeProvider>
    </div>
  );
}

export default App;
