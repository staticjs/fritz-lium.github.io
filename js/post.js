/**
 * Created by fritz on 1/23/14.
 */
$(document).ready(function () {
	var sTitle = getURLParams()['title'];
	var target = 'posts';
	getContentMeta(target, function (meta) {
		var extension = meta['extension'];
		var files = meta['files'];
		var post = findPost(files, sTitle);
		var pFile = post['path'] + extension;
		getContentFile(target, pFile, function (content) {
			post.content = content;
			renderPost(post);
		});
	});
});

function renderPost(post) {
	$('title').text(post.title);
	console.log(post.content);
}

function findPost(files, sTitle, pFile) {
	pFile = pFile || '';
	var post;
	for (var key in files) {
		if (key === '.') {
			post = _.find(files[key], match);
			if (post) post.path = pFile + sTitle;
		} else {
			post = findPost(files[key], sTitle, pFile + key + '/');
		}
		if (post) break;
	}
	return post || null;
	function match(post) {
		return toSnakeCase(post['title']) === sTitle;
	}
}
