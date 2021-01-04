const axios = require("axios");


module.exports = function({
  host, port,
}){

  const instance = axios.create({
    baseURL: `http://${host}:${port}`,
    headers: {'Cookie': 'userId=95c1cb7df28db479'},
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
      const { text, pictures } = postData;
      try {
        const response = await instance.post(`/post`, {
          text: text || "",
          pictures: pictures ? pictures.split(",") : []
        });
        return response.data;
      } catch(e) {
        console.error(e);
      }

    },
    async getUser() {
      try {
        const response = await instance({
          url: `/user/95c1cb7df28db479`,
        });
        return response.data;
      } catch(e) {
        console.error(e);
      }
    }
  }
}