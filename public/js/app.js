var searchInput = document.getElementById('topbar-search');
var searchResults = document.getElementsByClassName('search-results')[0];
searchInput.addEventListener('input', ()=>{
    const content = searchInput.value.trim();
    if (content && !hasClass(searchResults, 'show'))
        searchResults.classList.add('show');
    if (!content)
        searchResults.classList.remove('show');
});

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}