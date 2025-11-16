// Small client-side behavior for improved UX
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form handling: by default we'll open mailto as fallback
(function(){
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    if(!form.checkValidity()){
      form.classList.add('was-validated');
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    // Try to POST to /send (you can change to your own endpoint)
    fetch('/send', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
      if(res.ok){
        return res.json();
      } else {
        throw new Error('network');
      }
    }).then(json => {
      alertBox.style.display = 'block';
      alertBox.innerHTML = '<div class="alert alert-success">Thanks! We received your message.</div>';
      form.reset();
      form.classList.remove('was-validated');
    }).catch(err => {
      // fallback: open mail client with prefilled content
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent('Name: ' + data.name + '\nEmail: ' + data.email + '\n\n' + data.message);
      window.location.href = 'mailto:info@yourcompany.com?subject=' + subject + '&body=' + body;
    });
  });
})();

// Preview button opens Instagram profile inside modal iframe (if allowed)
document.getElementById('previewBtn').addEventListener('click', function(){
  const iframe = document.getElementById('instPreview');
  iframe.src = 'https://instagram.com/jewellnest._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
  const modalEl = document.getElementById('previewModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
});
