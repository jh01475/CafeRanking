import '../css/Header.css'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='container'>
            <div className="header">
                <h1><div><Link to='/'>네이버 카페 게시물 랭킹 사이트</Link></div></h1> 
            </div>
        </div>
    )
}

export default Header;