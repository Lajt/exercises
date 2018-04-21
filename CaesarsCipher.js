// my solution to: https://www.freecodecamp.org/challenges/caesars-cipher

function rot13(str) { // LBH QVQ VG!
  
  var finStr = "";
  
  for(var i =0; i < str.length ; i++){
    
    var code = str.charCodeAt(i);
    
    if(code <= 64 || code >= 91){
      finStr += str[i];
      continue;
    }
    
    var inc = str.charCodeAt(i)+13;
    
    if(code > 77)
      inc -= 26;
    
    finStr += String.fromCharCode(inc);
  }
  
    return finStr;
}

// Should return "FREE CODE CAMP"
var res = rot13("SERR PBQR PNZC");

console.log(res);