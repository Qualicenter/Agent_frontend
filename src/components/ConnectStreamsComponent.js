import { useEffect, useState } from 'react';
import "./connect-streams-min.js";

const ConnectStreamsComponent = (props) => {
    
    // Importing props from HomePage.js
    const { setClientPhoneNumber } = props;
    const { setClientContactId } = props;
    const { setClientQueueDateTime } = props;

    // use state to keep track of the duration of the call
    const [duration, setDuration] = useState(0);
    const [timerID, setTimerID] = useState(null);
    useEffect(() => {
        // Initialize Connect Streams when the component mounts
        init();
  }, []);

  const init = () => {
    const instanceURL = "https://qualicentec.my.connect.aws/ccp-v2/";
    const containerDiv = document.getElementById("container-div");
    // Initialize Connect Streams when the component mounts
    /* eslint-disable no-undef */
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
        //ringtoneUrl: "./ringtone.mp3", // optional, defaults to CCP’s default ringtone if a falsy value is set
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
    try {
      // Extract the 'CurrentTime' attribute from the contact's attribute map
      console.log("Contact Event - ATTRIBUTE MAP", contact.getAttributes());
      const attributes = contact.getAttributes();
      if (attributes && attributes.CurrentTime && attributes.CurrentTime.value) {
          const queueStartTime = attributes.CurrentTime.value;
          // Use the setClientQueueDateTime function to update the state with the extracted time
          console.log("Contact Event - Setting queueStartTime from ATTRIBUTE MAP", queueStartTime);
          setClientQueueDateTime(queueStartTime);
      }
    } catch (error) {
      console.error("Contact Event - Error fetching queue start time:", error);
    }

    try {
      //Obtain phone number when a new call event exists
      console.log("Contact Event - Subscription initiated from contact:", contact);
      const tempNum = contact.getInitialConnection().getEndpoint().phoneNumber;
      console.log("Contact Event - Caller's phone number from endpoint:", tempNum);
      setClientPhoneNumber(tempNum);
    } catch (error) {
      console.error("Contact Event - Error fetching phone number:", error);
    }

    // Route to the respective handler
    //contact.onIncoming(handleContactIncoming); 
    //contact.onAccepted(handleContactAccepted);
    //contact.onConnecting(handleContactConnecting);
    contact.onConnected(handleContactConnected);
    contact.onEnded(handleContactEnded);
    //contact.onDestroyed(handleContactDestroyed);
  };

  let counter = 0;
  // Event handlers for each contact event
  const handleContactConnected = (contact) => {
    console.log("Contact Event - Contact Subscription: Incoming contact connected:", contact);
    
    try {
      //Get contact Id:
      const contactId = contact.getContactId();
      setClientContactId(contactId);
      // Set interval to tick
      const interval = setInterval(() => {
        if (counter % 2 === 0) {
          tick();
        }
        counter++;
      }, 1000);
      // Set timer ID
      setTimerID(interval);
      console.log("Contact Event - Contact ID:", contactId);
    }  catch (error) {
      console.error("Contact Event - Error fetching contact ID:", error);
    }
  };

  const handleContactEnded = (contact) => {
    console.log("Contact Event - Contact ended:", contact);
    // Reset client contact ID
    setClientContactId(null);
    // Reset client queue date time
    setClientQueueDateTime(null);
    clearInterval(timerID);
    setDuration(0);
    counter = 0;
    // Handle contact ended event
  };
  const tick = () => {
    setDuration((prevDuration) => prevDuration + 1);
  };

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  let color;

  if (minutes >= 3) {
    color = "red";
  } else if (minutes == 2 && seconds > 30) {
    color = "orange";
  } else {
    color = "green";
  }

  return (
    <div>
      <div style={{ color }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div id="container-div" style={{ width: "400px", height: "500px" }}></div>
    </div>
  );
};

export default ConnectStreamsComponent;
