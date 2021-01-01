let generate = document.querySelector('.generate');
let tweet = document.querySelector('.tweet');
let quote = document.querySelector('.quote');
let error = document.querySelector('.error');
let author = document.querySelector('.author');
let spinner = document.querySelector('.spinner');

generate.addEventListener('click', getQuote);

function getText(quotes) {
	quote.textContent = quotes;
}
function getAuthor(authors) {
	author.textContent = authors;
}

// async function
async function getQuote() {
	spinner.classList.remove('hidden');
	generate.disabled = true;

	try {
		let data = await fetch('https://api.quotable.io/random');
		let json = await data.json();
		getText(`${json.content}`);
		getAuthor(` ~ ${json.author}`);
		tweetIt(`${json.content}  ~  ${json.author}`);
	} catch (err) {
		error.textContent = 'Error occured! try again';
		// remove the error message after 3 sec
		setTimeout(function () {
			error.textContent = '';
		}, 3000);
	} finally {
		spinner.classList.add('hidden');
		generate.disabled = false;
	}
}

function tweetIt(quote) {
	tweet.setAttribute('href', `https://twitter.com/share?text=${quote}`);
}

getQuote();
