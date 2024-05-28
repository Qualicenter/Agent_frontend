import styled from "styled-components";
import InfoComponent from "./InfoComponent";
import TimerComponent from "./TimerComponent";
import { CustomerProfiles, SearchProfilesCommand } from '@aws-sdk/client-customer-profiles';
import { useEffect, useState } from "react";

const Container = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 5px;
    border: 2px solid black;

    div.info {
        display: flex;
    }
`

const Column = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`



const InfoCliente = ( props ) => {
    // Importing props from HomePage.js
    const {clientPhoneNumber, clientContactId, setClientVehicles, clientQueueDateTime} = props;
    // Contact information fetched from the API
    const [clientContactInformation, setClientContactInformation] = useState(null); // Contact Information
    // Client information to be displayed on the front end
    const [clientName, setClientName] = useState(null); // Name
    const [clientGender, setClientGender] = useState(null); // Gender
    const [clientBirthDate, setClientBirthDate] = useState(null); // Birth Date (see below for age calculation)
    const [clientAge, setClientAge] = useState(null); // Age
    const [clientPoliza, setClientPoliza] = useState(null);
    const [clientPartyTypeString, setClientPartyTypeString] = useState(null); // Party Type
    const [clientQueueDateTimeToggle, setClientQueueDateTimeToggle] = useState(null); // Queue Time toggle for front end
    // Calculate the client's age based on the birth date
    useEffect(() => {
      if (clientBirthDate) {
          const birthDate = new Date(clientBirthDate);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
              setClientAge(age - 1);
          } else {
              setClientAge(age);
          }
      }
  }, [clientBirthDate]);

    // Contact Id updates (When a call is connecting it turns to ContactId of the call, when the call is terminated it is Null again)
    useEffect(() => {
      console.log("Contact Event - Contact ID from useEffect:", {clientContactId});
      //If the contact ID is not null, fetch the client information
      if (clientContactId !== null) {
          console.log("Contact Event - Contact ID not null, attempting to fetch client information")
          fetchCustomerProfile(clientPhoneNumber);
      } else {
          console.log("Contact Event - Contact ID is null, not fetching client information")
          setClientContactInformation(null);
      }
    }, [clientContactId]);

    // Client information updates (If the contact information is not null, update the front end with the information)
    useEffect(() => {
      // If the contact information is not null, update the front end with the information
      if (clientContactInformation !== null) {
        console.log("Contact Event - Contact information from useEffect:", {clientContactInformation});
        setClientName(clientContactInformation.FirstName);
        setClientGender(clientContactInformation.Gender);
        setClientBirthDate(clientContactInformation.BirthDate);
        setClientPoliza(clientContactInformation.Attributes.Poliza);
        setClientPartyTypeString(clientContactInformation.PartyTypeString);
        setClientVehicles(clientContactInformation.AdditionalInformation);
      // If the contact information is null, update the front end to show no contact information
      } else {
        console.log("Contact Event - Contact information is null");
        setClientName('');
        setClientGender('');
        setClientPoliza('');
        setClientPartyTypeString('');
        setClientVehicles(null);
        setClientAge('');
        setClientBirthDate(null);
      }
    }, [clientContactInformation]);

    // QueueDateTime updates (If the queue start time is not null, update the front end with the information)
    useEffect(() => {
      if (clientQueueDateTime!==null){
        console.log("Contact Event - Setting QueueDateTimeToggle:", {clientQueueDateTime});
        setClientQueueDateTimeToggle(clientQueueDateTime);
      } else {
        console.log("Contact Event - Setting QueueDateTimeToggle NULL:", {clientQueueDateTime});
        setClientQueueDateTimeToggle(null);
      }
    }, [clientQueueDateTime]);

    // Function to fetch the client information from the API 
    const fetchCustomerProfile = async (phone) => {
        console.log("Contact Event - Attempting to fetch client information TWO")
        try {
          const credentials = {
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID, //AWS_ACCESS_KEY_ID
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY, //AWS_SECRET_ACCESS_KEY
            region: 'us-east-1' //AWS_REGION
          };
          
          const client = new CustomerProfiles({
            region: credentials.region,
            credentials: credentials
          });
          
          const domainName = 'amazon-connect-qualicentec';
          
          const params = {
            DomainName: domainName,
            KeyName: 'PhoneNumber',
            Values: [phone],
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

    return (
        <Container>
            <h1>Información del Cliente</h1>
            <div className="info">
                <Column>
                    <InfoComponent title="Nombre" content={clientName} />
                    <InfoComponent title="Género" content={clientGender} />
                    <InfoComponent title="Edad" content={clientAge} />
                </Column>
                <Column>
                    <InfoComponent title="Póliza" content={clientPoliza} />
                    <InfoComponent title="Tipo de Cliente" content={clientPartyTypeString} />
                    <TimerComponent queueStartTime={clientQueueDateTimeToggle} />
                </Column>
            </div>
        </Container>
    )
}

export default InfoCliente;