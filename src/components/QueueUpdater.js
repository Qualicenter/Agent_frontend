import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const QueueUpdater = ({ customerContactId }) => {
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    if (contactId !== null) {
      // Initialize AWS SDK with your credentials and region
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      });
      
      // Create DynamoDB service object
      const dynamoDB = new AWS.DynamoDB.DocumentClient();

      // Define the params for DynamoDB update
      const params = {
        TableName: 'CallsInQueueQualicenter',
        Key: {
          'ContactID': contactId
        },
        UpdateExpression: 'SET InQueue = :val',
        ExpressionAttributeValues: {
          ':val': false
        }
      };

      // Update DynamoDB item
      dynamoDB.update(params, (err, data) => {
        if (err) {
          console.error("Queue Update: Unable to update item. Error:", JSON.stringify(err, null, 2));
        } else {
          console.log("Contact Event - QueueUpdater update succeeded:", JSON.stringify(data, null, 2));
        }
      });
    }
  }, [contactId]);

  // Set the contactId when the component receives a new customerContactId prop
  useEffect(() => {
    setContactId(customerContactId);
  }, [customerContactId]);

  return null;
};

export default QueueUpdater;
