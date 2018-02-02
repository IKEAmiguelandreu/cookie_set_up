/*VAR DECLARATION*/
var c_val, ca, cc, cname, cvalue, d, expires, url_switch, preferedID, preferedID_text, preferedID_url, cookie_Check, addAlign, marco, urlMarco;

/*SET COOKIE IF YOU NEED TO MODIFY IT*/
function setCookie() {
		cname = "locationPreference";
		cvalue= "https://www.ikea.com/es/es/";
		d = new Date();
		d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
		expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
	}


/*EVENT HANDLE, MAIN FUNCTION THAT DISTRIBUTES make CALL TO IT*/
function getCookie(){
	if(sessionStorage.nopopup){}
		else{
			cc = document.cookie.split(";");
			for(i = 0; i< cc.length; i++){ 
				ca = cc[i].split("=");
				if(ca[0]=="locationPreference" || ca[0]==" locationPreference"){
					revisarCookie(ca[1]);
					i = cc.length+1;
				}
				else{}
			}
		}
	}

/*CHECKS IF A CUSTOMER COMES FROM IKEA ISLANDS*/
function checkURL(){
	url_switch = document.location.href.split("/");
	if (url_switch[url_switch.length-1]=="?switch"){
		setCookie();
	}
	else{
		getCookie();
	}
}

/*DECIDES IF POP UP SHOULD VE SHOWN OR NOT*/
function revisarCookie(c_val){
	if(!sessionStorage.nopopup){
		if(c_val=="http://www.ikea.com/es/es/" || c_val=="http://ca.ikea.com/es/ca/" || c_val=="http://eu.ikea.com/es/eu/" || c_val =="https://www.ikea.com/es/es/" || c_val=="https://ca.ikea.com/es/ca/" || c_val=="https://eu.ikea.com/es/eu/"){
			setCookie();
		}
		else if(c_val=="http://www.baleares.ikea.es/" || c_val=="http://www.canarias.ikea.es/" || c_val=="https://www.baleares.ikea.es/" || c_val=="https://www.canarias.ikea.es/"){
			if(c_val=="http://www.baleares.ikea.es/" || c_val=="https://www.baleares.ikea.es/") {
				preferedID_text = "Baleares";
				preferedID_url = "http://www.baleares.ikea.es/?switch";
			}
			else if(c_val=="http://www.canarias.ikea.es/" || c_val=="https://www.canarias.ikea.es/"){
				preferedID_text = "Canarias";
				preferedID_url = "http://www.canarias.ikea.es/?switch";
			} 
			preferedID = [preferedID_text, preferedID_url];
			drawPopUp(preferedID);
		}
		else{
		}
	}
	else{}
}

/*HANDLE POPUP FUNCTIONS*/
function drawPopUp(preferedID){
	document.getElementById("preferedLoc_1").innerHTML = preferedID[0];
	document.getElementById("preferedLoc_2").innerHTML = preferedID[0];
	document.getElementById("preferedLoc_3").innerHTML = preferedID[1];
	var popup = document.getElementById("geoPopup");
	popup.style.display= "block";
}

/*WHEN USER DECIDES TO KEEP IN PENINSULA WEB*/
function changeValue(){
	setCookie();
	callToIslands();
	document.getElementById("geoPopup").style.display="none";
}

/*REDIRECT TO CUSTOMER PREFERED LOCATION*/
function moveTo(){
	window.location.replace(preferedID_url);
}

/*THIS FUNCTION WORKS WHEN CUSTOMER SKIPS POPUP*/
function omitirPopup(){
	sessionStorage.nopopup = 1;
	document.getElementById("geoPopup").style.display="none";
}

/*OPEN COOKIE ALIGN IN ISLANDS*/
function callToIslands(addAlign){
	addAlign = document.getElementsByClassName("footer-legal")[0];
	marco = document.createElement("iframe");
	urlMarco = "https://canarias.ikea.es/?switch=es";
	marco.src = urlMarco;
	marco.style.display="none";
	marco.style.width = "1px";
	marco.style.height = "1px";
	addAlign.appendChild(marco);
}

/*THIS FUNCTION WORKS WHEN CUSTOMER CLICKS ON ISLANDS IN HEADER*/
function redirectTo(islands_url){
	cc = document.cookie.split(";");
		for(i = 0; i< cc.length; i++){ 
			ca = cc[i].split("=");
			if(ca[0]=="locationPreference" || ca[0]==" locationPreference"){
				cookie_Check = ca[1];
				i = cc.length+1;
			}
		}
		if (cookie_Check=="http://www.ikea.com/es/es/" || cookie_Check=="http://ca.ikea.com/es/ca/" || cookie_Check=="http://eu.ikea.com/es/eu/" || cookie_Check=="https://www.ikea.com/es/es/" || cookie_Check=="https://ca.ikea.com/es/ca/" || cookie_Check=="https://eu.ikea.com/es/eu/"){
			islands_url+= "?switch";
			if(islands_url=="http://www.canarias.ikea.es/?switch"){
				cname = "locationPreference";
				cvalue= "http://www.canarias.ikea.es/";
				d = new Date();
				d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
				expires = "expires="+d.toUTCString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
			}
			else if(islands_url=="http://www.baleares.ikea.es/?switch"){
				cname = "locationPreference";
				cvalue= "http://www.baleares.ikea.es/";
				d = new Date();
				d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
				expires = "expires="+d.toUTCString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
			}
		}
		else{}
		document.location.href = islands_url;
}