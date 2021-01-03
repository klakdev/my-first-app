import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, InputAdornment } from '@material-ui/core';
import AddPost from "./AddPost";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setDisabled] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);


  return (
    <div className={classes.root}>
      <TextField
        id="outlined-textarea"
        placeholder="What is on your mind..."
        variant="outlined"
        onClick={() => setModalOpen(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar
                src={"https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s320-c-mo"}
              >
                  {"YK"}
              </Avatar>
            </InputAdornment>
          ),
        }}
      >  
      </TextField>
      <AddPost 
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}