/**
 * @author Aldehil Sánchez
 * This file contains the functions and operations to interact with the Cognito service.
 * It includes functions to sign in, and change password.
*/

import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../config.json";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

/**
 * Function to sign in a user using the Cognito service.
 */
export const signIn = async (username, password) => {
  // Define the parameters for the InitiateAuthCommand
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
    if (AuthenticationResult) {
      // If any token is returned, store it in the session storage
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      sessionStorage.setItem(
        "accessToken",
        AuthenticationResult.AccessToken || ""
      );
      sessionStorage.setItem(
        "refreshToken",
        AuthenticationResult.RefreshToken || ""
      );
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

/**
 * Function to indicate that the user has forgotten the password.
 * and initiate the process to reset it. After calling this function,
 * the user will receive an email with a code to reset the password.
 */
export const forgotPassw = async (username) => {
  try {
    const input = {
      ClientId: config.clientId,
      Username: username,
    };

    const command = new ForgotPasswordCommand(input);
    await cognitoClient.send(command);
  } catch (error) {
    console.error("Error forgot password: ", error);
    throw error;
  }
};

/**
 * Function to confirm the new password after the user has forgotten it.
 * This function requires the username, the code sent to the user's email,
 * and the new password.
 */
export const confirmForgotPassw = async (username, code, newPassword) => {
  try {
    const input = {
      ClientId: config.clientId,
      ConfirmationCode: code,
      Password: newPassword,
      Username: username,
    };

    const command = new ConfirmForgotPasswordCommand(input);
    await cognitoClient.send(command);
  } catch (error) {
    console.error("Error confirm forgot password: ", error);
    throw error;
  }
};
