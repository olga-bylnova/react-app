const MAIN_API_URL = 'http://localhost:3000/posts';
const SORT_BY = "?_sort=";
const ORDER_BY = "&_order=";
const VIEWS = "statistics.views";
const LIKES = "statistics.likes";

export const getPosts = async (sort, order) => {
  let url = MAIN_API_URL;

  if (sort === "views") {
    url += `${SORT_BY}${VIEWS}${ORDER_BY}${order}`;
  } else if (sort === "likes") {
    url += `${SORT_BY}${LIKES}${ORDER_BY}${order}`;
  }

  const response = await fetch(url);
  return await response.json();
};