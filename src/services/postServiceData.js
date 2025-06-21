const MAIN_API_URL = 'http://localhost:3000/posts';
const VIEWS = "statistics.views";
const LIKES = "statistics.likes";

export const getPosts = async (sort, order, page = 1) => {
  const params = new URLSearchParams();

  if (sort === "views") {
    params.append("_sort", VIEWS);
  } else if (sort === "likes") {
    params.append("_sort", LIKES);
  }

  if (order) {
    params.append("_order", order);
  }

  if (page) {
    params.append("_page", page);
  }

  const url = `${MAIN_API_URL}?${params.toString()}`;
  const response = await fetch(url);
  return await response.json();
};