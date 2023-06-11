const express = require('express');
const app = express();  // 서버 생성
const PORT = process.env.PORT || 4000;  // 포트 설정
const db=require('./config/db.js')  // db.js에서 연결정보 가져옴
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');
const axios = require("axios");
const moment = require("moment");


app.get('/', (req, res) => {
    console.log('/root')
    res.send(`<서버> 크롤링 결과 : /article`)
})

app.get('/search', (req, res) => {
    var pagenum = 1;    
    var display = "&userDisplay=50"
    var page = "&search.page="
    const searchURL = req.query.url + display + page + pagenum;
    console.log('검색 URL:', searchURL);

    async function cr(searchURL) {

        var titlearr = [];
        var articleNumber = [];
        var uploadDate = [];
        var articleView = [];
        var articleLike = [];
        var articleDet = [];
        var score = [];
        var link = [];
        var newDate = moment();
        var time = newDate.format('YYYY.MM.DD');
        //console.log(time);
        var year = parseFloat(time.substr(0, 4));
        //console.log(year);
        var month = parseFloat(time.substr(5, 2));
        //console.log(month);
        var day = parseFloat(time.substr(8, 2));
        //console.log(day);
        var endmonth = month - 1;
        
        var at = 51;
        var area = 4;

        for (var t = 0; t < 10; t++) {
            console.log("페이지 " + (t + 1));
            var stop = 0;

            const response = await axios.get(searchURL, { responseEncoding: 'binary', responseType: 'arraybuffer' });
            const htmlString = response.data;
            const decodeContents = (iconv.decode(htmlString, 'EUC-KR').toString());
            const $ = cheerio.load(decodeContents);

            at = $("#main-area > div:nth-child("+area+") > table > tbody > tr").length+1;

            for (var i = 1; i < at; i++) {
                
                if ($("#main-area > div:nth-child(2)").attr('class') == 'sub_info_box') {
                    //console.log($("#main-area > div:nth-child(2)").attr('class')); 
                    area = 5;
                }

                var title = $("#main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_article > div.board-list > div > a.article").text();
                title = title.replaceAll('\n', 'n');
                title = title.replaceAll(' ', 't');
                title = title.replaceAll('nttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttnnttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttntttttttttttttttttttttttttttttttttttt', '');
                title = title.replaceAll('nttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttnnttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttttttntttttttttttttttttttttttttttttttttttt', '');
                title = title.replaceAll('nttttttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttntttttttttttttttttttttttttttt', '');
                title = title.replaceAll('nttttttttttttttttttttttttttttttttnttttttttttttttttttttttttttttttttn', '');
                title = title.replaceAll('t', ' ');
                title = title.replaceAll("'", "\\'");
                titlearr.push(title);

                var an = $(" #main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_article > div.board-number > div.inner_number").text();
                articleNumber.push(an);

                var ud = $(" #main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_date").text();

                if (ud.includes(":")) {
                    var dt = 0;
                    ud = newDate.format('YYYY.MM.DD');
                    var articleYear = parseFloat(ud.substr(0,4));
                    var articleMonth = parseFloat(ud.substr(5,2));
                    var articleDay = parseFloat(ud.substr(8,2));
                } else {
                    var articleYear = parseFloat(ud.substr(0, 4));
                    //console.log(articleYear);
                    var articleMonth = parseFloat(ud.substr(5, 2));
                    //console.log(articleMonth);
                    var articleDay = parseFloat(ud.substr(8, 2));
                    //console.log(articleDay);
                    var dt = moment([year, month - 1, day]).diff(moment([articleYear, articleMonth - 1, articleDay]), 'days');
                }
                uploadDate.push(ud);

                // 최대 한 달치
                if(endmonth == articleMonth){
                    if(day > articleDay){
                        stop = 1;
                    }                        
                }
                else if(endmonth > articleMonth){
                    stop = 1;
                }

                //console.log("날짜 = " + dt);
                var articlescore = dt * (-10);

                // 조회 수
                var av = $(" #main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_view").text();
                av = av.replaceAll(',', '');

                if (av.includes(".")) {
                    av = av.replaceAll('.', '')
                    av = av.replaceAll('만', '000')
                }
                else {
                    av = av.replaceAll('만', '0000')
                }
                articleView.push(av);
                articlescore += parseFloat(av) * 0.3;
                //console.log(articlescore);

                // 댓글 수
                var det = $("#main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_article > div.board-list > div > a.cmt > em").text();
                articleDet.push(det);

                if (det == "") {
                    //console.log("댓글 없음");
                }
                else {
                    articlescore += parseFloat(det) * 0.3
                    //console.log(articlescore);
                }

                // 추천 수
                var al = $(" #main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_likes").text();
                articleLike.push(al);
                if (al == "") {
                    //console.log("추천 없음");
                }
                else {
                    articlescore += parseFloat(al) * 0.4;
                    //console.log(articlescore);
                }
                var l = "https://cafe.naver.com" + $(" #main-area > div:nth-child("+area+") > table > tbody > tr:nth-child(" + i + ") > td.td_article > div.board-list > div > a").attr('href');
                link.push(l);

                score.push(articlescore);
            }

            pagenum++;
            searchURL = req.query.url + display + page + pagenum;
            
            if(stop == 1){
                break;
            }
            
            if(at != 51){
                break;
            }
        }

        return [titlearr, articleNumber, uploadDate, articleView, articleLike, articleDet, score, link];
    };

    cr(searchURL).then((arr) => {
        console.log("총 게시글: "+arr[0].length);

        db.getConnection(function (err, db) {
            if (!err) {
                db.query("DROP TABLE article;");
                db.query("CREATE TABLE article (num int not null auto_increment primary key, articleNumber varchar(20), title varchar(255), uploadDate varchar(20), articleView varchar(10), articleLike varchar(10), articleDet varchar(10), score decimal(10,2), link varchar(200))DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");

                for (var i = 0;i<arr[0].length;i++) {
                    db.query("insert into article values(NULL,'" + arr[1][i] + "', '" + arr[0][i] + "','" + arr[2][i] + "', '" + arr[3][i] + "', '" + arr[4][i] + "', '" + arr[5][i] + "', '" + arr[6][i] + "', '" + arr[7][i] + "')", function (error, results, fields) {
                        if (error)
                            throw error;
                    });
                }
            }
        });
    });
    res.send('검색 완료');
})

app.get('/article', (req, res) => {
    console.log('/article')
    db.query(`select * from article order by score desc`, (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)
        }
        else {
            console.log(err)
        }
    })
})

app.get('/article/daily', (req, res) => {
    console.log('/article/daily')
    db.query(`SELECT * FROM article WHERE DATE(uploadDate) = CURDATE() ORDER BY score DESC LIMIT 10`, (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)           
        }
        else {
            console.log(err)
        }
    })
})

app.get('/article/weekly', (req, res) => {
    console.log('/article/weekly')
    db.query(`SELECT * FROM article WHERE uploadDate BETWEEN DATE_ADD(NOW(), INTERVAL - 1 WEEK) AND NOW() ORDER BY score DESC LIMIT 10`, (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)
        }
        else {
            console.log(err)
        }
    })
})

app.get('/article/monthly', (req, res) => {
    console.log('/article/monthly')
    db.query(`SELECT * FROM article WHERE uploadDate BETWEEN DATE_ADD(NOW(), INTERVAL - 1 MONTH) AND NOW() ORDER BY score DESC LIMIT 20`, (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)
        }
        else {
            console.log(err)
        }
    })
})

app.use((req, res, next) => {
    res.status(404).send("404 Not Found")
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}`)
})

