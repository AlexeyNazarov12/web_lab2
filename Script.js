function ajax_request(url, callback_fun) {
		var xmlhttp = new XMLHttpRequest();
				
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				try {
					var result = JSON.parse(xmlhttp.responseText);
				} catch(err) {
					console.log(err.message + " in " + xmlhttp.responseText);
					return;
				}
				callback_fun(result);
			}
		};
				
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function show_posts(data) {
	for (var item in data) {
		var id_post = data[item].id;
	
		var id_user = data[item].userId;
		var title = data[item].title;
		var body = data[item].body;
				
		var inner_text = "<h2>" + title + "</h2>";
		inner_text += "<p>Post #" + id_post;
		inner_text += "<p>Posted by User #" + id_user;
		inner_text += "<p>" + body;
				
		var post_elem = document.createElement("div");
		post_elem.className  = "post";
		post_elem.id = id_post;
		post_elem.innerHTML = inner_text;
					
		post_elem.style.border = "2px solid";
		post_elem.style.padding = "5px";
		post_elem.style.margin = "5px";
		
		ajax_request('http://jsonplaceholder.typicode.com/comments?postId=' + id_post, show_comments);
		
		main_elem = document.getElementById("result");
		main_elem.appendChild(post_elem);
	}
}

function show_comments(data) {
	for (var item in data) {
		var id_comm = data[item].id;
		var id_post = data[item].postId;
		
		var name = data[item].name;
		var email = data[item].email;
		var body_comm = data[item].body;
					
		var inner_text_comm = "<h3>" + name + "</h3>";
		inner_text_comm += "<p>Comment #" + id_comm;
		inner_text_comm += "<p>E-mail of User: " + email;
		inner_text_comm += "<p>" + body_comm;
					
		var comm_elem = document.createElement("div");
		comm_elem.className  = "comment";
		comm_elem.id = id_comm; 
		comm_elem.innerHTML = inner_text_comm;
					
		comm_elem.style.border = "2px solid";
		comm_elem.style.margin = "5px 5px 5px 25px";
		comm_elem.style.padding = "5px";
		
		var post_elem = document.getElementsByClassName("post");
		if (post_elem.length > 1) post_elem[Number(id_post) - 1].appendChild(comm_elem);
		else post_elem[0].appendChild(comm_elem);
	}
}
			
function button_fun() {
	var main_div = document.getElementById("result");
				
	if (main_div.childNodes.length > 0)  
		while (main_div.firstChild) 
			main_div.removeChild(main_div.firstChild);
						
	var id_post = document.getElementById("id_value").value != "" ? "?id=" + document.getElementById("id_value").value : "";
				
	ajax_request('http://jsonplaceholder.typicode.com/posts' + id_post, show_posts);
}