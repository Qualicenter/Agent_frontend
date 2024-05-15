import { useState, useEffect } from 'react';
import "./connect-streams-min.js";

const ConnectStreamsComponent = (props) => {
    const { setClientPhoneNumber } = props;
    const { setClientContactId } = props;

    useEffect(() => {
        // Initialize Connect Streams when the component mounts
        init();
  }, []);

  const init = () => {
    const instanceURL = "https://qualicentec.my.connect.aws/ccp-v2/";
    const containerDiv = document.getElementById("container-div");
    // Initialize Connect Streams when the component mounts
    connect.core.initCCP(containerDiv, {
      ccpUrl: instanceURL, // REQUIRED
      loginPopup: true, // optional, defaults to true
      loginPopupAutoClose: true, // optional, defaults to false
      loginOptions: {
        // optional, if provided opens login in new window
        autoClose: true, // optional, defaults to false
        height: 600, // optional, defaults to 578
        width: 400, // optional, defaults to 433
        top: 0, // optional, defaults to 0
        left: 0, // optional, defaults to 0
      },
      region: "us-east-1", // REQUIRED for CHAT, optional otherwise
      softphone: {
        // optional, defaults below apply if not provided
        allowFramedSoftphone: true, // optional, defaults to false
        disableRingtone: false, // optional, defaults to false
        ringtoneUrl: "./ringtone.mp3", // optional, defaults to CCP’s default ringtone if a falsy value is set
      },
      pageOptions: {
        // optional
        enableAudioDeviceSettings: false, // optional, defaults to 'false'
        enablePhoneTypeSettings: true, // optional, defaults to 'true'
      },
      ccpAckTimeout: 3000, // optional, defaults to 3000 (ms)
      ccpSynTimeout: 1000, // optional, defaults to 1000 (ms)
      ccpLoadTimeout: 4000, // optional, defaults to 5000 (ms)
    });

    // Subscribe to contact events when the CCP is initialized
    connect.contact(subscribeToContactEvents);
    //connect.agent(subscribeToAgentEvents);
  };

  const subscribeToContactEvents = async (contact) => {
    //Obtain phone number when a new call event exists
    console.log("Contact Event - Subscription initiated from contact:", contact);
    const tempNum = contact.getInitialConnection().getEndpoint().phoneNumber;
    console.log("Contact Event - Caller's phone number from endpoint:", tempNum);
    setClientPhoneNumber(tempNum);
    
    // Route to the respective handler
    //contact.onIncoming(handleContactIncoming); 
    //contact.onAccepted(handleContactAccepted);
    //contact.onConnecting(handleContactConnecting);
    contact.onConnected(handleContactConnected);
    contact.onEnded(handleContactEnded);
    //contact.onDestroyed(handleContactDestroyed);
  };

  // Event handlers for each contact event
  const handleContactConnected = (contact) => {
    console.log("Contact Event - Contact Subscription: Incoming contact connected:", contact);
    //Get contact Id:
    try {
      const contactId = contact.getContactId();
      setClientContactId(contactId);
      console.log("Contact Event - Contact ID:", contactId);
    }  catch (error) {
      console.error("Contact Event - Error fetching contact ID:", error);
    }
  };

  const handleContactEnded = (contact) => {
    console.log("Contact Event - Contact ended:", contact);
    setClientContactId(null);
    // Handle contact ended event
  };

  return <div id="container-div" style={{ width: '400px', height: '500px' }}></div>;
};

export default ConnectStreamsComponent;
