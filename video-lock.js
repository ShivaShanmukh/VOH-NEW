/**
 * Video Locking System for Big Breathing Adventure
 * 
 * Features:
 * - Sequential video unlocking (Week 1 → Week 2 → Week 3, etc.)
 * - Completion tracking at 95% video progress
 * - localStorage persistence
 * - Visual lock/unlock indicators
 * - Progress tracking per week
 */

class VideoLockSystem {
    constructor() {
        this.storageKey = 'bba_video_progress';
        this.completionThreshold = 0.95; // 95% of video duration
        this.videos = [];
        this.currentWeek = null;
        this.init();
    }

    /**
     * Initialize the video locking system
     */
    init() {
        // Detect current week from page class
        this.detectCurrentWeek();

        // Find all videos on the page
        this.findVideos();

        // Load progress from localStorage
        this.loadProgress();

        // Apply lock states to all videos
        this.applyLockStates();

        // Attach event listeners
        this.attachEventListeners();

        // Update progress indicator
        this.updateProgressIndicator();

        console.log('Video Lock System initialized for Week', this.currentWeek);
    }

    /**
     * Detect which week page we're on
     */
    detectCurrentWeek() {
        for (let i = 1; i <= 6; i++) {
            if (document.querySelector(`.week-${i}-page`)) {
                this.currentWeek = i;
                return;
            }
        }
        this.currentWeek = null; // Not on a week page
    }

