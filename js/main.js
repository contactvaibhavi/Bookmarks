// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(event){
	
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl))
		{
			alert('Please fill all the details');
        	return false;
        }

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	console.log(bookmark);
    
    /*
    localStorage.setItem('test', 'Hello');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    if(localStorage.getItem('bookmarks') === null)
    {
    	var bookmarks = [];
    	bookmarks.push(bookmark);

    	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else
    {
    	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    	bookmarks.push(bookmark);

    	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();
    fetchBookmarks();

    //Prevents form from submitting
	event.preventDefault();
	return true;
}

function deleteBookmark(url)
{
	console.log(url);

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(i=0 ; i < bookmarks.length; i++)
	{
		if(bookmarks[i].url == url)
			bookmarks.splice(i, 1);
	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

function fetchBookmarks()
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));


	var bookmarkResults = document.getElementById('bookmarksResults');

	bookmarkResults.innerHTML = '';
	for(i = 0; i < bookmarks.length; i++)
	{
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarkResults.innerHTML += '<div class="well">'+
			'<h3>' + name + 
			'<a class="btn btn-default" target="_blank" href="'+url+'">Go</a>'+
			'<a onclick = "deleteBookmark(\''  + url +  '\')" class = "btn btn-danger" href="#">Delete</a>' +
			'</h3>' + 
			'</div>';
	}
}

function validateForm(siteName, siteUrl)
{
	if(!siteName || !siteUrl)
	{
		alert('Form is incomplete');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(! siteUrl.match(regex))
	{
		alert('Invalid URL!');
		return false;
	}

	return true;
}