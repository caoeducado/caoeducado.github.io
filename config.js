/* =========================================================
   CONFIGURAÇÃO DO FUNIL — edite só este arquivo
   ========================================================= */
window.FUNIL = {
  // Link do checkout (Kiwify, Hotmart, Cakto, Perfect Pay...)
  CHECKOUT_URL: "https://pay.cakto.com.br/37thzrv_1142951",

  // Pixel da Utmify (ele mesmo carrega o Pixel da Meta 1439518558047227 configurado na Utmify
  // e envia PageView, ViewContent e InitiateCheckout, também pela API de Conversões)
  UTMIFY_PIXEL_ID: "6ab8f55be1f9dc92edd6428e",

  // Link de incorporação da VSL (YouTube/Vimeo/Panda/Vturb). Deixe "" para mostrar a imagem do produto.
  // Ex.: "https://www.youtube.com/embed/XXXXXXXX"
  VIDEO_EMBED: "",

  PRECO: "27,90",
  PARCELAS: "até 5x no cartão", // troque pelo valor exato que a Cakto mostrar (ex.: "5x de R$ 6,35")
  EMAIL_SUPORTE: "" // preencha com o e-mail de suporte do Cão Educado (vazio = não mostra)
};

/* ---------- Pixel da Utmify (equivale ao código gerado no painel da Utmify) ---------- */
(function () {
  var id = window.FUNIL.UTMIFY_PIXEL_ID;
  if (!id) return;
  window.pixelId = id;
  var s = document.createElement("script");
  s.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
  s.async = true; s.defer = true;
  (document.head || document.documentElement).appendChild(s);
})();

/* ---------- Eventos extras do quiz (QuizStart, Lead) ----------
   Espera a Utmify carregar o Pixel da Meta e só então envia, para não perder nem duplicar. */
window.FUNIL.track = function (method, name, data) {
  var tries = 0;
  (function send() {
    var f = window.fbq;
    var ready = f && f.getState && f.getState().pixels && f.getState().pixels.length;
    if (ready) { f(method, name, data || {}); return; }
    if (++tries < 60) setTimeout(send, 500); // tenta por até 30 s
  })();
};

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
