class StoryIntroUI {
    static play(onComplete) {
        const overlay = document.createElement('div');
        overlay.id = 'story-intro-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';

        const video = document.createElement('video');
        video.src = './images/story/story_time.mp4';
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        video.autoplay = true;
        // video.controls = false; // Hidden controls for immersion

        const skipBtn = document.createElement('button');
        skipBtn.innerText = 'Skip >>';
        skipBtn.style.position = 'absolute';
        skipBtn.style.bottom = '30px';
        skipBtn.style.right = '40px';
        skipBtn.style.padding = '10px 20px';
        skipBtn.style.fontSize = '18px';
        skipBtn.style.fontFamily = 'Verdana';
        skipBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        skipBtn.style.color = '#fff';
        skipBtn.style.border = '2px solid rgba(255, 255, 255, 0.4)';
        skipBtn.style.borderRadius = '8px';
        skipBtn.style.cursor = 'pointer';
        skipBtn.style.zIndex = '10000';

        const finish = () => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                overlay.remove();
                if (onComplete) onComplete();
            }, 1000);
        };

        video.onended = finish;
        skipBtn.onclick = finish;

        overlay.appendChild(video);
        overlay.appendChild(skipBtn);
        document.body.appendChild(overlay);

        // Ensure video plays if autoplay is blocked
        video.play().catch(e => {
            console.log("Autoplay blocked, waiting for interaction");
            const playHint = document.createElement('div');
            playHint.innerText = 'Click to Start Story';
            playHint.style.color = 'white';
            playHint.style.fontSize = '24px';
            playHint.style.cursor = 'pointer';
            overlay.appendChild(playHint);
            playHint.onclick = () => {
                video.play();
                playHint.remove();
            };
        });
    }
}
