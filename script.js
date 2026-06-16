const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.body;

function applyTheme(theme) {
  if (theme === 'light') {
    root.classList.add('light');
    themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    root.classList.remove('light');
    themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('codexTheme', theme);
}

themeToggle.addEventListener('click', () => {
  const nextTheme = root.classList.contains('light') ? 'dark' : 'light';
  applyTheme(nextTheme);
});

const savedTheme = localStorage.getItem('codexTheme') || 'dark';
applyTheme(savedTheme);

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  heroSection.addEventListener('mousedown', (e) => {
    if (e.detail > 1) e.preventDefault();
  });
  heroSection.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });
}

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('mobile-open');
  navOverlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.contains('open');
  console.log('Hamburger clicked, currently open:', isOpen);
  
  if (isOpen) {
    console.log('Closing menu');
    closeMenu();
  } else {
    console.log('Opening menu');
    hamburger.classList.add('open');
    navLinks.classList.add('mobile-open');
    navOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
  }
});

// Close menu when clicking on overlay
navOverlay.addEventListener('click', closeMenu);

// Enhanced: Close menu and open modal when clicking on a nav link
if (navLinks) {
  navLinks.addEventListener('click', (e) => {
    console.log('Nav links clicked, target:', e.target);
    const link = e.target.closest('a');
    if (!link || !navLinks.contains(link)) {
      console.log('No valid link found');
      return;
    }

    console.log('Link found:', link.getAttribute('data-section'));
    const section = link.dataset.section;
    const href = link.getAttribute('href');

    if (section && section !== 'home') {
      e.preventDefault();
      console.log('Closing menu and opening modal for:', section);
      closeMenu();

      const card = document.querySelector(`.card[data-section="${section}"]`) || document.querySelector(href);
      const delay = 420; // wait for close animation before opening the modal

      setTimeout(() => {
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        openModal(section);
      }, delay);
      return;
    }

    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      console.log('Closing menu and scrolling to:', href);
      closeMenu();
      const target = document.querySelector(href);
      setTimeout(() => {
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 420);
      return;
    }

    console.log('Closing menu only');
    closeMenu();
  });
}


// locked sections

const lockedSections = ['tools', 'apis',]; // Sections that are locked and show the notice

function getModalLockNote(section) {
  if (!lockedSections.includes(section)) return '';
  return `
    <div class="modal-lock-notice">
      <i class="fas fa-lock"></i>
      <strong>Note:</strong> <b>This section was locked by the developer.</b>

    </div>
  `;
}

// Modal functionality
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');

