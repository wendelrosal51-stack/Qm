const toggleLink = document.getElementById("toggle");
const loginFields = document.getElementById("loginfields");
const signupFields = document.getElementById("signupfields");
const askUser = document.getElementById("askuser");
const logBtn = document.getElementById("log");
const welcomeText = document.querySelector(".input-section p");

let isLogin = true;

toggleLink.addEventListener("click", function (e) {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    loginFields.style.display = "flex";
    signupFields.style.display = "none";
    welcomeText.textContent = "Welcome Back!";
    logBtn.textContent = "Log In";
    askUser.innerHTML = `Don't have an account? Join us and <span style="color: #24ea24"><a href="" class="links" id="toggle">Sign Up</a></span>!`;
  } else {
    loginFields.style.display = "none";
    signupFields.style.display = "flex";
    welcomeText.textContent = "Create Account!";
    logBtn.textContent = "Sign Up";
    askUser.innerHTML = `Already have an account? <span style="color: #24ea24"><a href="" class="links" id="toggle">Log In</a></span>!`;
  }

  document.getElementById("toggle").addEventListener("click", arguments.callee.bind(this));
});

document.getElementById("log").onclick = function(){
    const userField = isLogin ?  "login-username" : "signup-username";
    const passField = isLogin ?  "login-password" : "signup-password";

    username = document.getElementById(userField).value;
    password = document.getElementById(passField).value;

    if(!isLogin){
        const confirm = document.getElementById("confpassword").value;
        if(password !== confirm){
            window.alert("Passwords do not match!");
            return;
        }
    }

    if(username.length === 0 && password.length === 0){
        window.alert(`Please fill in both fields!`);
        return;
    }
    else if(username.length === 0){
        window.alert(`Please fill in Username / E-mail!`);
        return;
    }
    else if(password.length === 0){
        window.alert(`Please fill in Password!`);
        return;
    }
    else{
        window.alert(isLogin ? `You have Logged In! Your username is ${username} and your password is ${password}` : `Account created for ${username}! You may now Log In your account.`);
    }
}