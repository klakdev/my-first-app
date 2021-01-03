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

  useEffect(() => {
    
    if(!posts.length) {
      api.getPosts({ offset: 0 }).then((newPosts) => {
        console.log(newPosts);
        setPosts(newPosts);
      })
    }
  })

  return (
    <div className={styles.postContainer}>
      <Grid direction={"column"} spacing={"8px"}>
        <NewPost />
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