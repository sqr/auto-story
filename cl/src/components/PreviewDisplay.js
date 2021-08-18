import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  canvasTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  canvasBot: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  canvasWrapper: {
    position: 'relative',
    width: 540,
    height: 960,
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



function textResizer(canvas,context, text) {
  context.fillText(text, 35, 100)
  //context.fillText(text, 35, 200)

  var timeStep = (1/32);
  var time = 0;
  var frame = 0;

  function loop() {
    draw();

    time += timeStep;
    frame ++;

    requestAnimationFrame(loop);
}


  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var time = new Date();
    context.fillText(text, 100, Math.cos(time.getMilliseconds())+200)
    window.requestAnimationFrame(draw);
  }
  loop();
}

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
    
    ctx.font = "50px Arial";
    console.log(state.storyText)
    textResizer(canvas, ctx, state.storyText)
    ctx.fillText(state.storyText, 35, 750);
  })

  return (
    <div className={classes.canvasWrapper}>
      <canvas ref={canvasRef} id="textCanvas" width="540px" height="960px" className={classes.canvasTop}></canvas>
      <canvas id="myCanvas" width="540px" height="960px" className={classes.canvasBot}></canvas>
    </div>
  );
}
