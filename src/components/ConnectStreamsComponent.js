import React, { useEffect } from 'react';
import './connect-streams-min.js';

const ConnectStreamsComponent = () => {
  useEffect(() => {
    // Initialize Connect Streams when the component mounts
    init();
  }, []);

  const init = () => {
    const containerDiv = document.getElementById("container-div");
    const instanceURL = "https://qualicentec.my.connect.aws/ccp-v2/";

    // Initialize the streams api
    connect.core.initCCP(containerDiv, {
      ccpUrl: instanceURL,            // REQUIRED
      loginPopup: true,               // optional, defaults to true
      loginPopupAutoClose: true,      // optional, defaults to false
      loginOptions: {                 // optional, if provided opens login in new window
        autoClose: true,              // optional, defaults to false
        height: 600,                  // optional, defaults to 578
        width: 400,                   // optional, defaults to 433
        top: 0,                       // optional, defaults to 0
        left: 0                       // optional, defaults to 0
      },
      region: "us-east-1",            // REQUIRED for CHAT, optional otherwise
      softphone: {                    // optional, defaults below apply if not provided
        allowFramedSoftphone: true,   // optional, defaults to false
        disableRingtone: false,       // optional, defaults to false
        ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
      },
      pageOptions: {                  // optional
        enableAudioDeviceSettings: false, // optional, defaults to 'false'
        enablePhoneTypeSettings: true    // optional, defaults to 'true' 
      },
      ccpAckTimeout: 3000, // optional, defaults to 3000 (ms)
      ccpSynTimeout: 1000, // optional, defaults to 1000 (ms)
      ccpLoadTimeout: 4000 // optional, defaults to 5000 (ms)
    });
  };

  return <div id="container-div" style={{ width: '400px', height: '500px' }}></div>;
};

export default ConnectStreamsComponent;
