document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
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
    
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
    
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        
        let isValid = true;
    
        [firstName, lastName, email, password, confirmPassword].forEach(field => {
        field.classList.remove('wrong');
        });
        [firstNameError, lastNameError, emailError, passwordError, confirmPasswordError].forEach(error => {
        error.textContent = '';
        });
    
        if (!firstName.value.trim()) {
        firstNameError.textContent = 'First name is required';
        firstName.classList.add('wrong');
        isValid = false;
        } else if (firstName.value.trim().length < 2) {
        firstNameError.textContent = 'First name must be at least 2 characters';
        firstName.classList.add('wrong');
        isValid = false;
        }
    
        if (!lastName.value.trim()) {
        lastNameError.textContent = 'Last name is required';
        lastName.classList.add('wrong');
        isValid = false;
        } else if (lastName.value.trim().length < 2) {
        lastNameError.textContent = 'Last name must be at least 2 characters';
        lastName.classList.add('wrong');
        isValid = false;
        }
    
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
        } else if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        password.classList.add('wrong');
        isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
        passwordError.textContent = 'Password must contain uppercase, lowercase, and numbers';
        password.classList.add('wrong');
        isValid = false;
        }
        
        if (!confirmPassword.value) {
        confirmPasswordError.textContent = 'Please confirm your password';
        confirmPassword.classList.add('wrong');
        isValid = false;
        } else if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPassword.classList.add('wrong');
        isValid = false;
        }
        
        if (isValid) {
     
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email.value.trim());
        
        if (existingUser) {
            emailError.textContent = 'This email is already registered. Please login instead.';
            email.classList.add('wrong');
            return;
        }
        
        const newUser = {
            id: Date.now(),
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value,
            createdAt: new Date().toISOString(),
            timestamp: Date.now()
        };
        
    
        console.log('=== NEW USER SIGNUP ===');
        console.log('User Data (JSON format):');
        console.log(JSON.stringify(newUser, null, 2)); 
        
        console.log('User Details:');
        console.log('- First Name:', newUser.firstName);
        console.log('- Last Name:', newUser.lastName);
        console.log('- Email:', newUser.email);
        console.log('- Account Created:', new Date(newUser.timestamp).toLocaleString());
        console.log('=======================\n');
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('🎉 Registration successful! Welcome to SkillGro!\n\nCheck the browser console (F12) to see your registration data in JSON format.');
    
        const jsonAlert = confirm(
            'Registration successful! 🎉\n\n' +
            'Do you want to see your registration data in JSON format?\n' +
            '(Press OK to see in console, Cancel to continue)'
        );
        
        if (jsonAlert) {
            console.log('=== YOUR REGISTRATION DATA ===');
            console.log(JSON.stringify(newUser, null, 2));
            console.log('=============================\n');
            alert('Your registration data has been logged to the console.\nPress F12 and go to the Console tab to view it.');
        }
        form.reset();
        }
    });
    
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('click', function() {
        console.log('Google sign-up clicked');
        console.log(JSON.stringify({
        action: 'google_signup',
        timestamp: new Date().toISOString(),
        provider: 'Google'
        }, null, 2));
        alert('Google sign-up would be implemented here. For now, please use the form below.');
    });
    
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', function() {
        console.log('Login button clicked');
        window.location.href = 'login.html';
    });

    // Scroll-to-top button
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
    
    window.addEventListener('load', function() {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (existingUsers.length > 0) {
        console.log('=== EXISTING USERS IN LOCALSTORAGE ===');
        console.log('Total users:', existingUsers.length);
        console.log('All users:', JSON.stringify(existingUsers, null, 2));
        console.log('====================================\n');
        } else {
        console.log('=== NO EXISTING USERS FOUND ===');
        console.log('LocalStorage is empty or no users registered yet.');
        console.log('================================\n');
        }
    });
    });