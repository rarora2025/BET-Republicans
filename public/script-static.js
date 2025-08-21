// Global variables
let endorsements = [];
let endorsementCount = 0;

// DOM elements
const endorsementForm = document.getElementById('endorsementForm');
const endorsementsGrid = document.getElementById('endorsements-grid');
const endorsementCountElement = document.getElementById('endorsement-count');
const successModal = document.getElementById('successModal');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadEndorsementsFromStorage();
    updateEndorsementCount();
    
    // Add scroll animations
    addScrollAnimations();
});

// Initialize the application
function initializeApp() {
    console.log('🚀 BET Endorsement Website Initialized');
    
    // Header content now stays visible permanently - no animations needed
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    endorsementForm.addEventListener('submit', handleFormSubmission);
    
    // Add click event to CTA button for smooth scrolling
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', scrollToForm);
    }
    
    // Modal close on outside click
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', addFocusAnimation);
        input.addEventListener('blur', removeFocusAnimation);
    });
}

// Handle form submission (static version)
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(endorsementForm);
    const endorsementData = {
        id: generateId(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Show loading spinner
    showLoading();
    
    // Simulate processing delay
    setTimeout(() => {
        // Add to local array
        endorsements.unshift(endorsementData);
        
        // Save to localStorage
        saveEndorsementsToStorage();
        
        // Update UI
        updateEndorsementsDisplay();
        updateEndorsementCount();
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        endorsementForm.reset();
        
        // Add celebration animation
        addCelebrationAnimation();
        
        hideLoading();
    }, 1000);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Load endorsements from localStorage
function loadEndorsementsFromStorage() {
    try {
        const stored = localStorage.getItem('bet-endorsements');
        if (stored) {
            endorsements = JSON.parse(stored);
            updateEndorsementsDisplay();
            console.log('Loaded endorsements from localStorage:', endorsements.length);
        }
    } catch (error) {
        console.error('Error loading endorsements from localStorage:', error);
        endorsements = [];
    }
}

// Save endorsements to localStorage
function saveEndorsementsToStorage() {
    try {
        localStorage.setItem('bet-endorsements', JSON.stringify(endorsements));
        console.log('Saved endorsements to localStorage:', endorsements.length);
        
        // Also save to sessionStorage as backup
        sessionStorage.setItem('bet-endorsements', JSON.stringify(endorsements));
    } catch (error) {
        console.error('Error saving endorsements to localStorage:', error);
        // Try to save to sessionStorage as fallback
        try {
            sessionStorage.setItem('bet-endorsements', JSON.stringify(endorsements));
        } catch (fallbackError) {
            console.error('Error saving to sessionStorage:', fallbackError);
        }
    }
}

// Update endorsement count
function updateEndorsementCount() {
    endorsementCount = endorsements.length;
    
    // Animate the count update
    animateCountUpdate(endorsementCountElement, endorsementCount);
}

// Update endorsements display
function updateEndorsementsDisplay() {
    endorsementsGrid.innerHTML = '';
    
    endorsements.slice(0, 6).forEach((endorsement, index) => {
        const card = createEndorsementCard(endorsement, index);
        endorsementsGrid.appendChild(card);
    });
}

// Create endorsement card
function createEndorsementCard(endorsement, index) {
    const card = document.createElement('div');
    card.className = 'endorsement-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const date = new Date(endorsement.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    card.innerHTML = `
        <div class="endorsement-header">
            <div class="endorsement-name">${endorsement.name}</div>
            <div class="endorsement-date">${date}</div>
        </div>
        ${endorsement.message ? `<div class="endorsement-message">${endorsement.message}</div>` : ''}
    `;
    
    return card;
}

// Animate count update
function animateCountUpdate(element, newCount) {
    const currentCount = parseInt(element.textContent) || 0;
    const increment = newCount > currentCount ? 1 : -1;
    let current = currentCount;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === newCount) {
            clearInterval(timer);
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }, 50);
}

// Show success modal
function showSuccessModal() {
    successModal.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeModal();
    }, 5000);
}

// Close modal
function closeModal() {
    successModal.style.display = 'none';
}

// Show loading spinner
function showLoading() {
    loadingSpinner.style.display = 'flex';
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Show error message
function showError(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Scroll to form
function scrollToForm() {
    const form = document.getElementById('endorsement-form');
    form.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Add focus to first input
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 1000);
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// Add focus animation to form inputs
function addFocusAnimation(event) {
    const input = event.target;
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('focused');
}

// Remove focus animation from form inputs
function removeFocusAnimation(event) {
    const input = event.target;
    const formGroup = input.closest('.form-group');
    if (!input.value) {
        formGroup.classList.remove('focused');
    }
}

// Add celebration animation
function addCelebrationAnimation() {
    // Create confetti effect
    createConfetti();
    
    // Add pulse to stats
    const statsItems = document.querySelectorAll('.stat-item');
    statsItems.forEach(item => {
        item.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            item.style.animation = '';
        }, 600);
    });
}

// Create confetti effect
function createConfetti() {
    const colors = ['#3b82f6', '#dc2626', '#059669', '#fbbf24', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

// Add CSS for confetti
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        pointer-events: none;
        z-index: 1000;
        animation: confetti-fall linear forwards;
    }
    
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
    
    .error-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc2626;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1002;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
    }
    
    .error-toast.show {
        transform: translateX(0);
    }
    
    .form-group.focused label {
        color: #3b82f6;
        transform: translateY(-2px);
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    [data-aos].animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(confettiStyles);

// Add scroll event handling for fixed header
window.addEventListener('scroll', () => {
    const fixedHeader = document.getElementById('fixedHeader');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        fixedHeader.classList.add('show');
    } else {
        fixedHeader.classList.remove('show');
    }
});

// Add smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add real-time form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', validateField);
        input.addEventListener('blur', validateField);
    });
}

function validateField(event) {
    const input = event.target;
    const formGroup = input.closest('.form-group');
    const label = formGroup.querySelector('label');
    
    // Remove existing validation classes
    formGroup.classList.remove('valid', 'invalid');
    
    if (input.value.trim() === '') {
        if (input.hasAttribute('required')) {
            formGroup.classList.add('invalid');
            label.style.color = '#dc2626';
        }
    } else {
        formGroup.classList.add('valid');
        label.style.color = '#059669';
    }
}

// Setup form validation
setupFormValidation();

console.log('✨ BET Endorsement Website Static JavaScript Loaded Successfully!');
