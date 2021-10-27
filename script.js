const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
async function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    // For Kanye, change quote to equal awaiting the api and make newQuote async
    try {const untrimmedQuote = await(await fetch('https://api.kanye.rest/')).json();
    // Check if author field is blank and replace it with 'Unknown'
    // if (!quote.author) {
    //     authorText.textContent = 'Unknown';
    // } else {
    //     authorText.textContent = quote.author;
    // }
    // Check quote length to determine styling

        const quote = untrimmedQuote.quote.trim();
        console.log(quote);
        
        if (quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        
        // Set quote, hide loader
        quoteText.textContent = quote
        removeLoadingSpinner();
    } catch (e) {
        newQuote();
    }
}

// Get quotes from API
// async function getQuotes() {
//     showLoadingSpinner();
//     const apiUrl = 'https://type.fit/api/quotes';
//     try {
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         newQuote();
//     } catch (e) {
//         // Catch error here
//         console.log(e)
//     }
// }

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
// getQuotes()
newQuote();