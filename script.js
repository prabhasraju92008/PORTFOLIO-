/* ==========================================================================
   R.B. Prabhas Raju - Personal Portfolio Logic (script.js)
   Vanilla JavaScript for Navigation, Interactive Simulators & Contact
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileDrawer();
  initModalBackdropClick();
});

// 1. Navigation Active Link Tracker on Scroll
function initNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// 2. Mobile Drawer Toggle
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
}

// 3. Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModalBackdropClick() {
  window.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}

// 4. Toast Notification
function showToast(message) {
  const toast = document.getElementById('toastMessage');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// 5. Copy Email
function copyEmail() {
  navigator.clipboard.writeText('prabhasraju.3009@gmail.com');
  showToast('Email address copied to clipboard!');
}

// 6. Contact Form Submission
function handleFormSubmit(e) {
  e.preventDefault();
  showToast('Message sent successfully! Thank you.');
  e.target.reset();
}

// ==========================================================================
// SIMULATOR 1: Voter Eligibility Calculator
// ==========================================================================
function runVoterCalculation() {
  const age = parseInt(document.getElementById('voterAgeInput').value, 10) || 0;
  const minAge = parseInt(document.getElementById('voterRegionSelect').value, 10) || 18;
  const isCitizen = document.getElementById('voterCitizenCheck').checked;
  const verdict = document.getElementById('voterVerdict');

  if (!isCitizen) {
    verdict.className = 'verdict-box verdict-fail';
    verdict.innerHTML = '<strong>Not Eligible:</strong> Applicant must hold official legal citizenship in the electoral jurisdiction.';
  } else if (age < minAge) {
    verdict.className = 'verdict-box verdict-fail';
    verdict.innerHTML = `<strong>Not Eligible:</strong> Applicant age (${age}) is below the statutory requirement of ${minAge} years.`;
  } else {
    verdict.className = 'verdict-box verdict-success';
    verdict.innerHTML = `<strong>Eligible to Vote:</strong> Applicant meets all age (${age}/${minAge}+) and citizenship requirements.`;
  }
}

// ==========================================================================
// SIMULATOR 2: ATM Management System Simulation
// ==========================================================================
let currentBalance = 2450.00;
const registeredPin = '1234';

function loginAtm() {
  const pin = document.getElementById('atmPinInput').value;
  if (pin === registeredPin) {
    document.getElementById('atmAuthScreen').style.display = 'none';
    document.getElementById('atmDashboardScreen').style.display = 'block';
    document.getElementById('atmConsoleLog').textContent = 'PIN verified. Account session active.';
  } else {
    alert('Incorrect PIN. Please use default PIN: 1234');
  }
}

function atmWithdrawPrompt() {
  if (currentBalance >= 50) {
    currentBalance -= 50;
    document.getElementById('atmBalanceDisplay').textContent = currentBalance.toFixed(2);
    document.getElementById('atmConsoleLog').textContent = 'Withdrew $50.00. Remaining balance: $' + currentBalance.toFixed(2);
  } else {
    alert('Insufficient funds.');
  }
}

function atmDepositPrompt() {
  currentBalance += 100;
  document.getElementById('atmBalanceDisplay').textContent = currentBalance.toFixed(2);
  document.getElementById('atmConsoleLog').textContent = 'Deposited $100.00. New balance: $' + currentBalance.toFixed(2);
}

function atmCheckBalance() {
  document.getElementById('atmConsoleLog').textContent = 'Current Available Balance: $' + currentBalance.toFixed(2);
}

function atmLogout() {
  document.getElementById('atmPinInput').value = '';
  document.getElementById('atmAuthScreen').style.display = 'block';
  document.getElementById('atmDashboardScreen').style.display = 'none';
}

// ==========================================================================
// SIMULATOR 3: Student Grade & SGPA Calculator
// ==========================================================================
function calculateGPA() {
  const inputs = document.querySelectorAll('.grade-input');
  const credits = [4, 4, 3, 3];
  let totalPts = 0;
  const totalCreds = 14;
  let sumMarks = 0;

  inputs.forEach((inp, idx) => {
    const val = Math.min(100, Math.max(0, parseFloat(inp.value) || 0));
    sumMarks += val;
    let pt = 0;
    if (val >= 90) pt = 10;
    else if (val >= 80) pt = 9;
    else if (val >= 70) pt = 8;
    else if (val >= 60) pt = 7;
    else if (val >= 50) pt = 6;
    else if (val >= 40) pt = 5;
    totalPts += (pt * credits[idx]);
  });

  const sgpa = (totalPts / totalCreds).toFixed(2);
  const avg = (sumMarks / inputs.length).toFixed(1);

  document.getElementById('sgpaDisplay').textContent = sgpa;
  document.getElementById('avgMarksDisplay').textContent = avg + '%';
}
