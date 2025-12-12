document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    checkLoginStatus(); 
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('wrong');
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) errorElement.textContent = '';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
   
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        const rememberMe = document.getElementById('rememberMe');
    
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        
        let isValid = true;
        
    
        [email, password].forEach(field => {
            field.classList.remove('wrong');
        });
        [emailError, passwordError].forEach(error => {
            error.textContent = '';
        });
        
   
        if (!email.value.trim()) {
            emailError.textContent = 'Email is required';
            email.classList.add('wrong');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            email.classList.add('wrong');
            isValid = false;
        }

        if (!password.value) {
            passwordError.textContent = 'Password is required';
            password.classList.add('wrong');
            isValid = false;
        } else if (password.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            password.classList.add('wrong');
            isValid = false;
        }
        
 
        if (isValid) {
    
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u => u.email === email.value.trim());
            
            if (!user) {
                emailError.textContent = 'No account found with this email';
                email.classList.add('wrong');
                console.log('Login failed: No account found for', email.value);
                return;
            }
            
  
            if (user.password !== password.value) {
                passwordError.textContent = 'Incorrect password';
                password.classList.add('wrong');
                console.log('Login failed: Incorrect password for', email.value);
                return;
            }
            

            console.log('=== LOGIN SUCCESSFUL ===');
            console.log('User logged in:', JSON.stringify({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                timestamp: new Date().toISOString()
            }, null, 2));
            
          
            const session = {
                userId: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                loggedIn: true,
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe.checked
            };
            
            localStorage.setItem('currentUser', JSON.stringify(session));

            if (rememberMe.checked) {
                localStorage.setItem('rememberedUser', email.value);
            } else {
                localStorage.removeItem('rememberedUser');
            }

            alert(`🎉 Welcome back, ${user.firstName}! Login successful!`);

            window.location.href = 'homePage.html';
        }
    });

    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('click', function() {
        console.log('Google login clicked');
        console.log(JSON.stringify({
            action: 'google_login',
            timestamp: new Date().toISOString(),
            provider: 'Google'
        }, null, 2));
        alert('Google login would be implemented here. For now, please use the form below.');
    });
    

    const forgotPassword = document.querySelector('.forgot-password');
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        
        if (email && emailRegex.test(email)) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);
            
            if (user) {
                alert(`Password reset link has been sent to ${email}\n\n(In a real app, this would send an email)`);
                console.log('Password reset requested for:', email);
            } else {
                alert('No account found with this email address.');
            }
        } else {
            alert('Please enter your email address first.');
        }
    });
    
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const rememberedUser = localStorage.getItem('rememberedUser');
        
        if (currentUser && currentUser.loggedIn) {
            console.log('User is already logged in:', currentUser.email);
            

            if (rememberedUser && document.getElementById('loginEmail')) {
                document.getElementById('loginEmail').value = rememberedUser;
                document.getElementById('rememberMe').checked = true;
            }
            

        } else if (rememberedUser && document.getElementById('loginEmail')) {

            document.getElementById('loginEmail').value = rememberedUser;
            document.getElementById('rememberMe').checked = true;
        }
    }
    

    window.logout = function() {
        localStorage.removeItem('currentUser');}

    const scrollBtn = document.querySelector('.scroll-top');
    if (scrollBtn) {
        const toggleScrollBtn = () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 200);
        };

        window.addEventListener('scroll', toggleScrollBtn);
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        toggleScrollBtn();
    }
}); 