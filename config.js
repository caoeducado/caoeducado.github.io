/* =========================================================
   CONFIGURAÇÃO DO FUNIL — edite só este arquivo
   ========================================================= */
window.FUNIL = {
  // Link do checkout (Kiwify, Hotmart, Cakto, Perfect Pay...)
  CHECKOUT_URL: "https://SEU-CHECKOUT-AQUI.com",

  // ID do Pixel da Meta (deixe "" para desativar)
  PIXEL_ID: "",

  // Link de incorporação da VSL (YouTube/Vimeo/Panda/Vturb). Deixe "" para mostrar a imagem do produto.
  // Ex.: "https://www.youtube.com/embed/XXXXXXXX"
  VIDEO_EMBED: "",

  PRECO: "37,90",
  PARCELAS: "5x de R$ 8,50", // confira o valor exato na sua plataforma
  EMAIL_SUPORTE: "seu-email@exemplo.com"
};

/* ---------- Pixel da Meta ---------- */
(function () {
  var id = window.FUNIL.PIXEL_ID;
  if (!id) { window.fbq = function () {}; return; }
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', id);
  fbq('track', 'PageView');
})();

/* ---------- Repassa só os parâmetros de rastreamento (UTMs etc.) ---------- */
window.FUNIL.withParams = function (url) {
  var u = new URL(url, location.href);
  var keep = /^(utm_|fbclid$|gclid$|src$|sck$|xcod$)/;
  new URLSearchParams(location.search).forEach(function (v, k) {
    if (keep.test(k) && !u.searchParams.has(k)) u.searchParams.set(k, v);
  });
  return u.toString();
};

/* ---------- Respostas do quiz (ficam só no navegador do visitante) ---------- */
window.FUNIL.save = function (data) {
  try { sessionStorage.setItem("quiz", JSON.stringify(data)); } catch (e) {}
};
window.FUNIL.load = function () {
  try { return JSON.parse(sessionStorage.getItem("quiz")) || {}; } catch (e) { return {}; }
};
