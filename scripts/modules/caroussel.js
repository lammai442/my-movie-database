// Funktion för att rendera trailers och hantera klickhändelser på pilarna
export function renderTrailers(movie, num) {
	// Skapar ett nytt <iframe>-element för att visa trailern
	const iFrameRef = document.createElement(`iframe`);

	// Lägger till klasser för styling och positionering, där num anger en unik identifierare
	iFrameRef.classList.add(`trailers__video`, `trailers__video-${num}`);

	// Sätter iframe-källan till filmens trailer-länk från movie-objektet
	iFrameRef.src = movie.Trailer_link;

	// Lägger till iframe-elementet i DOM:en, inuti .trailers__container
	document.querySelector(`.trailers__container`).appendChild(iFrameRef);

	// Hämtar alla trailers som just nu finns i DOM:en
	const trailerList = document.querySelectorAll(`.trailers__video`);

	// Konverterar NodeList till en array för enklare manipulation
	const trailerArray = Array.from(trailerList);

	// Hämtar alla pilar och lägger till en eventlistener för att byta trailer vid klick
	document.querySelectorAll(`.trailers__arrow`).forEach((arrow) => {
		arrow.addEventListener(`click`, (event) => {
			// Anropar funktionen changeTrailer när en pil klickas
			changeTrailer(event, trailerList, trailerArray);
		});
	});
}

// Funktion för att byta trailer beroende på vilken pil som klickas
function changeTrailer(event, trailerList, trailerArray) {
	// Om högerpil klickas, flytta första trailern till slutet av arrayen
	if (event.target.dataset.direction === `right`) {
		trailerArray.push(trailerArray.shift()); // Tar bort första elementet och lägger det sist

		// Om vänsterpil klickas, flytta sista trailern till början av arrayen
	} else if (event.target.dataset.direction === `left`) {
		trailerArray.unshift(trailerArray.pop()); // Tar bort sista elementet och lägger det först
	}

	// Tar bort alla nummerklasser (positioneringsklasser) från varje trailer
	trailerList.forEach((item) => {
		item.classList.remove(
			`trailers__video-1`,
			`trailers__video-2`,
			`trailers__video-3`,
			`trailers__video-4`,
			`trailers__video-5`
		);
	});

	// Lägger tillbaka de korrekta nummerklasserna för de första 5 elementen i arrayen
	trailerArray.slice(0, 5).forEach((item, i) => {
		item.classList.add(`trailers__video-${i + 1}`);
	});
}