    /**
     * Find all video elements on the page
     */
    findVideos() {
        const videoElements = document.querySelectorAll('video.video-thumbnail-img');

        videoElements.forEach((video, index) => {
            // Add data attributes if not present
            if (!video.dataset.week) {
                video.dataset.week = this.currentWeek;
            }
            if (!video.dataset.exercise) {
                video.dataset.exercise = index + 1;
            }

            this.videos.push({
                element: video,
                week: parseInt(video.dataset.week),
                exercise: parseInt(video.dataset.exercise),
                wrapper: video.closest('.video-thumbnail-wrapper'),
                id: `week-${video.dataset.week}-exercise-${video.dataset.exercise}`
            });
        });
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.progress = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading progress:', e);
                this.progress = {};
            }
        } else {
            this.progress = {};
        }
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        } catch (e) {
            console.error('Error saving progress:', e);
        }
    }

    /**
     * Check if a specific week is completed
     */
    isWeekCompleted(weekNumber) {
        // Week 1 is always accessible
        if (weekNumber === 1) return true;

        // Check if all videos from the previous week are completed
        const previousWeek = weekNumber - 1;
        const previousWeekVideos = this.getAllVideosForWeek(previousWeek);

        return previousWeekVideos.every(videoId => this.progress[videoId] === true);
    }

    /**
     * Get all video IDs for a specific week
     */
    getAllVideosForWeek(weekNumber) {
        // Define the number of exercises per week
        const exercisesPerWeek = {
            1: 2, // Week 1 has 2 exercises
            2: 1, // Week 2 has 1 exercise
            3: 2, // Week 3 has 2 exercises
            4: 1, // Week 4 has 1 exercise
            5: 2, // Week 5 has 2 exercises
            6: 1  // Week 6 has 1 exercise
        };

        const count = exercisesPerWeek[weekNumber] || 2;
        const videoIds = [];

        for (let i = 1; i <= count; i++) {
            videoIds.push(`week-${weekNumber}-exercise-${i}`);
        }

        return videoIds;
    }

    /**
     * Apply lock states to all videos
     */
    applyLockStates() {
        this.videos.forEach(video => {
            const isCompleted = this.progress[video.id] === true;
            const isLocked = !this.isWeekCompleted(video.week);

            if (isCompleted) {
                this.markAsCompleted(video);
            }

            if (isLocked && video.week > 1) {
                this.lockVideo(video);
            } else {
                this.unlockVideo(video);
            }
        });
    }

    /**
     * Lock a video
     */
    lockVideo(video) {
        if (!video.wrapper) return;

        video.wrapper.classList.add('locked-state');

        // Add lock overlay if it doesn't exist
        if (!video.wrapper.querySelector('.lock-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'lock-overlay';
            overlay.innerHTML = `
        <div class="lock-icon"></div>
        <p class="lock-message">Complete all Week ${video.week - 1} videos to unlock</p>
      `;
            video.wrapper.appendChild(overlay);
        }

        // Prevent video playback
        video.element.removeAttribute('controls');
        video.element.style.cursor = 'not-allowed';

        // Add click handler to show alert
        video.wrapper.addEventListener('click', this.handleLockedClick.bind(this, video));
    }

    /**
     * Unlock a video
     */
    unlockVideo(video) {
        if (!video.wrapper) return;

        video.wrapper.classList.remove('locked-state');

        // Remove lock overlay
        const overlay = video.wrapper.querySelector('.lock-overlay');
        if (overlay) {
            overlay.remove();
        }

        // Enable video playback
        video.element.setAttribute('controls', 'controls');
        video.element.style.cursor = 'pointer';
    }

    /**
     * Mark video as completed
     */
    markAsCompleted(video) {
        if (!video.wrapper) return;

        // Add completion badge if it doesn't exist
        if (!video.wrapper.querySelector('.completion-badge')) {
            const badge = document.createElement('div');
            badge.className = 'completion-badge show';
            badge.innerHTML = `
        <span class="checkmark">✓</span>
        <span>Completed</span>
      `;
            video.wrapper.appendChild(badge);
        } else {
            video.wrapper.querySelector('.completion-badge').classList.add('show');
        }
    }

    /**
     * Handle click on locked video
     */
    handleLockedClick(video, event) {
        if (video.wrapper.classList.contains('locked-state')) {
            event.preventDefault();
            event.stopPropagation();
            alert(`Please complete all Week ${video.week - 1} videos first to unlock this content.`);
        }
    }

    /**
     * Attach event listeners to videos
     */
    attachEventListeners() {
        this.videos.forEach(video => {
            // Track video progress
            video.element.addEventListener('timeupdate', this.handleVideoProgress.bind(this, video));

            // Handle video end
            video.element.addEventListener('ended', this.handleVideoEnd.bind(this, video));
        });
    }

    /**
     * Handle video progress tracking
     */
    handleVideoProgress(video, event) {
        const videoElement = event.target;

        // Skip if video is locked
        if (video.wrapper && video.wrapper.classList.contains('locked-state')) {
            videoElement.pause();
            return;
        }

        // Check if video has reached completion threshold
        if (videoElement.duration > 0) {
            const progress = videoElement.currentTime / videoElement.duration;

            if (progress >= this.completionThreshold && !this.progress[video.id]) {
                this.markVideoComplete(video);
            }
        }
    }

    /**
     * Handle video end event
     */
    handleVideoEnd(video, event) {
        if (!this.progress[video.id]) {
            this.markVideoComplete(video);
        }
    }

    /**
     * Mark a video as complete
     */
    markVideoComplete(video) {
        console.log('Video completed:', video.id);

        // Update progress
        this.progress[video.id] = true;
        this.saveProgress();

        // Show completion badge
        this.markAsCompleted(video);

        // Update progress indicator
        this.updateProgressIndicator();

        // Check if this unlocks the next week
        this.checkAndUnlockNextWeek(video.week);
    }

    /**
     * Check if completing this week unlocks the next week
     */
    checkAndUnlockNextWeek(completedWeek) {
        if (this.isWeekCompleted(completedWeek + 1)) {
            console.log(`Week ${completedWeek + 1} is now unlocked!`);

            // Show notification
            this.showUnlockNotification(completedWeek + 1);
        }
    }

    /**
     * Show notification when a week is unlocked
     */
    showUnlockNotification(weekNumber) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 2rem 3rem;
      border-radius: 12px;
      font-family: 'Lato', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      z-index: 10000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.5s ease-out;
    `;
        notification.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <div>Week ${weekNumber} Unlocked!</div>
        <div style="font-size: 1rem; font-weight: 400; margin-top: 0.5rem;">
          Great job! You can now access Week ${weekNumber} videos.
        </div>
      </div>
    `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    /**
     * Update the progress indicator on the page
     */
    updateProgressIndicator() {
        if (!this.currentWeek) return;

        const weekVideos = this.getAllVideosForWeek(this.currentWeek);
        const completedCount = weekVideos.filter(id => this.progress[id] === true).length;
        const totalCount = weekVideos.length;

        // Find or create progress indicator
        let indicator = document.querySelector('.week-progress-indicator');

        if (!indicator) {
            // Create progress indicator
            indicator = document.createElement('div');
            indicator.className = 'week-progress-indicator';
            indicator.innerHTML = `
        <p>Week ${this.currentWeek} Progress: <span id="week-progress">${completedCount} of ${totalCount}</span> videos completed</p>
      `;

            // Insert after the week hero banner
            const heroSection = document.querySelector('.week-hero-banner');
            if (heroSection) {
                heroSection.after(indicator);
            }
        } else {
            // Update existing indicator
            const progressSpan = indicator.querySelector('#week-progress');
            if (progressSpan) {
                progressSpan.textContent = `${completedCount} of ${totalCount}`;
            }
        }
    }

    /**
     * Reset all progress (for testing)
     */
    resetProgress() {
        if (confirm('Are you sure you want to reset all video progress? This cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            this.progress = {};
            location.reload();
        }
    }
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
  }
`;
document.head.appendChild(style);

// Initialize the system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.videoLockSystem = new VideoLockSystem();
    });
} else {
    window.videoLockSystem = new VideoLockSystem();
}

// Expose reset function to console for testing
window.resetVideoProgress = () => {
    if (window.videoLockSystem) {
        window.videoLockSystem.resetProgress();
    }
};

console.log('Video Lock System loaded. Use resetVideoProgress() in console to reset all progress.');
