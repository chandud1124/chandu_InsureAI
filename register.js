// Password Strength Checker
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const strengthBars = document.querySelectorAll('.strength-bar');
const strengthLabel = document.getElementById('strength-label');
const matchText = document.getElementById('match-text');

// Check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    const requirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Calculate strength
    if (requirements.length) strength++;
    if (requirements.lowercase) strength++;
    if (requirements.uppercase) strength++;
    if (requirements.number) strength++;
    if (requirements.special) strength++;

    return strength;
}

// Update strength indicator
function updateStrengthIndicator(strength) {
    // Reset all bars
    strengthBars.forEach(bar => {
        bar.classList.remove('active', 'weak', 'fair', 'good', 'strong');
    });

    // Remove all strength classes from label
    strengthLabel.classList.remove('weak', 'fair', 'good', 'strong');

    if (strength === 0) {
        strengthLabel.textContent = 'Enter password';
        return;
    }

    let strengthClass = '';
    let strengthText = '';

    if (strength <= 2) {
        strengthClass = 'weak';
        strengthText = 'Weak';
    } else if (strength === 3) {
        strengthClass = 'fair';
        strengthText = 'Fair';
    } else if (strength === 4) {
        strengthClass = 'good';
        strengthText = 'Good';
    } else {
        strengthClass = 'strong';
        strengthText = 'Strong';
    }

    // Activate bars based on strength
    for (let i = 0; i < strength; i++) {
        strengthBars[i].classList.add('active', strengthClass);
    }

    strengthLabel.textContent = strengthText;
    strengthLabel.classList.add(strengthClass);
}

// Check password match
function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === '') {
        matchText.textContent = '';
        matchText.classList.remove('match', 'no-match');
        return;
    }

    if (password === confirmPassword) {
        matchText.textContent = 'Passwords match';
        matchText.classList.remove('no-match');
        matchText.classList.add('match');
    } else {
        matchText.textContent = 'Passwords do not match';
        matchText.classList.remove('match');
        matchText.classList.add('no-match');
    }
}

// Event listeners
passwordInput.addEventListener('input', (e) => {
    const strength = checkPasswordStrength(e.target.value);
    updateStrengthIndicator(strength);
    checkPasswordMatch(); // Also check match when password changes
});

confirmPasswordInput.addEventListener('input', () => {
    checkPasswordMatch();
});

// Form submission validation
const form = document.querySelector('.auth-form');
form.addEventListener('submit', (e) => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Passwords do not match!');
        confirmPasswordInput.focus();
        return false;
    }

    const strength = checkPasswordStrength(password);
    if (strength < 3) {
        e.preventDefault();
        alert('Please use a stronger password. Include uppercase, lowercase, numbers, and special characters.');
        passwordInput.focus();
        return false;
    }

    return true;
});
