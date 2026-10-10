(function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Appointment form: validates and opens WhatsApp with the request.
  // Replace WHATSAPP_NUMBER (country code, no +) with the clinic's number.
  var WHATSAPP_NUMBER = '900000000000';
  var form = document.getElementById('appt-form');
  var note = document.getElementById('form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name, phone = form.elements.phone, ok = true;
    [name, phone].forEach(function (f) {
      var bad = !f.value.trim();
      f.setAttribute('aria-invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) { note.textContent = 'Lütfen ad soyad ve telefon numaranızı girin.'; return; }
    var msg = 'Merhaba, randevu talep etmek istiyorum.\n' +
      'Ad soyad: ' + name.value.trim() + '\n' +
      'Telefon: ' + phone.value.trim() + '\n' +
      'Hizmet: ' + form.elements.service.value +
      (form.elements.date.value ? '\nTarih: ' + form.elements.date.value : '');
    note.textContent = 'Talebiniz WhatsApp’ta açılıyor.';
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();
