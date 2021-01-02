import React, { useState } from "react";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import Post from "./Post";

const postInput = [{
  user: {
   id: "1234567890ab",
   firstName: "Tamar",
   lastName: "Berkovitz",
   email: "klein.yaki@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://www.meissl.com/media/images/8f24db1f/schweiz.jpg",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://i.malaysiakini.com/994/bd70d85b52365d439e1201f983f1d7d2.jpeg=s900",
      type: "image",
      title: "Some nice image"
    }],
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Yaki",
   lastName: "Klein",
   email: "klein.yaki@gmail.com",
   profilePicture: "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo",
  },
  post: {
    date: "September 26 2020",
    media: [{
      url: "https://www.natureindex.com/news-blog/image/5b175525847f4ad8bb7d97cb",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://www.brinknews.com/wp-content/uploads/2019/09/GettyImages-81794997.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Esti",
   lastName: "Rubin",
   email: "e.rubin@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://blog.nationalgeographic.org/wp-content/uploads/2020/05/May-11_Dorset-heathland_shutterstock_1332881306_sml-1140x450.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `This is an amazing picture I have taken`
  }
},{
  user: {
   id: "1234567890ab",
   firstName: "Tamar",
   lastName: "Berkovitz",
   email: "klein.yaki@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://www.meissl.com/media/images/8f24db1f/schweiz.jpg",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://i.malaysiakini.com/994/bd70d85b52365d439e1201f983f1d7d2.jpeg=s900",
      type: "image",
      title: "Some nice image"
    }],
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Yaki",
   lastName: "Klein",
   email: "klein.yaki@gmail.com",
   profilePicture: "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo",
  },
  post: {
    date: "September 26 2020",
    media: [{
      url: "https://www.natureindex.com/news-blog/image/5b175525847f4ad8bb7d97cb",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://www.brinknews.com/wp-content/uploads/2019/09/GettyImages-81794997.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Esti",
   lastName: "Rubin",
   email: "e.rubin@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://blog.nationalgeographic.org/wp-content/uploads/2020/05/May-11_Dorset-heathland_shutterstock_1332881306_sml-1140x450.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `This is an amazing picture I have taken`
  }
},{
  user: {
   id: "1234567890ab",
   firstName: "Tamar",
   lastName: "Berkovitz",
   email: "klein.yaki@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://www.meissl.com/media/images/8f24db1f/schweiz.jpg",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://i.malaysiakini.com/994/bd70d85b52365d439e1201f983f1d7d2.jpeg=s900",
      type: "image",
      title: "Some nice image"
    }],
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Yaki",
   lastName: "Klein",
   email: "klein.yaki@gmail.com",
   profilePicture: "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo",
  },
  post: {
    date: "September 26 2020",
    media: [{
      url: "https://www.natureindex.com/news-blog/image/5b175525847f4ad8bb7d97cb",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://www.brinknews.com/wp-content/uploads/2019/09/GettyImages-81794997.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Esti",
   lastName: "Rubin",
   email: "e.rubin@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://blog.nationalgeographic.org/wp-content/uploads/2020/05/May-11_Dorset-heathland_shutterstock_1332881306_sml-1140x450.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `This is an amazing picture I have taken`
  }
},{
  user: {
   id: "1234567890ab",
   firstName: "Tamar",
   lastName: "Berkovitz",
   email: "klein.yaki@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://www.meissl.com/media/images/8f24db1f/schweiz.jpg",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://i.malaysiakini.com/994/bd70d85b52365d439e1201f983f1d7d2.jpeg=s900",
      type: "image",
      title: "Some nice image"
    }],
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Yaki",
   lastName: "Klein",
   email: "klein.yaki@gmail.com",
   profilePicture: "https://lh3.googleusercontent.com/ogw/ADGmqu-pwHEOTj0WSDdjvNS48YAf47SprbVrJ8aLoUkdXRo=s32-c-mo",
  },
  post: {
    date: "September 26 2020",
    media: [{
      url: "https://www.natureindex.com/news-blog/image/5b175525847f4ad8bb7d97cb",
      type: "image",
      title: "Some nice image"
    }, {
      url: "https://www.brinknews.com/wp-content/uploads/2019/09/GettyImages-81794997.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
  }
}, {
  user: {
   id: "1234567890ab",
   firstName: "Esti",
   lastName: "Rubin",
   email: "e.rubin@gmail.com",
   profilePicture: null,
  },
  post: {
    date: "September 24 2020",
    media: [{
      url: "https://blog.nationalgeographic.org/wp-content/uploads/2020/05/May-11_Dorset-heathland_shutterstock_1332881306_sml-1140x450.jpg",
      type: "image",
      title: "Some nice image"
    }],
    text: `This is an amazing picture I have taken`
  }
}]

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
  function getPosts() {
    return postInput;
  }
  const [posts, usePosts] = useState(getPosts());

  return (
    <div className={styles.postContainer}>
      <Grid direction={"column"} spacing={"8px"}>
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