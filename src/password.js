// Password Protection Logic
// Password: BP2026

const CORRECT_PASSWORD = 'BP2026';
const SESSION_KEY = 'wedding_invitation_authenticated';

// Check if already authenticated
if (sessionStorage.getItem(SESSION_KEY) === 'true') {
  window.location.href = '/';
}

// Form submission handler
const form = document.getElementById('password-form');
const input = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const container = document.querySelector('.password-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const enteredPassword = input.value.trim();
  
  if (enteredPassword === CORRECT_PASSWORD) {
    // Success! Store authentication and redirect
    sessionStorage.setItem(SESSION_KEY, 'true');
    
    // Add success animation
    container.classList.add('success');
    errorMessage.classList.remove('show');
    
    // Redirect after animation
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
    
  } else {
    // Wrong password
    errorMessage.textContent = 'Incorrect code. Please try again.';
    errorMessage.classList.add('show');
    
    // Shake animation
    input.value = '';
    input.focus();
    
    // Hide error after 3 seconds
    setTimeout(() => {
      errorMessage.classList.remove('show');
    }, 3000);
  }
});

// Add enter key support
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});
