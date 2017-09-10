function ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function imageClick(e) {
	e.preventDefault();
	unzoomImages();
	this.classList.toggle('zoomed');
}

function handleEsc(e) {
	if (e.keyCode == 27 || (e.type === 'click' && e.target.nodeName.toLowerCase() !== 'img')) {
		unzoomImages();
	}
}

function unzoomImages() {
	var zoomedImages = document.querySelectorAll('img.zoomed');
	Array.prototype.forEach.call(zoomedImages, function(el, i) {
		el.classList.toggle('zoomed');
	});
}

function toggleHandler(toggle)
{
	toggle.addEventListener('click', function (e)
	{
		e.preventDefault();
		(this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
	});
}
	
ready(function() {
	// Hamburger Menu
	var toggles = document.querySelectorAll('.c-hamburger');
	for (var i = toggles.length - 1; i >= 0; i--)
	{
		var toggle = toggles[i];
		toggleHandler(toggle);
	}
	document.getElementById('nav-btn').addEventListener('click', function (event)
	{
		var nav = document.getElementById('nav-list');
		nav.classList.toggle('open');
		console.log(nav);
	}, false);

	// Open external links in new tabs
	var links = document.querySelectorAll('.content a');
	for (var i = 0, length = links.length; i < length; i++)
	{
		if (links[i].hostname != window.location.hostname)
		{
			links[i].target = '_blank';
		}
	}

	// Image zoom
	var images = document.querySelectorAll('article img');
	Array.prototype.forEach.call(images, function(el, i) {
		el.addEventListener('click', imageClick);
	});
	document.addEventListener('keyup', handleEsc);
	document.addEventListener('click', handleEsc);
});
