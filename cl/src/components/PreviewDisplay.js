import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import VideoDataContext from './VideoData/VideoData';


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
  canvas: {
    width: 500,
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    boxShadow: "0px 2px 5px rgba(255, 255, 255, 0.7)",
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

    var background = new Image();
    background.src = 'https://i.pinimg.com/originals/6d/07/66/6d076650ee81383131f07c887b9ea0f0.jpg'
    ctx.drawImage(background,0,0);   
    ctx.font = "100px Arial";
    ctx.fillText(state.storyText, 35, 150);
  })

  return (
    <div>
      <canvas ref={canvasRef} id="myCanvas" width="540px" height="960px" className={classes.canvas}></canvas>
    </div>
  );
}
