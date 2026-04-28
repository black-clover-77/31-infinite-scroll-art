const gallery = document.getElementById('gallery');
const audio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');

const artworks = [
    { title: 'NEON GENESIS', year: '2026', img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80' },
    { title: 'CYBER DREAMS', year: '2027', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
    { title: 'LIQUID TIME', year: '2028', img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=800&q=80' },
    { title: 'VOID ENGINE', year: '2029', img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80' },
    { title: 'ASTRAL GRID', year: '2030', img: 'https://images.unsplash.com/photo-1635776062127-d3b73af968d9?auto=format&fit=crop&w=800&q=80' }
];

function createArtItem(art) {
    const item = document.createElement('div');
    item.className = 'art-item';
    item.innerHTML = `
        <img src="${art.img}" class="art-img" alt="${art.title}">
        <div class="art-info">
            <div class="art-title">${art.title}</div>
            <div class="art-year">${art.year}</div>
        </div>
    `;
    return item;
}

function init() {
    // Initial batch
    artworks.forEach(art => gallery.appendChild(createArtItem(art)));
    artworks.forEach(art => gallery.appendChild(createArtItem(art))); // Duplicate for loop

    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect
    document.querySelectorAll('.art-item').forEach(item => {
        const img = item.querySelector('.art-img');
        gsap.to(img, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Infinite scroll logic
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            artworks.forEach(art => gallery.appendChild(createArtItem(art)));
            // Refresh scroll trigger for new items
            ScrollTrigger.refresh();
        }
    });

    document.getElementById('loader').classList.add('hidden');
}

audioToggle.onclick = () => {
    if (audio.paused) {
        audio.play();
        audioToggle.textContent = '🔊';
    } else {
        audio.pause();
        audioToggle.textContent = '🎵';
    }
};

window.addEventListener('load', init);