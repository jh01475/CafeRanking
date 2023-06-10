import '../css/SearchTab.css'
import { useState } from 'react';
import axios from 'axios';

function SearchTab() {
    var [searchURL, setSearchURL]=useState('')

    const searchData= async()=>{
        searchURL = searchURL.replaceAll("boardtype=I",'boardtype=L');
        searchURL = searchURL.replaceAll("boardtype=C",'boardtype=L');
        
        //입력받은 URL 유효성 검사
        const urlPattern = /^(http|https):\/\/cafe\.naver\.com\/ArticleList\.nhn\?search\.clubid=\d+&search\.menuid=\d+&search\.boardtype=[A-Z]$/;
        if (!urlPattern.test(searchURL)) {
            alert('올바른 url 주소를 입력하세요!');
            return;
        }

        alert(searchURL+'검색!')
        window.location.href=`/search?cafe=${searchURL}&ie=utf8`

        try {
            await axios.get('/search', {params: {url: searchURL}});
            console.log('검색 요청 전송');
        } catch (error) {
            console.error('검색 요청 실패:', error);
        }        
    }

    return (
        <div className="search-tab">
            <input type='url' id='url' name='url'
                placeholder="주소를 입력하세요"
                onChange={e => setSearchURL(e.target.value)} required="required" />
            <button onClick={searchData}>검색</button>
        </div>
    )
}

export default SearchTab;