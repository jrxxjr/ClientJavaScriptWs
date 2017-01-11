/* Data: 20/07/2016 - Autor: Evaldo Junior */
function soap(parametro1, parametro2){
	
    	var str = '<?xml version="1.0" encoding="utf-8"?>'+
        		  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://localhost:8080/test">' +
                  '		<soapenv:Header/>' +
                  '   	<soapenv:Body>' +
                  '     <web:returnServico>' +
                  '     	<parametro1>' + parametro1 + '</parametro1>' +	
                  '         <parametro2>' + parametro2 + '</parametro2>' +
                  '     </web:returnServico>' +
                  '</soapenv:Body>' +
                  '</soapenv:Envelope>'; 
    	
    	var xhr = createCORSRequest("POST", "http://192.168.1.30:8080/test/TesteJavaEndPointService?wsdl"); 
    	if(!xhr){ 
    		console.log("XHR issue"); 
    		return; 
    	} 
    	 
		var results = xhr.responseText; 
		console.log(results);
		xhr.setRequestHeader('Content-Type', 'text/plain');		
		xhr.send(str);
		var x, i, xmlDoc, strSoap;
	    xmlDoc = xhr.responseXML;
	    strSoap = "";
	     
	    strSoap += 'Id: ' + xmlDoc.getElementsByTagName('cadastroId')[0].childNodes[0].nodeValue + '\n';
	    strSoap += 'Quantidade: ' + xmlDoc.getElementsByTagName('quantidade')[0].childNodes[0].nodeValue;
	    document.forms['testSoapRest']['txtSoap'].value=strSoap;
	    
}

function createCORSRequest(method, url) { 
	var xhr = new XMLHttpRequest(); 
	if ("withCredentials" in xhr) {
		xhr.open(method, url, false);
		
	} else if (typeof XDomainRequest != "undefined") { 
		xhr = new XDomainRequest();		
		xhr.open(method, url); 
		
	} else { 
		console.log("CORS not supported"); 
		alert("CORS not supported"); 
		xhr = null; 
	} 
	return xhr; 
} 

function rest(parametro1, parametro2){
	
	var url = "http://192.168.1.30:8080/test/testejavarest/" + parametro1 + "/" + parametro2;
	var xhr = createCORSRequest("GET", url); 
	if(!xhr){ 
		console.log("XHR issue"); 
		return; 
	} 
	 
	var results = xhr.responseText; 
	console.log(results);
	xhr.setRequestHeader('Content-Type', 'text/plain');		
	xhr.send(null);
	
	var x, i, xmlDoc, strRest;
    xmlDoc = xhr.responseXML;
    strRest = "";
    
    if (xhr.readyState == 4) {
    	if (xhr.status == 200) {    		
    		if (xmlDoc !=null ) {
    			strRest += 'Id: ' + xmlDoc.getElementsByTagName('cadastroId')[0].childNodes[0].nodeValue + '\n';
    		    strRest += 'Quantidade: ' + xmlDoc.getElementsByTagName('quantidade')[0].childNodes[0].nodeValue;
    		    document.forms['testSoapRest']['txtRest'].value=strRest;
    		 } else {
    			strRest = '';
    		    document.forms['testSoapRest']['txtRest'].value=strRest;
    		}
    	}
    }
}