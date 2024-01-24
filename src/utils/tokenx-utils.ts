import {
  grantTokenXOboToken,
  isInvalidTokenSet,
  validateIdportenToken,
} from "@navikt/next-auth-wonderwall";
import { NextRequest } from "next/server";

export type TokenXError = {
  errorType:
    | "NO_AUTH_HEADER_FOUND"
    | "IDPORTEN_TOKEN_INVALID"
    | "TOKENX_FAILED";
  message: string;
  error?: Error | unknown;
};

export function isInvalidToken(
  tokenXResult: TokenXError | string
): tokenXResult is TokenXError {
  return typeof tokenXResult !== "string";
}

export async function exchangeIdportenSubjectToken(
  request: NextRequest,
  audience: string
): Promise<TokenXError | string> {
  const authHeader = request.headers.get("authorization");

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
      `Failed to validate due to: ${validationResult.errorType} ${validationResult.message}`
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
      `TokenX failed: ${grantResult.errorType} ${grantResult.message}`
    );
    return {
      errorType: "TOKENX_FAILED",
      message: grantResult.message,
      error: grantResult.error,
    };
  }

  return grantResult;
}
