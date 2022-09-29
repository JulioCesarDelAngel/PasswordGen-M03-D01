var passwordLengt = 8;
var segmentlength = 0;
var lengthKey     = "" ;

var specialList = [" ", "!", "\"", "#", "$", "%", "&", "\'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\", "]","^","_","`","{","|","}","~" ];
var charList    = ["a", "b", "c", "d", "e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
var numberList  = ["1","2","3"];

var optionList  = [
  {optionId:"includeLower", optionValue:false},
  {optionId:"includeUpper", optionValue:true},
  {optionId:"includeNumber", optionValue:false},
  {optionId:"includeSpecialChar", optionValue:false}  
];


// Código de asignación
var generateBtn = document.querySelector("#generate");
var copyBtn= document.getElementById("copy")

// Escriba la contraseña en la entrada #password
function writePassword() {
  
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Agregar oyente de eventos para generar el botón
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click",copyText)

function generatePassword(){

  /*Validar condiciones*/
  if (!validatePasswordLengt()){
    return 'Longitud ó tipo de dato no valido \n Proceso cancelado.';
  }
  else
  {
    /*Que segmentos incluir*/
    includeSegment("¿Incluir letras minusculas?","includeLower");
    includeSegment("¿Incluir letras mayusculas?","includeUpper");
    includeSegment("¿Incluir numeros?","includeNumber");
    includeSegment("¿Incluir caracteres especiales?","includeSpecialChar");    
    if (segmentlength<=0){
      return "No selecciono opciones para generar contraseña. \n Proceso cancelado.";
    }
  }

  //debugger
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
  
  return lengthKey;
}



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
      /*
      if (confirm("Longitud ó tipo de dato no valido!\n ¿Desea reintentar? ")){
        validatePasswordLengt();
      }
      */
    return false;
  }
  passwordLengt = lrtn;
  return true;
}

function includeSegment(mensaje, llave){
  var index = optionList.findIndex(element => element.optionId===llave );

  if (index!=null && index >=0){    
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
  alert("copiado: " + element.value);

}
function messageBox(message){
  var passwordText = document.querySelector("#password");
  passwordText.value = message;
}