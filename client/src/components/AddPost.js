import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Avatar, Backdrop, Container, Fade, Grid, InputAdornment, Modal } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  body:{
    height: "100%",
    margin: 0,
},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 2, 10, 2),
    height: "40%",
    width: "35%",
    marginBottom: "19%",
    maxWidth: "100%",
    margin: "auto",
  },
  textbox :{
    marginRight: "auto",
    marginLeft: "auto",
    maxWidth: "100%",
  },
  text: {
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.primary.main
  },
  avatar: {
    paddingRight: "20px"
  }
}));

export default function AddPost(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal }
        open={props.open}
        onClose={() => props.onClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Container >
              <Grid container={"column"}>
                <Grid item spacing={4} height="100%">
                  <div className={classes.avatar}>
                    <Avatar
                      src={"https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s320-c-mo"}
                    >
                        {"YK"}
                    </Avatar>
                  </div>
                </Grid>
                <Grid item spacing={4}>
                  <div className={classes.textbox}>
                    <TextField
                      id="outlined-textarea"
                      variant="outlined"
                      label="What is on your mind..."
                      multiline
                      rowsMax={10}
                      rows={10}
                    />
                  </div>
                </Grid>
                
                
              </Grid>
            </Container>
            
            
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}