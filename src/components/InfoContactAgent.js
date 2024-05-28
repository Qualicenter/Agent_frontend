import { useEffect } from 'react';
import { ConnectClient, DescribeContactCommand, DescribeUserCommand } from '@aws-sdk/client-connect';

// 
const AgentContactInformation = (props) => {
  const {
    clientContactId,
    setAgentContactInformation
  } = props;

  useEffect(() => {
    if (clientContactId == null) {
      setAgentContactInformation(null);
      return;
    }

    const fetchAgentContactInformation = async () => {
      const client = new ConnectClient({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      });

      const instanceId = 'e730139b-8673-445e-8307-c3a9250199a2';

      const params = {
        InstanceId: instanceId,
        ContactId: clientContactId,
      };

      try {
        const contactCommand = new DescribeContactCommand(params);
        const describeContactResponse = await client.send(contactCommand);
        const agentId = describeContactResponse.Contact.AgentInfo.Id;

        const userParams = {
          UserId: agentId,
          InstanceId: instanceId,
        };

        const userCommand = new DescribeUserCommand(userParams);
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

        setAgentContactInformation(contactAgentInfo);
      } catch (error) {
        console.error('Error fetching contact information:', error);
        setAgentContactInformation(null);
      }
    };

    fetchAgentContactInformation();
  }, [clientContactId, setAgentContactInformation]);

  return null;
};

export default AgentContactInformation;