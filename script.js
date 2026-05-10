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

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('mobile-open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.navbar') && navLinks.classList.contains('mobile-open')) {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ============================================
// EASY PLUGIN MANAGEMENT SYSTEM
// Add or remove plugins here easily!
// ============================================
function generatePluginsGrid() {
  return plugins.map(plugin => `
    <div class="plugin-card">
      <h4>${plugin.name}</h4>
      <p>${plugin.description || 'No description'}</p>
      <p>Created by: ${plugin.creator || plugin.creation || 'Unknown'}</p>
      <pre class="plugin-command">${plugin.link || plugin.installCmd || 'No link'}</pre>
      <button class="copy-btn" onclick="copyToClipboard(this, '${plugin.link || plugin.installCmd || ''}')">
        <i class="fas fa-copy"></i> Copy Link
      </button>
    </div>
  `).join('');
}

let plugins = [
    
];

const lockedSections = ['tools', 'apis',]; // Sections that are currently locked and show the notice

function getModalLockNote(section) {
  if (!lockedSections.includes(section)) return '';
  return `
    <div class="modal-lock-notice">
      <i class="fas fa-lock"></i>
      <strong>Note:</strong> This section is currently locked by the developer and may be unavailable.

    </div>
  `;
}

// Modal functionality
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');


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
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
      `;
      break;
    case 'plugins':
      content = `
        <h2><i class="fas fa-puzzle-piece"></i> Available Plugins</h2>
        <p>Extend CODEX AI with powerful integrations. Copy the command text below and paste it wherever you want to install:</p>
        <div>
        

        </div>
        <div class="plugins-grid">
          ${generatePluginsGrid()}
        </div>
        <button class="create-plugin-btn" onclick="window.open('https://github.com/CODEX-SPACEX/CODEX-AI', '_blank')">
          <i class="fas fa-plus"></i> Create New Plugin
        </button>
        <h2><i class="fas fa-lightbulb"></i> Suggest Plugins</h2>
        <p>Tell us what plugins you'd like to see next:</p>
        <p>Quick suggestions: <a href="#" onclick="setSuggestion('Add more plugins')">Add more plugins</a> | <a href="#" onclick="setSuggestion('Add tutorials')">Add tutorials</a></p>
        <form class="suggest-form">
          <textarea name="suggestion" placeholder="Describe your suggestion... (max 1000 chars)" maxlength="1000" required></textarea>
          <button type="submit"><i class="fas fa-paper-plane"></i> Submit Suggestion</button>
        </form>
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
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Handle nav and card clicks
document.addEventListener('click', (e) => {
  const closestSection = e.target.closest('[data-section]');
  const section = closestSection?.dataset.section;
  if (section && section !== 'home') {
    e.preventDefault();
    openModal(section);

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.classList.toggle('active', link.dataset.section === section);
    });

    if (closestSection) {
      closestSection.blur();
    }

    if (navLinks.classList.contains('mobile-open')) {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      clearSidebarSnow();
    }
  }
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

// Load plugins from JSON
async function loadPlugins() {
  try {
    const response = await fetch('plugins.json');
    if (response.ok) {
      const data = await response.json();
      plugins = data;
    }
  } catch (e) {
    console.log('Using default plugins');
  }
}

// Load plugins on page load
document.addEventListener('DOMContentLoaded', loadPlugins);

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
