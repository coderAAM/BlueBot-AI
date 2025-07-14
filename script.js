// Loader hide after 2s, then show welcome
window.addEventListener('DOMContentLoaded', () => {
     setTimeout(() => {
          document.getElementById('loader').style.opacity = 0;
          setTimeout(() => {
               document.getElementById('loader').classList.add('hidden');
               document.getElementById('welcome').style.opacity = 1;
          }, 600);
     }, 2000);
});

// Welcome screen enter
const enterBtn = document.getElementById('enter-btn');
if (enterBtn) {
     enterBtn.addEventListener('click', () => {
          document.getElementById('welcome').style.opacity = 0;
          setTimeout(() => {
               document.getElementById('welcome').classList.add('hidden');
               document.getElementById('main-content').classList.remove('hidden');
               speakWelcome();
          }, 700);
     });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
     themeToggle.addEventListener('click', () => {
          document.body.classList.toggle('light-mode');
          themeToggle.querySelector('.toggle-icon').textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
     });
}

// Voice welcome
function speakWelcome() {
     if ('speechSynthesis' in window) {
          const msg = new SpeechSynthesisUtterance('Welcome to BlueBot AI. Created by Ahmed Ali Mujha.');
          msg.rate = 1;
          msg.pitch = 1.1;
          msg.volume = 1;
          msg.lang = 'en-US';
          // Try to use a more AI/robotic voice if available
          const voices = window.speechSynthesis.getVoices();
          const aiVoice = voices.find(v => v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('google us english')); // fallback
          if (aiVoice) msg.voice = aiVoice;
          window.speechSynthesis.speak(msg);
     }
}

// Course Enroll Modal Logic
let selectedCourse = '';

// Create modal HTML
const modalHtml = `
  <div class="modal-overlay" id="modal-overlay"></div>
  <div class="enroll-modal" id="enroll-modal">
    <div class="modal-header">
      <span id="modal-title">Enroll in Course</span>
      <button id="close-modal" title="Close">&times;</button>
    </div>
    <form id="enroll-form" action="https://formspree.io/f/your-form-id" method="POST">
      <input type="hidden" name="course" id="modal-course" />
      <div class="modal-group">
        <label for="modal-name">Name</label>
        <input type="text" name="name" id="modal-name" required />
      </div>
      <div class="modal-group">
        <label for="modal-email">Email</label>
        <input type="email" name="email" id="modal-email" required />
      </div>
      <div class="modal-group">
        <label for="modal-phone">Phone</label>
        <input type="tel" name="phone" id="modal-phone" required />
      </div>
      <button type="submit" class="modal-submit">Submit</button>
    </form>
  </div>
`;

// Add modal to body (hidden by default)
function addModal() {
     if (!document.getElementById('enroll-modal')) {
          const div = document.createElement('div');
          div.innerHTML = modalHtml;
          document.body.appendChild(div);
          // Modal close logic
          document.getElementById('close-modal').onclick = closeModal;
          document.getElementById('modal-overlay').onclick = closeModal;
     }
}

function openModal(courseName) {
     addModal();
     document.getElementById('enroll-modal').style.display = 'block';
     document.getElementById('modal-overlay').style.display = 'block';
     document.getElementById('modal-title').textContent = `Enroll in ${courseName}`;
     document.getElementById('modal-course').value = courseName;
}

function closeModal() {
     if (document.getElementById('enroll-modal')) {
          document.getElementById('enroll-modal').style.display = 'none';
          document.getElementById('modal-overlay').style.display = 'none';
     }
}

// Attach event listeners to enroll buttons
window.addEventListener('DOMContentLoaded', () => {
     // ... existing code ...
     setTimeout(() => {
          // ... existing code ...
          // Enroll button logic
          document.querySelectorAll('.enroll-btn').forEach(btn => {
               btn.addEventListener('click', e => {
                    const card = btn.closest('.course-card');
                    const courseName = card.querySelector('h4').textContent;
                    openModal(courseName);
               });
          });
     }, 2000);
});

