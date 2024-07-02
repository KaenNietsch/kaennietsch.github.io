// searchbar.js

// Function to read data from .item elements and search within them
function searchItems(query) {
    const items = document.querySelectorAll('.item');
    const results = [];
    query = query.toLowerCase();

    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            results.push(item);
        }
    });

    return results;
}

// Function to perform the search
function performSearch(query) {
    if (window.location.pathname !== '/products.html') {
        // If we are not on the products.html page, navigate to it with the query as a URL parameter
        window.location.href = `/products.html?search=${encodeURIComponent(query)}`;
    } else {
        // If we are already on the products.html page, perform the search
        const results = searchItems(query);
        displayResults(results);
    }
}

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    const searchEventDiv = document.getElementById('SearchEvent');

    if (results.length === 0) {
        if (searchEventDiv) {
            searchEventDiv.style.display = 'block';
        } else {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'SearchEvent';
            noResultsDiv.textContent = 'No results found';
            resultsContainer.appendChild(noResultsDiv);
        }
    } else {
        if (searchEventDiv) {
            searchEventDiv.style.display = 'none';
        }
        results.forEach(result => {
            resultsContainer.appendChild(result.cloneNode(true));
        });
    }
}

// Event listener for the search input and button
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = event.target.value;
        performSearch(query);
    }
});

document.getElementById('searchBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    performSearch(query);
});

// If on products.html, check if there's a search query in the URL and perform the search
if (window.location.pathname === '/products.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        document.getElementById('searchInput').value = searchQuery;
        performSearch(searchQuery);
    }
};
