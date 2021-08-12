import { createContext } from 'react';

const VideoDataContext = createContext({
  storyText: 'Textaso loler',
  setStoryText: () => {}
});

export default VideoDataContext;
