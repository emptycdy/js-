function show(type){
	var divs=document.getElementsByClassName('shopclass_show');
	for(i=0;i<divs.length;i++){
		var d=divs[i];
		d.style.display="block";
	}

}
function show1(type){
	var divs=document.getElementsByClassName('shopclass_show');
	for(i=0;i<divs.length;i++){
		var d=divs[i];
		d.style.display="none";
	}
}
function show3(type){
	var divs=document.getElementsByClassName('shopclass_list');
	for(i=0;i<divs.length;i++){
		var d=divs[i];
		d.style.display="none";
	}
	var divname=type;
	var div=document.getElementsByClassName(divname)[0];
	div.style.display="block";
}
function show4(type){
	var divs=document.getElementsByClassName('shopclass_list');
	for(i=0;i<divs.length;i++){
		var d=divs[i];
		d.style.display="none";
	}
}
function gb(){
	var login=document.getElementById('login');
	var register=document.getElementById('register');
	login.style.display="none";
	register.style.display="none";
	}
function kq(id){
	var login=document.getElementById('login');
	
	var register=document.getElementById('register');
	
	if (login==id) {
		login.style.display="block";
	}else{
		register.style.display="block";
	}
	}