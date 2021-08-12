import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import VideoDataContext from './VideoData/VideoData';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();

  const { storyText, setStoryText } = useContext(VideoDataContext);

  return (
    <div className={classes.root}>       
      <div>
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder={storyText}
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          name='storyText'
          onChange={e => setStoryText(e.target.value)}
        />
      </div>
    </div>
  );
}
