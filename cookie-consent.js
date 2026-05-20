(function() {
  var GA_ID = 'G-BV3T1X57VX';
  var STORAGE_KEY = 'omConsent';

  function loadAnalytics() {
    if (window.__omGaLoaded) return;
    window.__omGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function buildBanner() {
    var b = document.createElement('div');
    b.className = 'om-cookie-banner';
    b.id = 'omCookieBanner';
    b.innerHTML =
      '<p class="om-cookie-text">We use cookies to ensure the finest experience. <a href="/privacy.html">Learn more</a></p>' +
      '<div class="om-cookie-actions">' +
        '<button type="button" class="om-cookie-btn-secondary" id="omCookieDecline">Decline</button>' +
        '<button type="button" class="om-cookie-btn" id="omCookieAccept">Allow</button>' +
      '</div>';
    document.body.appendChild(b);

    document.getElementById('omCookieAccept').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      hideBanner();
      loadAnalytics();
    });

    document.getElementById('omCookieDecline').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, 'declined');
      hideBanner();
    });

    // Show with small delay so it doesn't fight splash
    setTimeout(function() { b.classList.add('visible'); }, 1500);
  }

  function hideBanner() {
    var b = document.getElementById('omCookieBanner');
    if (b) b.classList.remove('visible');
  }

  function init() {
    var consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted') {
      loadAnalytics();
    } else if (consent === 'declined') {
      // do nothing
    } else {
      buildBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for "Cookie Settings" link in future
  window.OMCookie = {
    reset: function() {
      localStorage.removeItem(STORAGE_KEY);
      hideBanner();
      buildBanner();
    }
  };
})();
