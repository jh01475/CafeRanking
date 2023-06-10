import '../css/SelectDayType.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';

function SelectDayType() {

////////////////////// 크롤링한 주소를 보여줌
    useEffect(() => {
        const queryObj = queryString.parse(window.location.search)
        console.log(queryObj)
        console.log(queryObj.cafe)
    },[]);
////////////////////////////////////////

////////////////////// 서버로부터 크롤링 데이터를 가져옴
    const [boardList, setBoardList] = useState([])

    useEffect(() => {
        getBoard()
    }, [])

    const getBoard = async() => {
        const result=await axios('/article')
        console.log(result)     // localhost:4000/article 데이터가 뜨면 성공!
        console.log(result.data)    // 배열로 표기
        setBoardList(result.data)   // 받은 데이터를 state에 저장
    }
///////////////////////////////////////////////////////


    const [selectDayType, setSelectDayType]=useState(['daily','weekly','monthly'])

    const searchDailyData=()=>{        
        alert(selectDayType[0]+'검색!')
        window.location.href=`/rank/${selectDayType[0]}`
    }

    const searchWeeklyData=()=>{        
        alert(selectDayType[1]+'검색!')
        window.location.href=`/rank/${selectDayType[1]}`
    }

    const searchMonthlyData=()=>{        
        alert(selectDayType[2]+'검색!')
        window.location.href=`/rank/${selectDayType[2]}`
    }


    return(
        <div className="container">
            <div className="daytype">
                <div className="day">
                    <button onClick={searchDailyData}>일간 GO!</button>
                </div>

                <div className="week">
                    <button onClick={searchWeeklyData}>주간 GO!</button>
                </div>

                <div className="month">
                    <button onClick={searchMonthlyData}>월간 GO!</button>
                </div>
            </div>            
        </div>
    )
}

export default SelectDayType;