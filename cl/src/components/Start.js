import '../App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function Start() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App v4-beta example
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Start;
