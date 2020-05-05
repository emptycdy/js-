fetch("http://localhost:3000/personalized", {
	method: "GET",
	mode: "cors"
})
	.then(r => r.json())
	.then(data => {
		//console.log(data.result.slice(0,6))
		let string = ""
		data.result.slice(0, 6).forEach(value => {
			string +=
				`
		<li>
			<img src="${value.picUrl}" alt="">
			<p>${value.name}</p>
		</li>
		`
		})
		$(".recommand_song>ul").innerHTML = string
	})