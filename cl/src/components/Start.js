import '../App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import Footer from './Footer';
import JobList from './JobList';

function Start() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Header/>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            List of created jobs
          </Typography>
          <JobList />
        </Box>
        <Footer/>
      </Container>

    </ThemeProvider>
  );
}

export default Start;
