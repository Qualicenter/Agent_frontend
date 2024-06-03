import { useEffect } from 'react';
import { ConnectClient, DescribeContactCommand, DescribeUserCommand } from '@aws-sdk/client-connect';

// 
const AgentContactInformation = (props) => {
  const {
    clientContactId,
    setAgentContactInformation
  } = props;

  useEffect(() => {
    // Passive component render alert
    console.log('Contact Event - AgentContactInformation input attribute:', clientContactId);
    // If the client contact ID is null (No active call/Call ended), reset the agent contact information
    if (clientContactId === null || clientContactId === undefined) {
      console.log('Contact Event - AgentContactInformation input is null, setting data to null');
      setAgentContactInformation(null);
    // If the client contact ID is NOT null (Active call), fetch the agent contact information
    } else {
      console.log('Contact Event - AgentContactInformation input is NOT null, attempting to fetch data with:', clientContactId);
      const fetchAgentContactInformation = async () => {

        const credentials = {
          accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID, //AWS_ACCESS_KEY_ID
          secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY, //AWS_SECRET_ACCESS_KEY
          region: 'us-east-1' //AWS_REGION
        };
        
        const client = new ConnectClient({
          region: credentials.region,
          credentials: credentials
        });

        const instanceId = 'e730139b-8673-445e-8307-c3a9250199a2';

        const describeContactCommandParams = {
          InstanceId: instanceId,
          ContactId: clientContactId
        };

        try {
          const contactCommand = new DescribeContactCommand(describeContactCommandParams); // Retrieve contact information (Agent ID, Queue ID, etc.)
          const describeContactResponse = await client.send(contactCommand);

          // Use the retrieved agent ID to retrieve agent information
          const agentId = describeContactResponse.Contact.AgentInfo.Id;

          const describeUserCommandParams = {
            UserId: agentId,
            InstanceId: instanceId
          };

          const userCommand = new DescribeUserCommand(describeUserCommandParams); // Retrieve agent information from call information agent Id (Name, Email, etc.)
          const describeUserResponse = await client.send(userCommand);

          const contactAgentInfo = {
            QueueId: describeContactResponse.Contact.QueueInfo.Id,
            InitiationTimestamp: describeContactResponse.Contact.InitiationTimestamp,
            AgentId: describeUserResponse.User.Id,
            AgentEmail: describeUserResponse.User.IdentityInfo.Email,
            AgentFirstName: describeUserResponse.User.IdentityInfo.FirstName,
            AgentLastName: describeUserResponse.User.IdentityInfo.LastName,
            AgentUsername: describeUserResponse.User.Username
          };

          setAgentContactInformation(contactAgentInfo); // Set the agent and contact information
          console.log('Contact Event - AgentContactInformation set data to:', contactAgentInfo);
        } catch (error) {
          console.error('Error fetching contact information:', error);
          setAgentContactInformation(null);
        }
      };

      fetchAgentContactInformation();
    }
  }, [clientContactId]);

  return null;
};

export default AgentContactInformation;