function openModal(section) {
  let content = '';

  if (lockedSections.includes(section)) {
    content = getModalLockNote(section) + '<div class="locked-content" style="display: none;"><!-- Editable content space --></div>';
  } else {
    switch (section) {
      case 'deploy':
      content = `
        <h2><i class="fas fa-rocket"></i> Deploy Your AI Models</h2>
        <p>Follow these steps to deploy your AI models on our enterprise infrastructure:</p>
        <ol>
          <li><strong>Prepare Your Model</strong> - Package your model files and dependencies</li>
          <li><strong>Configure Settings</strong> - Set environment variables and scaling parameters</li>
          <li><strong>Choose Platform</strong> - Select your preferred hosting environment (cloud, on-premise)</li>
          <li><strong>Deploy & Monitor</strong> - Deploy with one click and monitor real-time performance</li>
        </ol>
        <p>Watch this tutorial for a detailed walkthrough:</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ckjxHUAaxeA?si=V3XpDTAhUNjrX8Vq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      `; 
      break;
    case 'plugins':
      content = `
        <h2><i class="fas fa-puzzle-piece"></i> Plugins </h2>
        <div class="plugin-installation-guide">
          <h3><i class="fas fa-book"></i> How to Install Plugins</h3>
          <div class="installation-note editable-section" contenteditable="false" style="border: 1px solid var(--border); padding: 1rem; border-radius: 8px; background: var(--surface); margin: 1rem 0;">
            <strong>Installation Steps:</strong>
            <ol style="margin: 0.5rem 0 0 1.5rem; padding: 0;">
              <li>Find the plugin you want below</li>
              <li>Copy the installation code from the plugin card</li>
              <li>Run it in your terminal or CODEX AI interface</li>
              <li>Restart your bot to load the plugin</li>
            </ol>
          </div>
        </div>
        
        <div class="plugins-actions">
          <button class="create-plugin-btn" id="createPluginBtn">
            <i class="fas fa-plus"></i> Create Plugin
          </button>
        </div>

        <div class="plugins-container" id="pluginsContainer">
          <p style="text-align: center; color: var(--muted);">Loading plugins...</p>
        </div>
      `;
      break;
    case 'tools':
      content = `
        <h2><i class="fas fa-wrench"></i> Tools Center</h2>
        <p>Discover developer tools and automation helpers for fast AI workflows.</p>
        <ul>
          <li><strong>Tool 1:</strong> Replace this with a custom tool description.</li>
          <li><strong>Tool 2:</strong> Add tool setup instructions or integration notes.</li>
          <li><strong>Tool 3:</strong> Explain how users can use this tool in their workflow.</li>
        </ul>
        <p> Change this text at any time to reflect the tools you want to present.</p>
      `;
      break;
    case 'apis':
      content = `
        <h2><i class="fas fa-network-wired"></i> API Library</h2>
        <p>List your APIs, endpoints, and integration notes here.</p>
        <ul>
          <li><strong>API 1:</strong> Add endpoint descriptions and usage examples.</li>
          <li><strong>API 2:</strong> Explain authentication, rate limits, and how to connect.</li>
          <li><strong>API 3:</strong> Show the most common call patterns and sample payloads.</li>
        </ul>
        <p> Change the text to describe your APIs and integrations.</p>
      `;
      break;
    case 'support':
      content = `
        <h2><i class="fas fa-headset"></i> Get Support</h2>
        <p>Join our communities for help, discussions, and latest updates, or reach out to me:</p>
        <div class="support-links">
          <a href="https://chat.whatsapp.com/BVKaSgWjobcFfO4NU07g5Q?mode=gi_t" class="support-link" target="_blank">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp<br/>Group</span>
          </a>
          <a href="https://whatsapp.com/channel/0029Vb6sMEy96H4VI2w3I50F" class="support-link" target="_blank">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp<br/>Channel</span>
          </a>
          <a href="https://wa.me/2347019135989" class="support-link" target="_blank">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp<br/>Direct Message</span>
          </a>
          <a href="https://t.me/5GQxLKGLbkszNjg0" class="support-link" target="_blank">
            <i class="fab fa-telegram"></i>
            <span>Telegram<br/>Group</span>
          </a>
          <a href="https://t.me/CODEX_AIV3" class="support-link" target="_blank">
            <i class="fab fa-telegram"></i>
            <span>Telegram<br/>Channel</span>
          </a>
          <a href="https://t.me/DEV_CODEXV3" class="support-link" target="_blank">
            <i class="fab fa-telegram"></i>
            <span>Telegram<br/>Direct Message</span>
          </a>
        </div>
      `;
      break;
    case 'suggest':
      content = `
        <h2><i class="fas fa-lightbulb"></i> Suggest Features</h2>
        <p>Help us improve CODEX AI by sharing your ideas. Tell us what features you'd like to see:</p>
        <p>Quick suggestions: <a href="#" onclick="setSuggestion('Improve UI')">Improve UI</a> | <a href="#" onclick="setSuggestion('Add tutorials')">Add tutorials</a></p>
        <form class="suggest-form">
          <textarea name="suggestion" placeholder="Describe your suggestion... (max 1000 chars)" maxlength="1000" required></textarea>
          <button type="submit"><i class="fas fa-paper-plane"></i> Submit Suggestion</button>
        </form>
      `;
      break;
    case 'repo':
      content = `
        <h2><i class="fab fa-github"></i> GitHub Repository</h2>
        <p>Access the official CODEX AI source code, documentation, and contribute to the project:</p>
        <p style="margin-top: 2rem; text-align: center;">
          <a href="https://github.com/CODEX-SPACEX/CODEX-AI/tree/main" target="_blank" rel="noreferrer" class="copy-btn" style="display: inline-block; width: auto; padding: 1rem 2rem;">
            <i class="fab fa-github"></i> Visit Repository on GitHub
          </a>
        </p>
      `;
      break;
    case 'privacy':
      content = `
        <h2><i class="fas fa-shield-alt"></i> Privacy Policy</h2>
        <p>At CODEX AI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.</p>
        <h3>Information We Collect</h3>
        <ul>
          <li><strong>Personal Information:</strong> When you contact us or submit suggestions, we may collect your name, email, or WhatsApp details if provided.</li>
          <li><strong>Usage Data:</strong> We collect anonymous usage statistics to improve our service.</li>
          <li><strong>Cookies:</strong> We use cookies for theme preferences and basic functionality.</li>
        </ul>
        <h3>How We Use Your Information</h3>
        <p>We use collected information solely to provide and improve our services, respond to inquiries, and enhance user experience.</p>
        <h3>Data Security</h3>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.</p>
        <h3>Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us through our support channels.</p>
      `;
      break;
    case 'license':
      content = `
        <h2><i class="fas fa-file-contract"></i> License Agreement</h2>
        <p>This License Agreement ("Agreement") governs your use of CODEX AI ("the Software"). By accessing or using the Software, you agree to be bound by the terms of this Agreement.</p>
        <h3>Grant of License</h3>
        <p>Subject to your compliance with this Agreement, we grant you a limited, non-exclusive, non-transferable license to use the Software for personal and commercial purposes.</p>
        <h3>Restrictions</h3>
        <ul>
          <li>You may not modify, reverse engineer, or distribute the Software without permission.</li>
          <li>You may not use the Software for illegal activities.</li>
          <li>You must comply with all applicable laws and regulations.</li>
        </ul>
        <h3>Intellectual Property</h3>
        <p>The Software and all related intellectual property rights remain our property. This Agreement does not transfer any ownership rights to you.</p>
        <h3>Termination</h3>
        <p>This license is effective until terminated. We may terminate it at any time if you breach this Agreement.</p>
        <h3>Disclaimer</h3>
        <p>The Software is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied.</p>
      `;
      break;
    case 'terms':
      content = `
        <h2><i class="fas fa-gavel"></i> Terms of Service</h2>
        <p>Welcome to CODEX AI. These Terms of Service ("Terms") govern your access to and use of our platform. By using CODEX AI, you agree to these Terms.</p>
        <h3>Acceptance of Terms</h3>
        <p>By accessing our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
        <h3>User Responsibilities</h3>
        <ul>
          <li>Provide accurate information when submitting suggestions or contacting support.</li>
          <li>Use the platform responsibly and in compliance with applicable laws.</li>
          <li>Respect intellectual property rights of others.</li>
        </ul>
        <h3>Prohibited Activities</h3>
        <ul>
          <li>Attempting to gain unauthorized access to our systems.</li>
          <li>Using the platform to distribute harmful or illegal content.</li>
          <li>Interfering with the proper functioning of the platform.</li>
        </ul>
        <h3>Service Availability</h3>
        <p>We strive to provide continuous service but do not guarantee uninterrupted access. We reserve the right to modify or discontinue services at any time.</p>
        <h3>Limitation of Liability</h3>
        <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
        <h3>Changes to Terms</h3>
        <p>We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance of the new Terms.</p>
        <h3>Contact Information</h3>
        <p>For questions about these Terms, please use our support channels.</p>
      `;
      break;
    }
  }

  modalBody.innerHTML = content;
  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.classList.remove('active');
    link.blur();
  });
}

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.modal-close-btn')) {
    closeModal();
    return;
  }

  const createBtn = e.target.closest('.create-plugin-btn');
  if (!createBtn) return;

  e.preventDefault();
  const githubLoginUrl = '/auth/github';
  window.location.href = githubLoginUrl;
});

