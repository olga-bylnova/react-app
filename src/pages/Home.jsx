import {useEffect, useRef, useState} from 'react';
import PostTile from "../components/PostTile.jsx";
import Navbar from "../components/Navbar.jsx";
import "../css/home.scss";
import {faEye, faMagnifyingGlass, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSearchParams} from "react-router-dom";
import {searchPosts} from "../services/postService.js";
import SortButton from "../components/SortButton.jsx";
import {BeatLoader} from "react-spinners";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [order, setOrder] = useState(searchParams.get("order") || "");

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);
    const isResetRef = useRef(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            try {
                const newPosts = await searchPosts(searchInput, sort, order, page);
                if (newPosts.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts(prev => isResetRef.current ? newPosts : [...prev, ...newPosts]);
                }
            } catch (err) {
                console.error("Failed to load posts", err);
            } finally {
                isResetRef.current = false;
                setLoading(false);
            }
        };

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        loadPosts();
    }, [page, searchParams]);

    useEffect(() => {
        setHasMore(true);
        setPosts([]);
        setPage(1);
        isResetRef.current = true;
    }, [searchParams]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isFirstRender.current) {
                    setPage(prev => prev + 1);
                }
            },
            {threshold: 1}
        );

        const target = observerRef.current;
        if (target) observer.observe(target);
        return () => target && observer.unobserve(target);
    }, [observerRef]);

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
                                ) : (!loading ? <span className="main-content-posts-not-found">No posts found.</span>
                                    : <BeatLoader/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <BeatLoader/>}
            <div ref={observerRef} style={{height: "1px"}}></div>
        </>
    );
}

export default Home;