"use server";

export const getFaroEnv = async () => ({
  FARO_URL: process.env.FARO_URL,
});
