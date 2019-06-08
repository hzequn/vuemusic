const express = require('express');
const axios = require("axios")
const app = express();
const apiRouter = express.Router();
const queryString=require('queryString')
console.log(123);
apiRouter.get('/getDissList', (req, res) => {
	//获取推荐歌曲数据
	res.setHeader('Access-Control-Allow-Origin','*');
	axios({
		method: 'get',
		url:"https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.7885979924369098&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=29",
		headers: {
			host: "c.y.qq.com",
			referer: "https://y.qq.com/"
		}
	}).then((response) => {
		res.json(response.data);
	})
})
apiRouter.get('/getLyric', (req, res) => {
	//获取歌词数据
	res.setHeader('Access-Control-Allow-Origin','*');
//	console.log(req.query)
	req.query.jsonpCallback="fn"
	const url='https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'+'?'+queryString.stringify(req.query)
	axios({
		method: 'get',
		url:url,
		headers: {
			host: "c.y.qq.com",
			referer: "https://y.qq.com/"
		}
	}).then((response) => {
		let string=response.data
		let start=string.indexOf('{');
		let end=string.indexOf('}')+1;
		string=string.slice(start,end)
		res.json(string);
	})
})
app.use('/api', apiRouter);

app.listen(7777);