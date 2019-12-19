var app = {
	verseCount: 0,
	chorusCount: 0,
	pushCount: 0,
	band: false,			// set to false for public lyrics
};

function f(a,b,c) {
	if (typeof c === "undefined") {
		c = "";
	}
	return {
		key: a,
		val: b,
		comment: c,
	}
}
function section(x,y) {
	if (!app.band) {
		return '';
	}
	var s = '<tr><td colspan="2" class="part">' + x.toUpperCase();
	if (y > 0) {
	    s+= ' ' + y;
	}
	return s + '</td></tr>';
}
function lyric(a,s,c) {
	return '<tr><td class="' + a + '">' + s + '</td><td class="comment" valign="top">' + c + '</td></tr>'
}
function FormatSong(x) {
	var a = document.getElementById("lyrics");
	var h = '<table align="center">';
	var spacer = '<tr><td height="15" colspan="2"></td></tr>';
	for (var i = 0; i < x.length; i++) {
		var s = x[i].val.replace(/(?:\r\n|\r|\n)/g, '<br>');
		var c = x[i].comment.replace(/(?:\r\n|\r|\n)/g, '<br>');
		switch (x[i].key) {
		case "title":
			h += '<tr><td colspan="2"><div class="title">' + x[i].val + '</div></td></tr>';
            document.title = x[i].val;
			break;
		case "author":
			h += '<tr><td colspan="2"><div class="author">Written By ' + x[i].val +
			     '</div></td></tr><tr>' + spacer;
			break;
		case "verse":
			++app.verseCount;
			h += section(x[i].key, app.verseCount) + lyric(x[i].key,s,c) + spacer;
			break;
		case "push":
			++app.pushCount;
			h += section(x[i].key, app.pushCount) + lyric(x[i].key,s,c) + spacer;
			break;
		case "chorus":
			++app.chorusCount;
			h += section(x[i].key, app.chorusCount) + lyric(x[i].key,s,c) + spacer;
			break;
		case "section":
			if (!app.band) {
				break;
			}
			h += '<tr><td><p class="part">' + x[i].val + '</p></td><td class="comment" valign="top">' + c + '</td></tr>' + spacer;
			break;
		case "":
			h += '<tr><td><p>' + s +
			     '</p></td><td class="comment" valign="top">' + c + '</td></tr>' + spacer;
			break;
		default:
			console.log('unrecognized key: ' + x[i].key);
			break;
		}
	}
	a.innerHTML = h + '</table>';
}
