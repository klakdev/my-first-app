const axios = require("axios");


module.exports = function({
  host, port,
}){

  const instance = axios.create({
    baseURL: `http://${host}:${port}`,
  });

  async function uploadImage(image) {
    const response = await instance({
      url: "/post/signedUrl",
      params: {
        fileName: image.name,
      }
    });
  
    const { signedUrl, url } = response.data;
    const { type } = image;
    await axios.put(signedUrl, image, {
      headers: {
        'Content-Type': type
      }
    })
      .then(result => {
        console.log("Response from s3")
      })
      .catch(error => {
        console.error("ERROR ", error);
      })
    return url;
  }

  return {
    /**
     * 
     * @returns {Post[]}
     */
    getPosts: async function (params) {
      try {
        const response = await instance({
          url: "/post",
          params
        });
        return response.data.map((p) => {
          const { id: postId, date, pictures, text, user } = p;
          return {
            post: {
              id: postId,
              text,
              date,
              pictures,
            },
            user,
          }
        });
      } catch(e) {
        console.error(e);
      }
    },
    async sendPost(postData) {
      const { text, pictures } = postData;
      const urls = await Promise.all(
        pictures.map((picture) => {
          return uploadImage(picture);
      }))
      try {
        const response = await instance.post(`/post`, {
          text: text || "",
          pictures: urls
        });
        return response.data;
      } catch(e) {
        console.error(e);
      }
    },
    async login() {
      const num = Math.floor(Math.random() * 100000) + 1244; 
      try {
        const response = await instance.post("/user", {
          email: `yaki.klein${num}@gmail.com`,
          firstName: "yaki",
          lastName: "klein"
        }, {
          withCredentials: true 
        });
        return response.data;
      } catch(e) {
        console.error(e);
      }
    },
  }
}