import '../css/PostList.css'
import Post from './Post.js'

function PostList(props) {
    const result = props.boardList?.length > 0 ? (
        props.boardList.map((data, index) => (
            <Post
                key={data.articleNumber}
                rank={index + 1}
                no={data.articleNumber}
                title={data.title}
                link={data.link}
                score={data.score}
                date={data.uploadDate} />))
    ) : (
        <h4>선택한 기간의 데이터 없음!</h4> 
    )

    return (
        <div className="postlist">
            {result}
        </div>
    )
}

export default PostList;