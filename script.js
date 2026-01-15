// ========================================
// Vanilla JavaScript for ABC Breathing Course
// ========================================

// Smooth Scroll to Section
function scrollToSection(sectionId) {
  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80;
    const top = element.offsetTop - headerHeight - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Modal Functions
function openModal(type) {
  const overlay = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  const titles = {
    contact: 'Contact Us',
    donate: 'Support Our Mission',
    enroll: 'Enroll in ABC Course'
  };

  const descriptions = {
    contact: "Have questions about the ABC Active Breathing Course? We'd love to hear from you!",
    donate: 'Your donation helps us provide free breathing courses to children and families in need.',
    enroll: 'Join our free 12-week online breathing course for children aged 7 and above.'
  };

  title.textContent = titles[type];

  let formHTML = `<p class="text-gray-600 mb-6">${descriptions[type]}</p>`;

  if (type === 'donate') {
    formHTML += `
      <form id="modal-form" onsubmit="handleModalSubmit(event, 'donate')">
        <div class="form-group">
          <label class="form-label">Select Amount</label>
          <div class="donation-amounts">
            <div class="amount-option" onclick="selectAmount('5')">£5</div>
            <div class="amount-option" onclick="selectAmount('10')">£10</div>
            <div class="amount-option" onclick="selectAmount('25')">£25</div>
            <div class="amount-option" onclick="selectAmount('50')">£50</div>
            <div class="amount-option" onclick="selectAmount('100')">£100</div>
            <div class="amount-option" onclick="selectAmount('custom')">Custom</div>
          </div>
          <input type="hidden" name="amount" id="donation-amount" value="">
          <input type="number" class="form-input mt-2" id="custom-amount" placeholder="Enter custom amount" min="1" style="display: none;">
        </div>
        <div class="form-group">
          <label class="form-label">Name *</label>
          <input type="text" name="name" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input type="email" name="email" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Message (Optional)</label>
          <textarea name="message" class="form-textarea" placeholder="Leave a message of support..."></textarea>
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button type="button" onclick="closeModal()" class="btn-modal btn-modal-cancel">Cancel</button>
          <button type="submit" class="btn-modal btn-modal-submit">Proceed to Donate</button>
        </div>
      </form>
    `;
  } else if (type === 'enroll') {
    formHTML += `
      <form id="modal-form" onsubmit="handleModalSubmit(event, 'enroll')">
        <div class="form-group">
          <label class="form-label">Parent/Guardian Name *</label>
          <input type="text" name="parentName" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input type="email" name="email" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Child's Name *</label>
          <input type="text" name="childName" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Child's Age *</label>
          <input type="number" name="childAge" class="form-input" min="7" max="18" required>
        </div>
        <div class="form-group">
          <label class="form-label">Additional Information (Optional)</label>
          <textarea name="additionalInfo" class="form-textarea"></textarea>
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button type="button" onclick="closeModal()" class="btn-modal btn-modal-cancel">Cancel</button>
          <button type="submit" class="btn-modal btn-modal-submit">Submit Enrollment</button>
        </div>
      </form>
    `;
  } else if (type === 'contact') {
    formHTML += `
      <form id="modal-form" onsubmit="handleModalSubmit(event, 'contact')">
        <div class="form-group">
          <label class="form-label">Name *</label>
          <input type="text" name="name" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input type="email" name="email" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Subject *</label>
          <input type="text" name="subject" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Message *</label>
          <textarea name="message" class="form-textarea" required></textarea>
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button type="button" onclick="closeModal()" class="btn-modal btn-modal-cancel">Cancel</button>
          <button type="submit" class="btn-modal btn-modal-submit">Send Message</button>
        </div>
      </form>
    `;
  }

  body.innerHTML = formHTML;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function closeModalOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

// Donation amount selection
let selectedDonationAmount = '';

function selectAmount(amount) {
  // Remove selected class from all
  document.querySelectorAll('.amount-option').forEach(el => {
    el.classList.remove('selected');
  });

  // Add selected class to clicked element
  event.target.classList.add('selected');

  // Update hidden input
  document.getElementById('donation-amount').value = amount;
  selectedDonationAmount = amount;

  // Show/hide custom amount input
  const customInput = document.getElementById('custom-amount');
  if (amount === 'custom') {
    customInput.style.display = 'block';
    customInput.required = true;
  } else {
    customInput.style.display = 'none';
    customInput.required = false;
  }
}

// Form submission handlers
function handleModalSubmit(event, type) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Show success message
  const body = document.getElementById('modal-body');
  let successTitle = '';
  let successMessage = '';

  if (type === 'contact') {
    successTitle = 'Message Sent!';
    successMessage = "Thank you for contacting us. We'll get back to you soon.";
  } else if (type === 'donate') {
    successTitle = 'Thank You!';
    successMessage = 'Your generous donation will help children learn healthy breathing habits.';
  } else if (type === 'enroll') {
    successTitle = 'Enrollment Received!';
    successMessage = "Thank you for enrolling! We'll send course details to your email shortly.";
  }

  body.innerHTML = `
    <div class="text-center py-8">
      <div style="width: 64px; height: 64px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
        &#10003;
      </div>
      <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
        ${successTitle}
      </h3>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">
        ${successMessage}
      </p>
      <button onclick="closeModal()" class="btn-modal btn-modal-submit">
        Close
      </button>
    </div>
  `;
}

// Newsletter form handler
function handleNewsletterSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById('newsletter-firstname').value;
  const lastName = document.getElementById('newsletter-lastname').value;
  const email = document.getElementById('newsletter-email').value;

  const messageDiv = document.getElementById('newsletter-message');
  messageDiv.style.display = 'block';
  messageDiv.style.padding = '0.75rem';
  messageDiv.style.borderRadius = '4px';
  messageDiv.style.backgroundColor = '#d1fae5';
  messageDiv.style.color = '#065f46';
  messageDiv.style.textAlign = 'center';
  messageDiv.textContent = 'Thank you for subscribing! You will receive updates from Voice of Hope.';

  // Clear form
  document.getElementById('newsletter-firstname').value = '';
  document.getElementById('newsletter-lastname').value = '';
  document.getElementById('newsletter-email').value = '';

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Active navigation highlighting on scroll (for index page)
function updateActiveNav() {
  const sections = ['home', 'find-out-more', 'exercises', 'enroll'];
  const scrollPosition = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section && scrollPosition >= section.offsetTop) {
      // Update nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });

      const activeLink = document.querySelector(`a[href="#${sections[i]}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
      break;
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add scroll listener for active nav (only on index page)
  if (document.getElementById('home')) {
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  }
});
