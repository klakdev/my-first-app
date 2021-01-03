const createApi = require("./index");

async function getPost() {
  const api = createApi({
    host: "localhost",
    port: "3001",
  });
  const posts = await api.getPosts({ offset: 2 });
  console.log(posts);
}

getPost().catch(err => {
  console.error(err)
}).then(() => getPost({ offset: 9 }));