import { useState, useEffect } from 'react';
import "./connect-streams-min.js";
import { CustomerProfiles, SearchProfilesCommand } from '@aws-sdk/client-customer-profiles';

const ConnectStreamsComponent = () => {
    const [clientContactId, setClientContactId] = useState(null);
    const [clientPhoneNumber, setClientPhoneNumber] = useState(null);
    const [clientContactInformation, setClientContactInformation] = useState(null)
    useEffect(() => {
        // Initialize Connect Streams when the component mounts
        init();
  }, []);

  // Contact Id updates
  // When a call is connecting it turns to ContactId of the call, when the call is terminated it is Null again)
  useEffect(() => {
    console.log("Contact Event - Contact ID from useEffect:", clientContactId);
  }, [clientContactId]);

  // Client phone number updates
  // When a call is connecting it gets the phone number value, it wont change until another call is connecting.
  useEffect(() => {
    console.log("Contact Event - Caller's phone number from useEffect:", clientPhoneNumber);
    if (clientPhoneNumber !== null) {
      console.log("Contact Event - Attempting to fetch client information")
      fetchCustomerProfile();
    }
  }, [clientPhoneNumber]);

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
    // Handle contact ended event
  };

  const fetchCustomerProfile = async () => {
    console.log("Contact Event - Attempting to fetch client information TWO")
    try {
      const credentials = {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION
      };
      
      const client = new CustomerProfiles({
        region: credentials.region,
        credentials: credentials
      });
      
      const domainName = 'amazon-connect-qualicentec';
      const phoneNumber = '+525552186232'; // Static phone number for now
      
      const params = {
        DomainName: domainName,
        KeyName: 'PhoneNumber',
        Values: [phoneNumber],
        MaxResults: 1
      };
      
      const command = new SearchProfilesCommand(params);
      const response = await client.send(command);
      
      if (response.Items && response.Items.length > 0) {
        const contact = response.Items[0];
        console.log("Contact Event - Successfully fetched contact info:", contact);
        setClientContactInformation(contact); // Update state with fetched contact information
      } else {
        console.log("Contact Event - Customer profile not found.");
      }
    } catch (error) {
      console.error("Contact Event - Error fetching contact information:", error);
    }
  };

  return <div id="container-div" style={{ width: '400px', height: '500px' }}></div>;
};

export default ConnectStreamsComponent;
