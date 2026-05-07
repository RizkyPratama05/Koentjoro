// Navigation Scroll Effect
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Dynamic Gallery Population
const gallery = document.getElementById('photo-gallery');
const images = [
  'gallery/fam1.jpg',
  'gallery/fam2.jpg',
  'gallery/fam3.jpg',
  'gallery/fam4.jpg',
  'gallery/fam5.jpg',
  'gallery/fam6.jpg',
  'gallery/fam7.jpg',
  'gallery/fam8.jpg'
];

images.forEach((src, index) => {
  const item = document.createElement('div');
  item.className = 'gallery-item reveal-on-scroll';
  item.innerHTML = `<img src="${src}" alt="Memori Keluarga ${index + 1}" loading="lazy">`;
  gallery.appendChild(item);
});

// History Image Placeholder
const legacyImg = document.getElementById('legacy-img');
if (legacyImg) legacyImg.src = 'gallery/fam3.jpg';

// Intersection Observer for Scroll Reveals
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll, .section-header, .node-card, .event-item').forEach(el => {
  el.classList.add('reveal-on-scroll');
  observer.observe(el);
});

// Mobile Nav Toggle (Simple Implementation)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('open');
  });
}

console.log('Keluarga Besar H. Koentjoro - Website Initialized');

// --- Password Protection Logic ---
const loginForm = document.getElementById('login-form');
const loginOverlay = document.getElementById('login-overlay');
const loginError = document.getElementById('login-error');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('family-password').value.toLowerCase();
    
    if (pass === 'koentjoro') {
      loginOverlay.classList.add('hidden');
      document.body.classList.remove('locked');
      // Save session
      localStorage.setItem('family_access', 'granted');
    } else {
      loginError.textContent = 'Kata sandi salah. Silakan coba lagi.';
      document.getElementById('family-password').value = '';
    }
  });
}

// Check session on load
if (localStorage.getItem('family_access') === 'granted') {
  if (loginOverlay) loginOverlay.classList.add('hidden');
  document.body.classList.remove('locked');
}

// --- Family Quiz Logic ---
const quizData = [
  {
    question: "Siapa putri pertama dari H. Koentjoro?",
    options: ["Dewi Catur Linawati", "Purwanindyah Hestuprapti", "Tri Retno Wulandari", "Siti Aminah"],
    correct: 1
  },
  {
    question: "Berapa jumlah anak laki-laki (cucu H. Koentjoro) dari Ibu Tri Retno Wulandari?",
    options: ["1", "2", "3", "4"],
    correct: 3
  },
  {
    question: "Siapa putri terakhir dari H. Koentjoro?",
    options: ["Tri Retno Wulandari", "Dewi Catur Linawati", "Purwanindyah Hestuprapti", "Anak Keempat"],
    correct: 1
  },
  {
    question: "Siapa satu-satunya cucu perempuan dari H. Koentjoro?",
    options: ["Adhwa", "Sanjaya", "Rafa", "Adit"],
    correct: 0
  },
  {
    question: "Manakah di bawah ini yang merupakan salah satu cucu dari H. Koentjoro?",
    options: ["Budi", "Danang", "Asep", "Joko"],
    correct: 1
  },
  {
    question: "Siapakah di antara nama berikut yang termasuk dalam 9 cucu H. Koentjoro?",
    options: ["Faqih", "Andi", "Tono", "Rian"],
    correct: 0
  },
  {
    question: "Apa nama lengkap putri kedua H. Koentjoro?",
    options: ["Purwanindyah Hestuprapti", "Tri Retno Wulandari", "Dewi Catur Linawati", "Wulandari Retno Tri"],
    correct: 1
  }
];

let currentQuestion = 0;

window.startQuiz = () => {
  renderQuestion();
};

function renderQuestion() {
  const container = document.getElementById('quiz-content');
  const data = quizData[currentQuestion];
  
  if (!container) return;

  container.innerHTML = `
    <div class="question-card">
      <span class="sub-title">Pertanyaan ${currentQuestion + 1} dari ${quizData.length}</span>
      <h3>${data.question}</h3>
      <div class="options-grid">
        ${data.options.map((opt, i) => `
          <button onclick="checkAnswer(${i})">${opt}</button>
        `).join('')}
      </div>
    </div>
  `;
}

window.checkAnswer = (index) => {
  const isCorrect = index === quizData[currentQuestion].correct;
  showQuizModal(isCorrect);
};

function showQuizModal(isCorrect) {
  const modal = document.getElementById('quiz-modal');
  const icon = document.getElementById('modal-icon');
  const title = document.getElementById('modal-title');
  const msg = document.getElementById('modal-message');

  icon.className = isCorrect ? 'modal-icon correct-icon' : 'modal-icon incorrect-icon';
  title.textContent = isCorrect ? 'Benar!' : 'Salah!';
  msg.textContent = isCorrect ? 'Bagus sekali, kamu kenal keluarga dengan baik.' : 'Oops, jawaban kurang tepat. Coba lagi ya!';

  modal.classList.add('show');
}

window.closeQuizModal = () => {
  document.getElementById('quiz-modal').classList.remove('show');
  
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    renderQuestion();
  } else {
    showQuizResult();
  }
};

function showQuizResult() {
  const container = document.getElementById('quiz-content');
  if (!container) return;
  container.innerHTML = `
    <div class="question-card">
      <h3 style="margin-bottom: 1rem">Selamat!</h3>
      <p>Kamu telah menyelesaikan kuis keluarga. Kamu benar-benar kenal dengan seluruh cucu (Rizky, Danang, Adit, Rafa, Adhwa, Fazil, Faqih, Sanjaya, Sejati)!</p>
      <button class="btn-primary" style="margin-top: 2rem" onclick="resetQuiz()">Ulangi Kuis</button>
    </div>
  `;
}

window.resetQuiz = () => {
  currentQuestion = 0;
  renderQuestion();
};

// --- Family Tree Interaction ---
document.querySelectorAll('.branch-node').forEach(node => {
  node.addEventListener('click', () => {
    // Close other nodes
    document.querySelectorAll('.branch-node').forEach(other => {
      if (other !== node) other.classList.remove('active');
    });
    
    node.classList.toggle('active');
  });
});


