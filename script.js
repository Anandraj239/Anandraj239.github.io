// Loader Logic
const loader = document.getElementById('loader');
const contentWrapper = document.querySelector('.content-wrapper');

loader.addEventListener('click', () => {
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        contentWrapper.style.display = 'block';
        setTimeout(() => {
            contentWrapper.style.opacity = '1';
        }, 50);
    }, 500);
});

// Project Hover Preview
const projectRows = document.querySelectorAll('.project-row');
const previewContainer = document.getElementById('project-preview');
const previewImg = document.getElementById('preview-img');

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let isHovering = false;

projectRows.forEach(row => {
    row.addEventListener('mouseenter', (e) => {
        const imgSrc = row.getAttribute('data-image');
        previewImg.src = imgSrc;
        previewContainer.classList.add('active');
        isHovering = true;
        
        // Dim other rows slightly
        projectRows.forEach(r => {
            if (r !== row) r.style.opacity = '0.2';
        });
    });

    row.addEventListener('mouseleave', () => {
        previewContainer.classList.remove('active');
        isHovering = false;
        
        // Restore opacity
        projectRows.forEach(r => {
            r.style.opacity = '1';
        });
    });
});

// Smooth Cursor Follow for Preview Image
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    
    // Set initial position instantly when not hovering
    if (!isHovering) {
        currentX = targetX;
        currentY = targetY;
        previewContainer.style.left = `${currentX}px`;
        previewContainer.style.top = `${currentY}px`;
    }
});

function animate() {
    if (isHovering) {
        // Lerp for smooth following
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        
        previewContainer.style.left = `${currentX}px`;
        previewContainer.style.top = `${currentY}px`;
    }
    requestAnimationFrame(animate);
}

animate();
