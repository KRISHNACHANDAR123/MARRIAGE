/* ===================================
   Interactive Components Module
   =================================== */

// Music Player Component
export class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.audio = null;
        this.button = null;

        this.init();
    }

    init() {
        // Create music player button if it doesn't exist
        if (!document.querySelector('.music-player')) {
            this.createMusicPlayer();
        }

        this.button = document.querySelector('.music-toggle');

        if (this.button) {
            this.button.addEventListener('click', () => this.toggle());
        }
    }

    createMusicPlayer() {
        const playerHTML = `
            <div class="music-player">
                <button class="music-toggle" aria-label="Toggle music">
                    <span class="music-icon">🎵</span>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', playerHTML);
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        // In production, you would load and play an actual audio file
        // For now, we'll just update the UI
        this.isPlaying = true;
        if (this.button) {
            this.button.classList.add('playing');
            this.button.querySelector('.music-icon').textContent = '🎶';
        }

        // Example: Load and play audio
        // this.audio = new Audio('/path/to/wedding-music.mp3');
        // this.audio.loop = true;
        // this.audio.play();
    }

    pause() {
        this.isPlaying = false;
        if (this.button) {
            this.button.classList.remove('playing');
            this.button.querySelector('.music-icon').textContent = '🎵';
        }

        // if (this.audio) {
        //     this.audio.pause();
        // }
    }
}

// Countdown Timer Component
export class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.interval = null;
        this.container = null;

        this.init();
    }

    init() {
        this.createCountdown();
        this.start();
    }

    createCountdown() {
        const countdownHTML = `
            <div class="countdown-section">
                <h3 class="countdown-title">Counting Down to Our Special Day</h3>
                <div class="countdown-timer">
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-days">0</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-hours">0</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-minutes">0</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="countdown-seconds">0</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                </div>
            </div>
        `;

        // Insert after hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.insertAdjacentHTML('afterend', countdownHTML);
        }
    }

    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const difference = this.targetDate - now;

        if (difference <= 0) {
            this.stop();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Save the Date Function
export function addSaveTheDateButton() {
    const heroContent = document.querySelector('.wedding-date');

    if (heroContent) {
        const button = document.createElement('button');
        button.className = 'save-date-btn';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Save the Date</span>
        `;

        button.addEventListener('click', () => {
            downloadICSFile();
        });

        heroContent.appendChild(button);
    }
}

// Generate and download .ics calendar file
function downloadICSFile() {
    const event = {
        title: 'Wedding of Bhuvaneśh R & Priyadharshini G S',
        description: 'Join us in celebrating our special day',
        location: 'Maruvoor Murugan Thirumana Mandapam, Melmaruvathur, 603319',
        startDate: '2026-02-22T07:30:00',
        endDate: '2026-02-22T12:00:00'
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@wedding-invitation.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(new Date(event.startDate))}
DTEND:${formatICSDate(new Date(event.endDate))}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding-invitation.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function formatICSDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Timeline Reveal Animation
export function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    timelineItems.forEach((item) => {
        observer.observe(item);
    });
}
