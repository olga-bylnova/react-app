import {getPosts} from './postServiceData.js';

const postSearchQuery = ((post, query) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.text.toLowerCase().includes(query.toLowerCase()));

export const searchPosts = async (query, sort, order) => {
    const posts = await getPosts(sort, order);
    const q = query.trim();
    if (q) {
        return posts.filter(post => postSearchQuery(post, q));
    }
    return posts;
};