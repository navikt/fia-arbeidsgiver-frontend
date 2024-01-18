import { dummyBliMed } from "@/utils/dummydata";
import { bliMedDTO } from "../_types/bliMedDTO";

export const SESSION_ID_STORAGE_KEY = "sessionID";

export function fetchBliMed(spørreundersøkelseId: string): {
  data: bliMedDTO | null;
  error: string | null;
  isLoading: boolean;
} {
  console.log("fetchBliMed", spørreundersøkelseId);

  const response = dummyBliMed; //TODO: fetch from API
  const nySessionID = response.sesjonsId;
  localStorage.setItem(SESSION_ID_STORAGE_KEY, nySessionID);

  return {
    data: response,
    error: null,
    isLoading: false,
  };
}
