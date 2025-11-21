// Girls' Generation Website - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initAlbumFilter();
    initSongPlayer();
    initContactForm();
    initScrollEffects();
    initAnimations();
});

// Smooth Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const exploreBtn = document.getElementById('exploreBtn');
    const backToTopBtn = document.getElementById('backToTop');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Explore button
    exploreBtn.addEventListener('click', function() {
        document.querySelector('#home').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Album Filter System
function initAlbumFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const albumCards = document.querySelectorAll('.album-card');
    const albumOverlays = document.querySelectorAll('.album-overlay');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter albums with animation
            albumCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.remove('hidden'), 50);
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.remove('hidden'), 50);
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });

    // Album overlay click
    albumOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const albumCard = this.closest('.album-card');
            const albumTitle = albumCard.querySelector('h3').textContent;
            showAlbumModal(albumTitle);
        });
    });
}

// Song Player System
function initSongPlayer() {
    const playBtns = document.querySelectorAll('.play-btn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const stopBtn = document.getElementById('stopBtn');
    const nowPlaying = document.getElementById('nowPlaying');
    const currentSong = document.getElementById('currentSong');
    const songSearch = document.getElementById('songSearch');
    const songRows = document.querySelectorAll('.songs-table tbody tr');
    const audioPlayer = document.getElementById('audioPlayer');

    let currentlyPlaying = null;

    // Play button functionality
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const songName = this.getAttribute('data-song');
            
            // Stop currently playing song
            if (currentlyPlaying) {
                currentlyPlaying.classList.remove('playing');
                currentlyPlaying.innerHTML = '▶ Play';
            }
            
            // Play new song
            if (currentlyPlaying === this) {
                // Same song clicked - stop it
                currentlyPlaying = null;
                nowPlaying.classList.remove('show');
                audioPlayer.pause();
            } else {
                // New song
                this.classList.add('playing');
                this.innerHTML = '⏸ Playing';
                currentlyPlaying = this;
                
                // Update now playing display
                currentSong.textContent = `Now Playing: ${songName} - Girls' Generation`;
                nowPlaying.classList.add('show');
                
                // Simulate audio play (in real implementation, you'd set audio src)
                audioPlayer.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
            }
        });
    });

    // Stop button
    stopBtn.addEventListener('click', function() {
        if (currentlyPlaying) {
            currentlyPlaying.classList.remove('playing');
            currentlyPlaying.innerHTML = '▶ Play';
            currentlyPlaying = null;
        }
        nowPlaying.classList.remove('show');
        audioPlayer.pause();
    });

    // Shuffle functionality
    shuffleBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * playBtns.length);
        const randomBtn = playBtns[randomIndex];
        randomBtn.click();
        
        // Add shuffle animation
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 500);
    });

    // Song search functionality
    songSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        songRows.forEach(row => {
            const songName = row.cells[1].textContent.toLowerCase();
            if (songName.includes(searchTerm)) {
                row.style.display = '';
                setTimeout(() => row.style.opacity = '1', 50);
            } else {
                row.style.opacity = '0';
                setTimeout(() => row.style.display = 'none', 300);
            }
        });
    });
}

// Contact Form with Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Name validation
        if (name.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        } else if (name.value.trim().length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Message validation
        if (message.value.trim() === '') {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Success message
                showSuccessMessage();
                contactForm.reset();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Scroll Animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.album-card, .artist-card, .member-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Additional Animations
function initAnimations() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.album-card, .artist-card, .play-btn, .filter-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
}

// Modal Functions
function showAlbumModal(albumTitle) {
    const albumInfo = {
        'Lion Heart': {
            description: 'The 5th studio album featuring the hit title track "Lion Heart"',
            release: 'August 19, 2015',
            tracks: ['Lion Heart', 'You Think', 'Party', 'Check', 'Fire Alarm'],
            highlights: ['9 music show wins', 'Topped various charts']
        },
        'Girls\' Generation': {
            description: 'Debut studio album that started it all',
            release: 'November 1, 2007',
            tracks: ['Into The New World', 'Girls\' Generation', 'Baby Baby', 'Complete'],
            highlights: ['Iconic debut', 'Foundation of their success']
        },
        'FOREVER 1': {
            description: '7th studio album celebrating 15th anniversary',
            release: 'August 5, 2022',
            tracks: ['FOREVER 1', 'Lucky Like That', 'Seventeen', 'Villain'],
            highlights: ['Anniversary special', 'Emotional comeback']
        },
        'The Boys': {
            description: '3rd studio album with international release',
            release: 'October 19, 2011',
            tracks: ['The Boys', 'Telepathy', 'Say Yes', 'Trick', 'How Great Is Your Love'],
            highlights: ['English version released', 'International success']
        }
    };

    const info = albumInfo[albumTitle] || {
        description: 'A wonderful Girls\' Generation album',
        release: 'Unknown',
        tracks: ['Various tracks'],
        highlights: ['Great music']
    };

    const modalContent = `
        <div class="album-modal">
            <h3>${albumTitle}</h3>
            <p><strong>Release Date:</strong> ${info.release}</p>
            <p><strong>Description:</strong> ${info.description}</p>
            
            <div class="modal-tracks">
                <h4>Featured Tracks:</h4>
                <ul>
                    ${info.tracks.map(track => `<li>${track}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-highlights">
                <h4>Highlights:</h4>
                <ul>
                    ${info.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            
            <button class="modal-close-btn" onclick="closeModal()">Close</button>
        </div>
    `;

    // Create and show modal
    showCustomModal(albumTitle, modalContent);
}

function showCustomModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="custom-modal-content">
            <span class="custom-modal-close">&times;</span>
            <h2>${title}</h2>
            <div class="custom-modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Close modal events
    const closeBtn = modal.querySelector('.custom-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.custom-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for your message. We'll get back to you soon!</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;

    document.body.appendChild(successMsg);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successMsg.parentElement) {
            successMsg.remove();
        }
    }, 5000);
}

// Add custom modal styles
const modalStyles = `
    .custom-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .custom-modal.show {
        opacity: 1;
    }

    .custom-modal-content {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }

    .custom-modal.show .custom-modal-content {
        transform: scale(1);
    }

    .custom-modal-close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: #333;
    }

    .album-modal h3 {
        color: #d94a7e;
        margin-bottom: 1rem;
    }

    .modal-tracks, .modal-highlights {
        margin: 1.5rem 0;
    }

    .modal-tracks ul, .modal-highlights ul {
        margin-left: 1.5rem;
    }

    .modal-tracks li, .modal-highlights li {
        margin-bottom: 0.5rem;
    }

    .modal-close-btn {
        background: #9c6bff;
        color: white;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 1rem;
    }

    .success-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        text-align: center;
    }

    .success-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.showAlbumModal = showAlbumModal;
window.closeModal = closeModal;
window.showCustomModal = showCustomModal;