import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
}));

export default function SimplePaper() {
  const classes = useStyles();
  const canvasRef = React.useRef(null)
  function draw() {
    var canvas = canvasRef.current
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Hello World",10,50);
  }

  return (
    <div>
    <canvas ref={canvasRef} id="myCanvas" className={classes.root} onClick={draw}></canvas>
    </div>
  );
}