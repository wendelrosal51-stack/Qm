const submitBtn = document.getElementById("sign");
const username = document.getElementById("signup-username");
const password = document.getElementById("signup-password");
const confirmPass = document.getElementById("confpassword");

submitBtn.onclick = async function(e){
    e.preventDefault();
    signuser = username.value;
    signpass = password.value;
    signconf = confirmPass.value;

    if(signuser.length === 0 && signpass.length === 0 && signconf.length === 0){
        window.alert(`Please fill in all fields!`);
        return;
    }
    else if(signuser.length === 0){
        window.alert(`Please fill in Username / E-mail!`);
        return;
    }
    else if(signpass.length === 0){
        window.alert(`Please fill in Password!`);
        return;
    }
    else if(signconf.length === 0){ 
        window.alert(`Please confirm your password!`);
        return;
    }
    else if(signpass !== signconf){
        window.alert(`Confirmation Password does not match! Please try again`);
        return;
    }
    else {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: signuser, 
                    password: signpass 
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                window.alert('Successfully created account!');
                window.location.href = '/';  
            } else {
                window.alert(data.error);
            }
        } catch (error) {
            window.alert('Error creating account. Please try again.');
            console.error(error);
        }
    }
}