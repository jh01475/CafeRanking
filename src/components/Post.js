import '../css/Post.css'

function Post(props) {
    const post_rank = props.rank;

    return(
        <div className="post">
            <span className="post-rank">
                {post_rank}위
            </span>
            
            <span>
                {props.no}
            </span>

            <span>
                <a href ={props.link}>
                    {props.title}
                </a>
            </span>

            <span>
                {props.score}점
            </span>

            <span>
                {props.date}
            </span>
        </div>
    )
}

export default Post;