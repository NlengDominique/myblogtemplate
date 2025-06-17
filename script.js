// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== STICKY HEADER =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLLING =====
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

// ===== ACTIVE NAVIGATION LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
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

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('search-input');
const blogPosts = document.querySelectorAll('.blog-post');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    blogPosts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const category = post.querySelector('.post-meta span:last-child')?.textContent.toLowerCase() || '';

        if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
            post.style.display = 'block';
            post.style.animation = 'slideInUp 0.5s ease';
        } else {
            post.style.display = 'none';
        }
    });
});

// ===== CATEGORY FILTERING =====
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');

        blogPosts.forEach(post => {
            const postCategory = post.querySelector('.post-meta span:last-child')?.textContent.toLowerCase();

            if (postCategory && postCategory.includes(category)) {
                post.style.display = 'block';
                post.style.animation = 'slideInUp 0.5s ease';
            } else {
                post.style.display = 'none';
            }
        });

        // Update search input to show active filter
        searchInput.value = category;
    });
});

// ===== QUOTE OF THE DAY =====
const quotes = [
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" }
];

function updateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote-text').textContent = `"${randomQuote.text}"`;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author}`;
}

// Update quote every 10 seconds
setInterval(updateQuote, 10000);
updateQuote(); // Initial load

// ===== FORM SUBMISSIONS =====

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;

    // Simulate form submission
    alert(`Thank you for subscribing with email: ${email}`);
    e.target.reset();
});

// Contact Form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    e.target.reset();
});

// Comment Form
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('comment-name').value;
    const email = document.getElementById('comment-email').value;
    const message = document.getElementById('comment-message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Create comment element
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-card';
    commentDiv.style.cssText = `
                background: var(--bg-secondary);
                padding: 1.5rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                animation: slideInUp 0.5s ease;
            `;

    commentDiv.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 1rem;">
                        ${name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <strong>${name}</strong>
                        <div style="font-size: 0.9rem; color: var(--text-light);">${new Date().toLocaleDateString()}</div>
                    </div>
                </div>
                <p style="margin: 0; color: var(--text-secondary);">${message}</p>
            `;

    commentsList.insertBefore(commentDiv, commentsList.firstChild);
    e.target.reset();
});