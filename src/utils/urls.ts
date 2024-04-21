// URLer for API (uten hostname)
const API_BASE_URL = "/fia-arbeidsgiver/sporreundersokelse";
const API_BASE_URL_VERT = `${API_BASE_URL}/vert`;
const API_BASE_URL_DELTAKER = `${API_BASE_URL}/deltaker`;
const API_DELTAKER_BLI_MED_URL = `${API_BASE_URL}/bli-med`;

const API_VERT_UNDERSØKELSE_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
) => `${API_BASE_URL_VERT}/${sporreundersokelseId}`;

const API_VERT_TEMAOVERSIKT_OVER_ETT_TEMA_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
) => `${API_BASE_URL_VERT}/${sporreundersokelseId}/tema/${temaId}`;

const API_VERT_TEMARESULTAT_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
) => `${API_BASE_URL_VERT}/${sporreundersokelseId}/tema/${temaId}/resultater`;

const API_VERT_ANTALL_DELTAKERE_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
) => `${API_VERT_UNDERSØKELSE_URL(sporreundersokelseId)}/antall-deltakere`;

const API_VERT_SPØRSMÅL_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
  sporsmalId = ":sporsmalId",
) =>
  `${API_VERT_UNDERSØKELSE_URL(sporreundersokelseId)}/tema/${temaId}/sporsmal/${sporsmalId}`;

const API_VERT_ANTALL_SVAR_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
  sporsmalId = ":sporsmalId",
) =>
  `${API_VERT_UNDERSØKELSE_URL(
    sporreundersokelseId,
  )}/tema/${temaId}/sporsmal/${sporsmalId}/antall-svar`;

const API_DELTAKER_UNDERSØKELSE_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
) => `${API_BASE_URL_DELTAKER}/${sporreundersokelseId}`;

const API_DELTAKER_SPØRSMÅL_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
  sporsmalId = ":sporsmalId",
) =>
  `${API_DELTAKER_UNDERSØKELSE_URL(
    sporreundersokelseId,
  )}/tema/${temaId}/sporsmal/${sporsmalId}`;

const API_DELTAKER_SVAR_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
  sporsmalId = ":sporsmalId",
) =>
  `${API_DELTAKER_UNDERSØKELSE_URL(
    sporreundersokelseId,
  )}/tema/${temaId}/sporsmal/${sporsmalId}/svar`;

module.exports = {
  API_BASE_URL,
  API_BASE_URL_VERT,
  API_BASE_URL_DELTAKER,
  API_VERT_UNDERSØKELSE_URL,
  API_VERT_TEMAOVERSIKT_OVER_ETT_TEMA_URL,
  API_VERT_TEMARESULTAT_URL,
  API_VERT_ANTALL_DELTAKERE_URL,
  API_VERT_SPØRSMÅL_URL,
  API_VERT_ANTALL_SVAR_URL,
  API_DELTAKER_UNDERSØKELSE_URL,
  API_DELTAKER_SPØRSMÅL_URL,
  API_DELTAKER_SVAR_URL,
  API_DELTAKER_BLI_MED_URL,
};
