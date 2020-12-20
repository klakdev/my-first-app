import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Grid, Paper } from "@material-ui/core";
import Scroll, { Element } from "react-scroll";
import Post from "./Post";

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
  const [posts, usePosts] = useState(getPosts());

  const getPosts = () => {
    const posts = [];
    for (let index = 0; index < 10; index++) {
      posts.push({});
    }
    usePosts(posts);
  }
  

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles.postContainer}>
      <Grid direction={"column"} spacing={"8px"}>
      {posts.map(() => {
        return (
          <Grid className={styles.post}>
            <Paper>
              <Post/>
            </Paper>
          </Grid>
        )
      })}
      </Grid>
    </div>
  )
}

export default Posts;