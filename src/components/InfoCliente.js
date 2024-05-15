import styled from "styled-components";
import InfoComponent from "./InfoComponent";
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



const InfoCliente = ( { clientPhoneNumber, clientContactId} ) => {
    const [clientContactInformation, setClientContactInformation] = useState(null);

    const [clientName, setClientName] = useState(null);
    const [clientGender, setClientGender] = useState(null);
    const [clientPoliza, setClientPoliza] = useState(null);
    const [clientNumber, setClientNumber] = useState(null);
    const [clientPartyTypeString, setClientPartyTypeString] = useState(null);

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
        setClientPoliza(clientContactInformation.Attributes.Poliza);
        //setClientNumber(clientPhoneNumber);
        setClientPartyTypeString(clientContactInformation.PartyTypeString);

      // If the contact information is null, update the front end to show no contact information
      } else {
        console.log("Contact Event - Contact information is null");
        setClientName('');
        setClientGender('');
        setClientPoliza('');
        setClientNumber('');
      }
    }, [clientContactInformation]);



    const fetchCustomerProfile = async (phone) => {
        console.log("Contact Event - Attempting to fetch client information TWO")
        try {
          const credentials = {
            accessKeyId: "AKIA22P7R6AL2VYJI4PA",
            secretAccessKey: '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',
            region: 'us-east-1'
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
                    <InfoComponent title="Poliza" content={clientGender} />
                </Column>
                <Column>
                    <InfoComponent title="Género" content={clientPoliza} />
                    <InfoComponent title="Tipo de Cliente" content={clientNumber} />
                </Column>
            </div>
        </Container>
    )
}

export default InfoCliente;