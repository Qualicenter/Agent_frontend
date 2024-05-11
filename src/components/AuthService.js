import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import config from "../config.json";

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.region,
});

export const signIn = async (username, password) => {
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: config.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
    try {
      const command = new InitiateAuthCommand(params);
      const { AuthenticationResult } = await cognitoClient.send(command);
      console.log("AuthenticationResult: ", AuthenticationResult);
      if (AuthenticationResult) {
        sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
        sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
        sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
        return AuthenticationResult;
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      throw error;
    }
  };

  export const signUp = async (email, password) => {
    const params = {
      ClientId: config.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };
    try {
      const command = new SignUpCommand(params);
      const response = await cognitoClient.send(command);
      console.log("Sign up success: ", response);
      return response;
    } catch (error) {
      console.error("Error signing up: ", error);
      throw error;
    }
  };