const axios = require("axios");


module.exports = function({
  host, port,
}){

  const instance = axios.create({
    baseURL: `http://${host}:${port}`,
  })
  
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
      const { text } = postData;
      try {
        const response = await instance.post(`/post`, {
          text: text || "",
          pictures: [
            "https://klakdev-my-first-app.s3.amazonaws.com/girl-447701_1920.jpg",
            "https://klakdev-my-first-app.s3.amazonaws.com/road-5904909_1920.jpg"
          ]
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
        });
        return response.data;
      } catch(e) {
        console.error(e);
      }
    }
  }
}