/* console.log(location.search);
fetch('http://localhost:3000/song/url' + location.search, {
    method: "GET",
    mode: "cors"
})
    .then(function (result) {
        return result.json()
    })
    .then(function (data) {
        console.log(data);
        console.log(data.data[0].url);
        document.querySelector('audio').setAttribute('src', data.data[0].url);
    })

 */
function getLyric() {  //获取歌词
    return axios.get('http://localhost:3000/lyric' + location.search);
}
function getMusic() {  //获取音频
    return axios.get('http://localhost:3000/song/url' + location.search);
}
function getSongImg() {  //获取背景图
    return axios.get('http://localhost:3000/song/detail?ids=' + location.search.slice(4));
}

axios.all([getLyric(), getMusic(), getSongImg()])
    .then(axios.spread(function (LyricData, mysicData, songImgData) {
        document.querySelector('audio').setAttribute('src', mysicData.data.data[0].url);
        document.querySelector('.bg>img').setAttribute('src', songImgData.data.songs[0].al.picUrl);
        document.querySelector('.singerImg').style.background = 'url(' + songImgData.data.songs[0].al.picUrl + ')';
        document.querySelector('.singerImg').style.backgroundSize = 'cover';
        document.querySelector('.lyric>p').innerHTML = LyricData.data.lrc.lyric;

        //播放
        const myaudio = document.querySelector('#myaudio');
        const mydisc = document.querySelector('.disc');
        let clickNum = 0;
        mydisc.onclick = function () {
            if (myaudio.paused) {
                myaudio.play();
                pause();
                // mydisc.classList.remove('stop');
                // mydisc.classList.add('roll');
                mydisc.style.animationPlayState = 'running';
            } else {
                myaudio.pause();
                pause();
                // mydisc.classList.remove('roll');
                // mydisc.classList.add('stop');
                mydisc.style.animationPlayState = 'paused';
            }
        }

        const lyric = new window.Lyric(LyricData.data.lrc.lyric, function (obj) {
            console.log(obj.txt);
            document.querySelector('.lyric>p').innerHTML = obj.txt;
        })
        function play() {
            lyric.play()
        }

        function pause() {
            lyric.togglePlay()
        }

        function seek() {
            lyric.seek($input.value)
        }

        function stop() {
            lyric.stop()
        }



    }))









