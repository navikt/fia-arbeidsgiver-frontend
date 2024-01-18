import { dummyBliMed } from "@/utils/dummydata";
import { bliMedDTO } from "../_types/bliMedDTO";

export function useBliMed(): {
  data: bliMedDTO | null;
  error: string | null;
  isLoading: boolean;
} {
  return {
    data: dummyBliMed,
    error: null,
    isLoading: false,
  };
}
