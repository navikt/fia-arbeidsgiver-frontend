import { dummySpørreundersøkelse } from "@/utils/dummydata";
import { spørreundersøkelseDTO } from "../_types/spørreundersøkelseDTO";

export function useSpørreundersøkelse(): {
  data: spørreundersøkelseDTO | null;
  error: string | null;
  isLoading: boolean;
} {
  return {
    data: dummySpørreundersøkelse,
    error: null,
    isLoading: false,
  };
}
