class Song{
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

function filterSinger(singer){
    let ret = [];
    if(!singer){
        return ""
    }
    singer.forEach((s)=>{
        ret.push(s.name)
    });
    return ret.join('-')
}
export default function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		//http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=4258505107&vkey=3DA2ADC6D73432D8C2F8A44D13AB46907ED0AA3A5BC105A13EC1842275456D77CA8A00FE8392FD00E2FAEF10868B60984AEAC33872430AAD&uin=0&fromtag=66
   		url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=2276102528&vkey=C1D2551F2E9751DF16C64A8EBAE4FBB3B9C2952FC84449AE22A831ED14228A8896E47833A4B149ED850570823BDA516BC7A38302F3CB9736&uin=5554&fromtag=38`
		
    })
}
