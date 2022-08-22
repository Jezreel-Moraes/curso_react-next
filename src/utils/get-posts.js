const getPhotosUrl = () => {
  const page = Math.floor(Math.random() * 100 + 1);
  return `https://api.pexels.com/v1/search/?page=${page}&per_page=50&query=nature`;
};

const get50Photos = () => {
  const headers = new Headers();
  headers.append("Authorization", process.env.REACT_APP_PEXELS_KEY);

  const options = {
    method: "GET",
    headers: headers,
    mode: "cors",
    cache: "default",
  };

  try {
    console.log("Usando a api de imagens");
    return fetch(getPhotosUrl(), options)
      .then((res) => res.json())
      .then((res) =>
        res.photos.map((photo) => {
          return photo.src.medium;
        })
      );
  } catch (error) {
    return [];
  }
};

export const loadPosts = async () => {
  const [photosUpTo50, photosUpTo100, posts] = await Promise.all([
    get50Photos(),
    get50Photos(),
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => res),
  ]);

  const photos = [...photosUpTo50, ...photosUpTo100];
  const cover =
    "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg";

  return posts.map((post, index) => {
    return photos.length > 0
      ? { ...post, cover: photos[index] }
      : { ...post, cover };
  });
};
