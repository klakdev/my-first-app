import React, { useState } from 'react';
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


/**
 * 
 * @param {object} props 
 * @param {User} props.user 
 */
export default function NewPost(props) {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    text: null,
    pictures: null
  })
  const [isModalOpen, setModalOpen] = useState(false);

  const { user } = props;
  if(!user) {
    return <div></div>
  }


  function sendPost() {
    setModalOpen(false);
    props.sendPost(postData)
    setPostData({
      text: null,
      pictures: null
    })
  }

  function updatePostData(data) {
    setPostData({
      text: data.text || postData.text,
      pictures: data.pictures || postData.pictures
    })
  }

  return (
    <div className={classes.root}>
      <TextField
        size="medium"
        id="outlined-textarea"
        placeholder="What is on your mind..."
        variant="outlined"
        onClick={() => setModalOpen(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <Avatar 
                  src={user.profilePicture}
                >
                  {user.firstName.substr(0, 1) + user.lastName.substr(0, 1)}
              </Avatar>
            </InputAdornment>
          ),
        }}
      >  
      </TextField>
      <AddPost 
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onChange={updatePostData}
        onPost={sendPost}
        postData={postData}
        user={user}
      />
    </div>
  );
}