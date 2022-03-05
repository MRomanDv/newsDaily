const gridContainer = document.querySelector('.grid-container')

//FECTH NEWS API

fetch("https://cnbc.p.rapidapi.com/news/v2/list-trending?tag=Articles&count=30", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "cnbc.p.rapidapi.com",
		"x-rapidapi-key": "eb76210f66msh463f9c7057ebbcap189092jsnadff012f3592"
	}
})
.then(res => res.json())
.then(data => {
	console.log(data)
	const arrayNews = data.data.mostPopularEntries.assets 
	arrayNews.map((eachNew,index)=>{
		const headline = eachNew.headline
		const img = eachNew.promoImage.url
		const newsDate = eachNew.shortDateFirstPublished
        const newsDataUrl = eachNew.section.url
		console.log(newsDataUrl)
		gridContainer.innerHTML += `
		<div class="grid-box">
                <div class="img">
				    <a href="${newsDataUrl}">
                    <img src="${img}">
					</a>
                </div>
                <div class="newsHeader">
                    <h4>${headline}</h4>
                </div>
                <div class="news-date">
                    <h5>${newsDate}</h5>
                </div>
            </div>
		
		`

	})
	
	
})
.catch(err => {
	console.error(err);
});
