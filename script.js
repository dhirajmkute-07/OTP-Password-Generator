// ========= DOM =========

const otpInput = document.getElementById("otp");
const otpLength = document.getElementById("otpLength");
const otpHistory = document.getElementById("otpHistory");
const timer = document.getElementById("timer");

const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const upper = document.getElementById("uppercase");
const lower = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const exclude = document.getElementById("exclude");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const passwordHistory = document.getElementById("passwordHistory");

const toast = document.getElementById("toast");

let otpTimer;

// =============================
// Toast
// =============================

function showToast(message){

toast.innerHTML = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}

// =============================
// OTP Generator
// =============================

document.getElementById("generateOtp").onclick = ()=>{

let length = Number(otpLength.value);

let otp="";

for(let i=0;i<length;i++){

otp += Math.floor(Math.random()*10);

}

otpInput.value = otp;

saveOtp(otp);

startTimer();

};

// =============================
// Copy OTP
// =============================

document.getElementById("copyOtp").onclick = ()=>{

navigator.clipboard.writeText(otpInput.value);

showToast("OTP Copied");

};

// =============================
// Timer
// =============================

function startTimer(){

clearInterval(otpTimer);

let sec=30;

timer.innerHTML=sec;

otpTimer=setInterval(()=>{

sec--;

timer.innerHTML=sec;

if(sec<=0){

clearInterval(otpTimer);

otpInput.value="";

timer.innerHTML="Expired";

}

},1000);

}

// =============================
// OTP History
// =============================

function saveOtp(value){

let history=JSON.parse(localStorage.getItem("otpHistory"))||[];

history.unshift(value);

if(history.length>10){

history.pop();

}

localStorage.setItem("otpHistory",JSON.stringify(history));

loadOtpHistory();

}

function loadOtpHistory(){

otpHistory.innerHTML="";

let history=JSON.parse(localStorage.getItem("otpHistory"))||[];

history.forEach(item=>{

let li=document.createElement("li");

li.innerHTML=item;

otpHistory.appendChild(li);

});

}

document.getElementById("clearOtpHistory").onclick=()=>{

localStorage.removeItem("otpHistory");

loadOtpHistory();

};

// =============================
// Password Length
// =============================

lengthSlider.oninput=()=>{

lengthValue.innerHTML=lengthSlider.value;

}; 
// =============================
// Password Generator
// =============================

document.getElementById("generatePassword").onclick = () => {

    let chars = "";

    if (upper.checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (lower.checked)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if (numbers.checked)
        chars += "0123456789";

    if (symbols.checked)
        chars += "!@#$%^&*()_+[]{}<>?/|";

    if (exclude.checked) {
        chars = chars.replace(/[O0Il1]/g, "");
    }

    if (chars.length === 0) {
        showToast("Select at least one option");
        return;
    }

    let password = "";

    for (let i = 0; i < Number(lengthSlider.value); i++) {

        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    passwordInput.value = password;

    checkStrength(password);

    savePassword(password);

};

// =============================
// Password Strength
// =============================

function checkStrength(password) {

    let score = 0;

    if (password.length >= 8)
        score++;

    if (password.length >= 12)
        score++;

    if (/[A-Z]/.test(password))
        score++;

    if (/[a-z]/.test(password))
        score++;

    if (/[0-9]/.test(password))
        score++;

    if (/[^A-Za-z0-9]/.test(password))
        score++;

    if (score <= 2) {

        strengthBar.style.width = "30%";
        strengthBar.style.background = "red";
        strengthText.innerHTML = "Strength : Weak";

    } else if (score <= 4) {

        strengthBar.style.width = "65%";
        strengthBar.style.background = "orange";
        strengthText.innerHTML = "Strength : Medium";

    } else {

        strengthBar.style.width = "100%";
        strengthBar.style.background = "limegreen";
        strengthText.innerHTML = "Strength : Strong";

    }

}

// =============================
// Copy Password
// =============================

document.getElementById("copyPassword").onclick = () => {

    navigator.clipboard.writeText(passwordInput.value);

    showToast("Password Copied");

};

// =============================
// Download Password
// =============================

document.getElementById("downloadPassword").onclick = () => {

    if (passwordInput.value === "") {

        showToast("Generate Password First");

        return;

    }

    const blob = new Blob([passwordInput.value], {
        type: "text/plain"
    });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "password.txt";

    a.click();

};

// =============================
// Password History
// =============================

function savePassword(value) {

    let history =
        JSON.parse(localStorage.getItem("passwordHistory")) || [];

    history.unshift(value);

    if (history.length > 10)
        history.pop();

    localStorage.setItem(
        "passwordHistory",
        JSON.stringify(history)
    );

    loadPasswordHistory();

}

function loadPasswordHistory() {

    passwordHistory.innerHTML = "";

    let history =
        JSON.parse(localStorage.getItem("passwordHistory")) || [];

    history.forEach(item => {

        let li = document.createElement("li");

        li.innerHTML = item;

        passwordHistory.appendChild(li);

    });

}

document.getElementById("clearPasswordHistory").onclick = () => {

    localStorage.removeItem("passwordHistory");

    loadPasswordHistory();

};

// =============================
// Dark / Light Mode
// =============================

document.querySelector(".theme-btn").onclick = () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        document.querySelector(".theme-btn").innerHTML = "☀️";

    } else {

        document.querySelector(".theme-btn").innerHTML = "🌙";

    }

};

// =============================
// App Start
// =============================

loadOtpHistory();

loadPasswordHistory();

lengthValue.innerHTML = lengthSlider.value;