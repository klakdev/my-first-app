import React, { useEffect, useState } from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import Post from "./Post";
import createApi from "../api";
import NewPost from "./NewPost";


const api = createApi({
  host: "localhost",
  port: 3001,
})

const useStyles = makeStyles((theme) => ({
  postContainer: {
    width: "35%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
  },
  post: {
    padding: theme.spacing(2),
  }
}));

const Posts = () => {
  const styles = useStyles();  
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [user, setUser] = useState(null);

  
  const trackScrolling = () => {
    const wrappedElement = document.getElementById('posts-root');
    if (isBottom(wrappedElement)) {
      api.getPosts({ offset }).then((newPosts) => {
        console.log("post %j", newPosts);
        setPosts([...posts, ...newPosts]);
      })
      document.removeEventListener('scroll', trackScrolling);
    }
  };

  document.addEventListener('scroll', trackScrolling);


  const isBottom=(el) =>{
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  useEffect(() => {
  
    if(!posts.length) {
      api.getPosts({ offset }).then((newPosts) => {
        console.log("post %j", newPosts);
        setPosts(newPosts);
        setOffset(offset + newPosts.length);
      })
    }
  })

  useEffect(() => {
    if(!user) {
      api.getUser().then((user) => {
        console.log("user %j", user);
        setUser(user);
      })
    }
  })


  async function sendPost(postData) {
    const post = await api.sendPost(postData);
    console.log(post);
    setPosts([{post, user}, ...posts]);
  }

  return (
    <div className={styles.postContainer} id={"posts-root"}>
      <Grid direction={"column"} spacing={"8px"}>
      <NewPost 
        user={user}
        sendPost={sendPost}
      >
      </NewPost>
      {posts.map((post) => {
        return (
          <Grid className={styles.post}>
            <Paper>
              <Post
                post={post.post}
                user={post.user}
              >
              </Post>
            </Paper>
          </Grid>
        )
      })}
      </Grid>
    </div>
  )
}

export default Posts;