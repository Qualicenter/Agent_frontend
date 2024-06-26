/**
 * @author Eduardo Francisco Lugo Quintana
 * @author Gustavo Tellez Mireles
 * Component that displays the information of the client when a call is answered
*/

import styled from "styled-components";
import InfoComponent from "./InfoComponent";
import TimerComponent from "./TimerComponent";
import { CustomerProfiles, SearchProfilesCommand } from '@aws-sdk/client-customer-profiles';
import { useEffect, useState, useCallback } from "react";

/* Style characteristics for the components used in the client script */
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
    const {
      clientPhoneNumber,
      clientContactId,
      clientQueueDateTime, // Queue start date time string
      clientContactInformation, // Client information to be set with fetch customer API
      setClientContactInformation
    } = props;

    // Client information to be displayed on the front end, fetched from the API
    const [clientName, setClientName] = useState(null);
    const [clientGender, setClientGender] = useState(null);
    const [clientBirthDate, setClientBirthDate] = useState(null); // Birth Date (see esction below for age calculation)
    const [clientAge, setClientAge] = useState(null); // Age to be calculated from the birth date
    const [clientPoliza, setClientPoliza] = useState(null);
    const [clientPartyTypeString, setClientPartyTypeString] = useState(null);
    const [clientQueueDateTimeToggle, setClientQueueDateTimeToggle] = useState(null); // Queue Time toggle for front end display
    
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

    // Function to fetch the client information from the API 
    const fetchCustomerProfile = useCallback(async (phone) => {
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
          setClientContactInformation(contact); // Update state with fetched contact information
        } 
      } catch (error) {
        console.error("Contact Event - Error fetching contact information:", error);
      }
    }, [setClientContactInformation]);

    // Contact Id updates (When a call is connecting it turns to ContactId of the call, when the call is terminated it is Null again)
    useEffect(() => {
      console.log("Contact Event - Contact ID from useEffect:", {clientContactId});
      //If the contact ID is not null, fetch the client information
      if (clientContactId !== null) {
          fetchCustomerProfile(clientPhoneNumber); // Updates useState clientContactInformation
      } else {
          setClientContactInformation(null);
      }
    }, [clientContactId, clientPhoneNumber, fetchCustomerProfile, setClientContactInformation]);

    // Client information updates (If the contact information is not null, update the front end with the information)
    useEffect(() => {
      // If the contact information is not null, update the front end with the information
      if (clientContactInformation !== null) {

        if (clientContactInformation.MiddleName) {
          setClientName(clientContactInformation.FirstName + ' ' + clientContactInformation.MiddleName + ' ' + clientContactInformation.LastName);
        } else {
          setClientName(clientContactInformation.FirstName + ' ' + clientContactInformation.LastName);
        }
        setClientGender(clientContactInformation.Gender);
        setClientBirthDate(clientContactInformation.BirthDate);
        setClientPoliza(clientContactInformation.Attributes.Poliza);
        setClientPartyTypeString(clientContactInformation.PartyTypeString);
      // If the contact information is null, update the front end to show no contact information
      } else {
        setClientName('');
        setClientGender('');
        setClientPoliza('');
        setClientPartyTypeString('');
        setClientAge('');
        setClientBirthDate(null);
      }
    }, [clientContactInformation]);

    // QueueDateTime updates (If the queue start time is not null, update the front end with the information)
    useEffect(() => {
      if (clientQueueDateTime!==null){
        setClientQueueDateTimeToggle(clientQueueDateTime);
      } else {
        setClientQueueDateTimeToggle(null);
      }
    }, [clientQueueDateTime]);

    return (
        <Container>
            <h1>Client Information</h1>
            <div className="info">
                <Column>
                    <InfoComponent title="Name" content={clientName} />
                    <InfoComponent title="Gender" content={clientGender} />
                    <InfoComponent title="Age" content={clientAge} />
                </Column>
                <Column>
                    <InfoComponent title="Insurance Policy" content={clientPoliza} />
                    <InfoComponent title="Client Type" content={clientPartyTypeString} />
                    <TimerComponent 
                      contactId ={clientContactId}
                      queueStartTime={clientQueueDateTimeToggle} 
                    />
                </Column>
            </div>
        </Container>
    )
}

export default InfoCliente;