// Mobile Navbar Toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
     navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('open');
          navToggle.classList.toggle('open');
     });
}

// Navbar section scroll (SPA feel)
document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', function (e) {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
               e.preventDefault();
               const section = document.querySelector(href);
               if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    // Mobile nav close
                    const navLinks = document.querySelector('.nav-links');
                    const navToggle = document.getElementById('nav-toggle');
                    if (navLinks && navToggle && navLinks.classList.contains('open')) {
                         navLinks.classList.remove('open');
                         navToggle.classList.remove('open');
                    }
               }
          }
     });
});

// Navbar Search Logic
const navSearchForm = document.getElementById('nav-search-form');
const navSearchInput = document.getElementById('nav-search-input');
if (navSearchForm && navSearchInput) {
     navSearchForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const query = navSearchInput.value.trim().toLowerCase();
          if (!query) return;
          // Search all visible text content
          const content = document.body.innerText;
          const results = [];
          const regex = new RegExp(`(.{0,30}${query}.{0,30})`, 'gi');
          let match;
          while ((match = regex.exec(content)) !== null) {
               results.push(match[1]);
               if (results.length >= 5) break;
          }
          if (results.length) {
               alert('Search Results:\n' + results.map(r => '- ' + r).join('\n\n'));
          } else {
               alert('No results found for: ' + query);
          }
          navSearchInput.value = '';
     });
}

// Robot shadow inject
window.addEventListener('DOMContentLoaded', () => {
     // ... existing code ...
     setTimeout(() => {
          // ... existing code ...
          // Add robot shadow if not present
          const robotHero = document.querySelector('.robot-hero');
          if (robotHero && !robotHero.querySelector('.robot-shadow')) {
               const shadow = document.createElement('div');
               shadow.className = 'robot-shadow';
               robotHero.prepend(shadow);
          }
     }, 2000);
});

// Update robot shadow color on theme change
if (themeToggle) {
     themeToggle.addEventListener('click', () => {
          // Shadow color handled by CSS
     });
}

// BlueBot AI Chat: Simple Q&A
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
if (chatForm && chatInput && chatMessages) {
     chatForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const userMsg = chatInput.value.trim();
          if (!userMsg) return;
          addMessage(userMsg, 'user');
          setTimeout(() => {
               addMessage(getBotReply(userMsg), 'bot');
          }, 600);
          chatInput.value = '';
     });
}
function addMessage(text, who) {
     const msgDiv = document.createElement('div');
     msgDiv.className = 'message ' + who;
     msgDiv.textContent = text;
     chatMessages.appendChild(msgDiv);
     chatMessages.scrollTop = chatMessages.scrollHeight;
}
function getBotReply(msg) {
     const m = msg.toLowerCase();
     if (m.includes('naam') || m.includes('name')) return 'Mera naam BlueBot hai!';
     if (m.includes('ai') && m.includes('kya')) return 'AI ka matlab Artificial Intelligence hai.';
     if (m.includes('kaun') || m.includes('who are you')) return 'Main ek AI robot hoon, aapki madad ke liye!';
     if (m.includes('hello') || m.includes('hi')) return 'Hello! Kaise ho?';
     if (m.includes('course')) return 'Aapko kaunsa course chahiye?';
     return 'Sorry, main abhi sirf basic sawalon ke jawab de sakta hoon.';
}

// Video Intro Logic
window.addEventListener('DOMContentLoaded', () => {
     const videoIntro = document.getElementById('video-intro');
     const introVideo = document.getElementById('intro-video');
     const skipBtn = document.getElementById('skip-video');
     if (videoIntro && introVideo && skipBtn) {
          function hideVideoIntro() {
               videoIntro.style.opacity = 0;
               setTimeout(() => {
                    videoIntro.style.display = 'none';
               }, 700);
          }
          skipBtn.onclick = hideVideoIntro;
          introVideo.onended = hideVideoIntro;
          // Fallback: if video fails to load, skip after 4s
          introVideo.onerror = () => setTimeout(hideVideoIntro, 4000);
     }
});