// Handle card clicks only (skip mobile nav links)
document.addEventListener('click', (e) => {
  const closestSection = e.target.closest('[data-section]');
  if (!closestSection) return;

  const section = closestSection.dataset.section;
  if (!section || section === 'home') return;

  if (e.target.closest('.nav-links')) return; // ignore nav menu clicks here

  e.preventDefault();
  openModal(section);

  closestSection.blur();
});

// Copy to clipboard function
function copyToClipboard(button, text) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    alert('Copied to clipboard!');
    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2000);
  });
}

function setSuggestion(text) {
  const textarea = document.querySelector('.suggest-form textarea');
  if (textarea) textarea.value = text;
}

// Handle form submission
document.addEventListener('submit', (e) => {
  if (e.target.classList.contains('suggest-form')) {
    e.preventDefault();
    const textarea = e.target.querySelector('textarea');
    const text = textarea.value.trim();
    if (text) {
      const url = `https://wa.me/2347019135989?text=${encodeURIComponent('Suggestion: ' + text)}`;
      window.open(url, '_blank');
      closeModal();
    } else {
      alert('Please enter a suggestion.');
    }
  }
});

// 1. Add 'isClick' parameter
function createSnowflakes(count = 50, isInitialLoad = false) {
  const snowContainer = document.querySelector('.snow');
  if (!snowContainer) return;
  
  for (let i = 0; i < count; i++) {
    const snowflake = document.createElement('div');
    const isRealFlake = Math.random() < 0.25;
    snowflake.classList.add('snowflake');
    if (isRealFlake) snowflake.classList.add('flake');
    
    snowflake.style.left = Math.random() * 100 + '%';
    const size = isRealFlake ? Math.random() * 8 + 8 : Math.random() * 5 + 3;
    snowflake.style.width = size + 'px';
    snowflake.style.height = size + 'px';
    snowflake.style.animationDuration = Math.random() * 10 + 10 + 's';

    if (isInitialLoad) {
      // ONLY the first 70 flakes on refresh appear mid-screen
      snowflake.style.animationDelay = (Math.random() * -20) + 's';
    } else {
      // ALL other snow (clicks, intervals) starts at the TOP and falls immediately
      snowflake.style.animationDelay = '0s';
    }

    snowContainer.appendChild(snowflake);
    snowflake.addEventListener('animationend', () => snowflake.remove());
  }
}

// 1. Initial load: "true" makes them appear everywhere immediately
createSnowflakes(70, true); 

// 2. Continuous snow: starts from the top every 3 seconds
setInterval(() => createSnowflakes(10), 3000);

// 3. Click/Double-click: starts from the top immediately
document.addEventListener('click', (event) => {
  const clickedOutside = !event.target.closest('.navbar') && !event.target.closest('.card') && !event.target.closest('.modal-content');
  if (clickedOutside) {
    createSnowflakes(12); // No second argument means it starts from the top
  }
});

// Since you mentioned double-click specifically:
document.addEventListener('dblclick', (event) => {
    createSnowflakes(30); // Extra heavy burst from the top on double-click
});
