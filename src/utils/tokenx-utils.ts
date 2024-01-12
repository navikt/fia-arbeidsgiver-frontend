import {
  grantTokenXOboToken,
  isInvalidTokenSet,
  validateIdportenToken,
} from "@navikt/next-auth-wonderwall";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

export default async function proxyRequestWithTokenExchange({
  request,
  response,
  audience,
  hostname,
  path,
}: {
  request: NextApiRequest;
  response: NextApiResponse;
  path: string;
  hostname: string;
  audience: string | undefined;
}) {
  if (audience === undefined) {
    return response
      .status(500)
      .json({ error: "authentication failed: missing audience" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(request, audience);

  if (isInvalidToken(newAuthToken)) {
    return response
      .status(401)
      .json({ error: "authentication failed: invalid auth token" });
  }

  await proxyApiRouteRequest({
    req: request,
    res: response,
    hostname: hostname,
    path: path,
    bearerToken: newAuthToken,
    https: false,
  });
}

export type TokenXError = {
  errorType:
    | "NO_AUTH_HEADER_FOUND"
    | "IDPORTEN_TOKEN_INVALID"
    | "TOKENX_FAILED";
  message: string;
  error?: Error | unknown;
};

export function isInvalidToken(
  tokenXResult: TokenXError | string,
): tokenXResult is TokenXError {
  return typeof tokenXResult !== "string";
}

export async function exchangeIdportenSubjectToken(
  request: IncomingMessage,
  audience: string,
): Promise<TokenXError | string> {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    console.log("No token found in authorization header.");
    return {
      errorType: "NO_AUTH_HEADER_FOUND",
      message: "No token found in authorization header.",
    };
  }

  const validationResult = await validateIdportenToken(authHeader);
  if (validationResult !== "valid") {
    console.log(
      `Failed to validate due to: ${validationResult.errorType} ${validationResult.message}`,
    );
    return {
      errorType: "IDPORTEN_TOKEN_INVALID",
      message: validationResult.message,
      error: validationResult.error,
    };
  }

  const validSubjectToken = authHeader.replace("Bearer ", "");

  const grantResult = await grantTokenXOboToken(validSubjectToken, audience);
  if (isInvalidTokenSet(grantResult)) {
    console.error(
      `TokenX failed: ${grantResult.errorType} ${grantResult.message}`,
    );
    return {
      errorType: "TOKENX_FAILED",
      message: grantResult.message,
      error: grantResult.error,
    };
  }

  return grantResult;
}
