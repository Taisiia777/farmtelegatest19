import React, { useEffect, useState } from 'react';
// import QRCode from 'qrcode.react';

const QRCodeComponent: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      // const userAgent = navigator.userAgent;
      // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsDesktop(false);
    };

    checkIfDesktop();
  }, []);

  if (!isDesktop) {
    return null;
  }

  // const qrCodeUrl = "https://t.me/Coin_Farming_bot"; // замените ссылкой на вашу тапалку

  return (
    <div style={{display: 'flex', width:'100vw', height:'100vh',  zIndex:'999', background: 'linear-gradient(#75B245, #8BC346, #BADE4A)', flexDirection:'column', position: 'fixed', top: '0', left: '0', textAlign: 'center',}}>
       <div style={{ display: 'flex', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {/* <QRCode value={qrCodeUrl} size={300} /> */}
        <img src="img/pages/home/qrcode.svg" alt="" />
      </div>
      <p style={{ display: 'flex', margin:'20px auto', fontSize: '30px'}}>Use Telegram on your mobile!</p>
    </div>
  );
};

export default QRCodeComponent;
