import '../styles/transcripcion.css'
import { ConnectContactLensClient, ListRealtimeContactAnalysisSegmentsCommand } from "@aws-sdk/client-connect-contact-lens"; // ES Modules import
import { AWS_ACCESS_KEY_ID, AWS_REGION } from '../config';

const config = {
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID // Reemplaza con tu Access Key ID // Reemplaza con tu Secret Access Key
    },
  };

const client = new ConnectContactLensClient(config);

const input = { // ListRealtimeContactAnalysisSegmentsRequest
    InstanceId: "e730139b-8673-445e-8307-c3a9250199a2", // required
    ContactId: "b89a2cbe-8ee5-498d-8fa9-9544563e9e72", // required
};

const command = new ListRealtimeContactAnalysisSegmentsCommand(input);
const response = await client.send(command);
console.log(response); // successful response

const Transcripcion = () => {
    return(
        
        <h1 className="ventana-transcripcion"> ESTO ES UNA PRUEBA</h1>
    )
    
}

export default Transcripcion;