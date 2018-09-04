function rem (){
	var html = document.documentElement
	var w =html.offsetWidth;
	html.style.fontSize = 100/750*w + "px";
}
rem();
window.onresize = rem;
function jump(){
	location="classify.html"
}
