import { dummySpørreundersøkelse } from "@/utils/dummydata";
import { spørreundersøkelseDTO } from "../_types/sporreundersokelseDTO";
import { SESSION_ID_STORAGE_KEY } from "./bliMed";
import { getCookie } from "cookies-next";

export function useSpørreundersøkelse(spørreundersøkelseId: string): {
  data: spørreundersøkelseDTO | null;
  error: string | null;
  isLoading: boolean;
} {
  const sesjonsId = getCookie(SESSION_ID_STORAGE_KEY);

  console.log("useSpørreundersøkelse", { sesjonsId, spørreundersøkelseId });

  return {
    data: dummySpørreundersøkelse,
    error: null,
    isLoading: false,
  };
}
