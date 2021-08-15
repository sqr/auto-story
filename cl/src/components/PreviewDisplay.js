import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import VideoDataContext from './VideoData/VideoData';
import zIndex from '@material-ui/core/styles/zIndex';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    backgroundColor: 'white',
  },
  canvasTop: {
    position: 'absolute',
    top: 3500,
    left: 0,
    zIndex: 1,
  },
  canvasBot: {
    position: 'absolute',
    top: 3500,
    left: 0,
    zIndex: 0,
  },
  input: {
    display: 'none',
  },
}));

export default function SimplePaper() {
  const classes = useStyles();
  const canvasRef = React.useRef(null)

  const state = useContext(VideoDataContext);

  React.useEffect(() => {
    var canvas = canvasRef.current
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* var background = new Image();
    background.src = 'https://i.pinimg.com/originals/6d/07/66/6d076650ee81383131f07c887b9ea0f0.jpg'
    ctx.drawImage(background,0,0);    */
    
    ctx.font = "100px Arial";
    ctx.fillText(state.storyText, 35, 150);
  })

  return (
    <div>
      <canvas ref={canvasRef} id="textCanvas" width="540px" height="960px" className={classes.canvasTop}></canvas>
      <canvas id="myCanvas" width="540px" height="960px" className={classes.canvasBot}></canvas>
    </div>
  );
}
