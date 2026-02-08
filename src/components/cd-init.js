// ===================================
// CD DISC EFFECT INITIALIZER
// ===================================

export function initCDEffect() {
    const initialsContainer = document.getElementById('initials-container');

    if (!initialsContainer) {
        console.warn('Initials container not found');
        return;
    }

    // Create CD disc elements
    const cdDisc = document.createElement('div');
    cdDisc.className = 'cd-disc';

    const cdGrooves = document.createElement('div');
    cdGrooves.className = 'cd-grooves';

    const cdShine = document.createElement('div');
    cdShine.className = 'cd-shine';

    const cdGlare = document.createElement('div');
    cdGlare.className = 'cd-glare';

    // Create sparkles
    const cdSparkles = document.createElement('div');
    cdSparkles.className = 'cd-sparkles';

    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        cdSparkles.appendChild(sparkle);
    }

    // Insert elements before existing content
    initialsContainer.insertBefore(cdDisc, initialsContainer.firstChild);
    initialsContainer.insertBefore(cdGrooves, initialsContainer.firstChild);
    initialsContainer.insertBefore(cdShine, initialsContainer.firstChild);
    initialsContainer.insertBefore(cdGlare, initialsContainer.firstChild);
    initialsContainer.appendChild(cdSparkles);

    // Add interaction - pause on hover
    initialsContainer.addEventListener('mouseenter', () => {
        cdDisc.style.animationPlayState = 'paused';
        cdGrooves.style.animationPlayState = 'paused';
        cdShine.style.animationPlayState = 'paused';
    });

    initialsContainer.addEventListener('mouseleave', () => {
        cdDisc.style.animationPlayState = 'running';
        cdGrooves.style.animationPlayState = 'running';
        cdShine.style.animationPlayState = 'running';
    });

    console.log('CD effect initialized');
}
