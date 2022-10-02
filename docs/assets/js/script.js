var passwordLengt = 8;
var segmentlength = 0;
var lengthKey     = "" ;

var specialList = [" ", "!", "\"", "#", "$", "%", "&", "\'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\", "]","^","_","`","{","|","}","~" ];
var charList    = ["a", "b", "c", "d", "e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
var numberList  = ["1","2","3"];

var optionList  = [
  {optionId:"includeLower", optionValue:true},
  {optionId:"includeUpper", optionValue:true},
  {optionId:"includeNumber", optionValue:true},
  {optionId:"includeSpecialChar", optionValue:true}  
];


// Código de asignación
var generateBtn = document.getElementById("generate");
var copyBtn= document.getElementById("copy")
var passwordText = document.getElementById("password");

var num = 0;



function getChar(elementList){
  var stringChar = "";

  if ( elementList != null && elementList.length > 0 ) {
    var index = Math.floor(Math.random()*elementList.length);
    stringChar = elementList[index];
  }
  
  return stringChar;
}



function validatePasswordLengt(){

  var lrtn = prompt("¿Escriba la longitud deseada de su contraseña? (Longitud minima 8 - maxima 128)", passwordLengt);
  if (lrtn === null || isNaN(lrtn) || lrtn < 8 || lrtn > 128) {
    return false;
  }
  passwordLengt = lrtn;
  return true;
}

function includeSegment(mensaje, llave){
  

  var index = optionList.findIndex(element => element.optionId===llave );

  if (index!=null && index >=0){    
    //implementacion prompt
    /*
    var lrtn = prompt(mensaje+ "S=Si / N=No", "S");
    if (lrtn === null || lrtn.length===0 || lrtn.toUpperCase == "N" ){
      optionList[index].optionValue = false;
    } 
    else{
      optionList[index].optionValue = true;
    }
    segmentlength = segmentlength + (optionList[index].optionValue ? 1 :0);
    */
    //implementacion prompt

    optionList[index].optionValue = confirm(mensaje);
    segmentlength = segmentlength + (optionList[index].optionValue ? 1 :0);
  }
  
  return;
}




function copyText(){
  var element = document.getElementById("password");  
  element.select();
  element.setSelectionRange(0,99999);
  navigator.clipboard.writeText(element.value);
  messageBox("Contraseña copiada.");
  
  return;
}

function messageBox(message){
  var divmessagebox = document.getElementById("snackbar");
  divmessagebox.textContent =message;
  divmessagebox.className = "show";
  setTimeout( function () {divmessagebox.className = divmessagebox.className.replace("show","");}, 2000

  );
  return;
}


function generatePassword(){
  num ++;
  
  console.log(num);
  
  segmentlength = 0;
  /*Validar condiciones*/
  if (!validatePasswordLengt()){
    messageBox("Longitud ó tipo de dato no valido \n Proceso cancelado.");
    return false;
  }
  else
  {
    /*Que segmentos incluir*/
    includeSegment("¿Incluir letras minusculas?","includeLower");
    includeSegment("¿Incluir letras mayusculas?","includeUpper");
    includeSegment("¿Incluir numeros?","includeNumber");
    includeSegment("¿Incluir caracteres especiales?","includeSpecialChar");    
    if (segmentlength<=0){
      messageBox("No selecciono opciones para generar contraseña. \n Proceso cancelado.");
      return false;
    }
  }

  lengthKey = "" ;
  var i=0;

  while ( lengthKey.length < passwordLengt ) {
      
    while( i < optionList.length && (lengthKey.length < passwordLengt)){

        switch (optionList[i].optionId){
          case "includeLower"  :
            lengthKey = lengthKey.concat( optionList[i].optionValue ?  getChar(charList) : "");
            break;
          case "includeUpper" :
            lengthKey = lengthKey.concat(optionList[i].optionValue ?  getChar(charList).toUpperCase() : "");
            break;
          case "includeNumber" :
            lengthKey = lengthKey.concat( optionList[i].optionValue ?  getChar(numberList) : "");
            break;
          case "includeSpecialChar" :
            lengthKey = lengthKey.concat(optionList[i].optionValue ?  getChar(specialList) : "");
            break;            
        }
        i++;
    }
      i=0;
  }
  
  return true;
}

function resetText(){
  
  passwordText.value = "";
  copyBtn.style.visibility="hidden";

  return;
}

// Escriba la contraseña en la entrada #password
function writePassword() {

  var resetValues = resetText();  

  if (generatePassword())
  {
    copyBtn.style.visibility="visible";
    passwordText.value = lengthKey;
    generateBtn.textContent = "Generar nueva contraseña";

    messageBox("Proceso terminado.")
    
  }
  else
  {
    
    passwordText.value="";
    copyBtn.style.visibility="hidden";
    generateBtn.textContent = "Generar contraseña";
    
  }
  return;
}

// Agregar oyente de eventos para generar el botón
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click",copyText);