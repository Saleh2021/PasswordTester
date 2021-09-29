const testBar = document.getElementById("testBar")
const input = document.getElementById("input")
const explain = document.getElementById("explain")
input.addEventListener('input',passUpd)
passUpd()
function passUpd(){
    let check = passCheck(input.value)
    
    var initPower=100
    explain.innerHTML=''
    
    check.forEach(decreament=>{
        if(decreament==null) return
        initPower -= decreament.decrease
        
        msgEle= document.createElement('div')
        msgEle.innerText = decreament.message
        explain.appendChild(msgEle)
    })
        
    
    testBar.style.setProperty('--power',initPower)
}
function passCheck(password){
    const passAr =[]
    
    passAr.push(lengthPass(password))
    passAr.push(lowerCase(password))
    passAr.push(upperCase(password))
    passAr.push(numWeakness(password))
    passAr.push(specialCharWeakness(password))
    passAr.push(repeatCharWeakness(password))
    
    return passAr
}
function lengthPass(password){
    if (password.length<5){
        return {
            decrease:60,
            message:"Your password is very short"
        }
    }
    if(password.length<10){
        return {
            decrease:30,
            message:"Your password is short"
        }
    }
}
function upperCase(password) {
    return charWeakness(password, /[A-Z]/g, 'Uppercase characters')
  
  }
  
  function lowerCase(password) {
    return charWeakness(password, /[a-z]/g, 'Lowercase characters')
  }
  
  function numWeakness(password) {
    return charWeakness(password, /[0-9]/g, 'numbers')
  }
  
  function specialCharWeakness(password) {
    return charWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
  }
  
  function charWeakness(password, regex, type) {
    const matches = password.match(regex) || []
  
    if (matches.length === 0) {
      return {
        decrease: 20,
        message: `Your password has no ${type}`
        
      }
    }
  
    if (matches.length <= 2) {
      return {
        decrease: 7,
        message: `You could use more ${type}`
        
      }
    }
  }
  
  function repeatCharWeakness(password) {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
      return {
        decrease: matches.length * 10,
        message: 'Your password has repeat characters'
        
      }
    }
  }

