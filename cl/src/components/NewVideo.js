import '../App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import Footer from './Footer';
import ImageCrop from './ImageCrop';
import TextInput from './TextInput';
import PreviewDisplay from './PreviewDisplay';
import VideoDataContext from './VideoData/VideoData';

import { useState } from 'react';

function NewVideo() {
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const [storyText, setStoryText] = useState('Texto loler');
  const value = { storyText, setStoryText };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Header/>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            New Video
          </Typography>
        </Box>
        <VideoDataContext.Provider value={value}>
          <ImageCrop />
          <TextInput />
          <PreviewDisplay />
        </VideoDataContext.Provider>
        <Footer/>
      </Container>
    </ThemeProvider>
  );
}

export default NewVideo;
