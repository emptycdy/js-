fetch("http://localhost:3000/personalized/newsong", {
	method: "GET",//get获取 post上传 delete删除 update更新
	mode: "cors" //cors跨域  no-cors不跨域
})
	.then(r => {
		if (r.status == 200) {
			return r.json()
		}
	})
	.then(data => {
		console.log(data.result)
		let string = ""
		data.result.forEach(value => {
			if (value.song.alias[0] == undefined) {
				value.song.alias[0] = '';
			}
			string +=
				`
		<a href="play.html?id=${value.id}">
			<li>
				<h3>${value.name}</h3>
				<p>${value.song.album.name}-${value.song.artists[0].name}</p>
				<div class="btn_play"></div>
			</li>
		</a>
		`
		})
		$(".new_song>ul").innerHTML = string
	})