const axios = require("axios");


module.exports = function({
  host, port,
}){
  return {
    /**
     * 
     * @returns {Post[]}
     */
    getPosts: async function (params) {
      try {
        const response = await axios({
          baseURL: `http://${host}:${port}/post`,
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
    sendPost() {

    }
  }
}