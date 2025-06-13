import {useEffect, useState} from 'react';
import PostTile from "../components/PostTile.jsx";
import Navbar from "../components/Navbar.jsx";
import "../css/home.scss";
import {faEye, faMagnifyingGlass, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSearchParams} from "react-router-dom";
import {searchPosts} from "../services/postService.js";
import SortButton from "../components/SortButton.jsx";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [order, setOrder] = useState(searchParams.get("order") || "");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await searchPosts(searchInput, sort, order);
                setPosts(posts);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchParams({
            search: searchInput,
            sort: sort,
            order: order
        });
    };

    const handleSortChange = (sortType, sortOrder = "asc") => {
        setSort(sortType);
        setOrder(sortOrder);

        updateSearchParams({
            search: searchInput,
            sort: sortType,
            order: sortOrder
        });
    };

    const updateSearchParams = (params = {}) => {
        const newParams = new URLSearchParams();

        if (params.search) newParams.set("search", params.search);
        if (params.sort) newParams.set("sort", params.sort);
        if (params.order) newParams.set("order", params.order);

        setSearchParams(newParams);
    };

    return (
        <>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="background-container">
                    <div className="container">
                        <Navbar></Navbar>
                        <div className="main-content-container">
                            <div className="main-content">
                                <div className="main-content-navigation">
                                    <div className="main-content-navigation__sort">
                                        <div className="main-content-navigation__sort-label">
                                            Sorting:
                                        </div>
                                        <SortButton sortKey="views" icon={faEye} activeSort={sort} activeOrder={order}
                                                    onSortChange={handleSortChange}/>
                                        <SortButton sortKey="likes" icon={faThumbsUp} activeSort={sort}
                                                    activeOrder={order}
                                                    onSortChange={handleSortChange}/>
                                    </div>
                                    <div className="main-content-navigation__search">
                                        <form className="main-content-navigation__search-form"
                                              onSubmit={(e) => handleSearch(e)}>
                                            <button type="submit" className="main-content-navigation__search-icon">
                                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                            </button>
                                            <input type="text" name="search" placeholder="Search"
                                                   onChange={(e) => setSearchInput(e.target.value)}
                                                   value={searchInput}/>
                                        </form>
                                    </div>
                                </div>
                                <div className="main-content-posts">
                                    {(posts.length > 0) ? (
                                        posts.map((post) => (
                                            <PostTile post={post} key={post.id}></PostTile>
                                        ))
                                    ) : <span className="main-content-posts-not-found">No posts found.</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;