import "../css/postTile.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons'

function PostTile({post}) {
    return (
        <div className="post-tile-container">
            <div className="post-tile__title">
                {post.title}
            </div>
            <div className="post-tile__text">
                {post.text}
            </div>
            <div className="post-tile__description">
                <div className="post-tile__description--views">
                    <FontAwesomeIcon icon={faEye}/> <span>{post.statistics.views}</span>
                </div>
                <div className="post-tile__description--likes">
                    <div>
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <span>{post.statistics.likes}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faThumbsDown}/>
                        <span>{post.statistics.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default PostTile;