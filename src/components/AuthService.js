import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand, ForgotPasswordCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
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

export const forgotPassw = async (username) => {
  try {
    const input = {
      ClientId: config.clientId,
      Username: username,
    };

    const command = new ForgotPasswordCommand(input);
    const response = await cognitoClient.send(command);
    console.log("Forgot password response: ", response);
  } catch (error) {
    console.error("Error forgot password: ", error);
    throw error;
  }
}

export const confirmForgotPassw = async (username, code, newPassword) => {
  try {
    const input = {
      ClientId: config.clientId,
      ConfirmationCode: code,
      Password: newPassword,
      Username: username,
    };

    const command = new ConfirmForgotPasswordCommand(input);
    const response = await cognitoClient.send(command);
    console.log("Confirm forgot password response: ", response);
  } catch (error) {
    console.error("Error confirm forgot password: ", error);
    throw error;
  }
}