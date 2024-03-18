// URLer for API (uten hostname)
const API_BASE_URL = "/fia-arbeidsgiver/sporreundersokelse";
const API_BASE_URL_VERT = `${API_BASE_URL}/vert/v2`;
const API_BASE_URL_DELTAKER = `${API_BASE_URL}/deltaker`;

const API_VERT_UNDERSØKELSE_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
) => `${API_BASE_URL_VERT}/${sporreundersokelseId}`;
const API_VERT_UNDERSØKELSE_STATUS_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
) => `${API_VERT_UNDERSØKELSE_URL(sporreundersokelseId)}/status`;
const API_VERT_SPØRSMÅL_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
  sporsmalId = ":sporsmalId",
) =>
  `${API_VERT_UNDERSØKELSE_URL(sporreundersokelseId)}/${temaId}/${sporsmalId}`;
const API_VERT_ANTALL_SVARTE_URL = (
  sporreundersokelseId = ":sporreundersokelseId",
  temaId = ":temaId",
  sporsmalId = ":sporsmalId",
) =>
  `${API_VERT_UNDERSØKELSE_URL(
    sporreundersokelseId,
  )}/${temaId}/${sporsmalId}/status`;

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
  )}/${temaId}/${sporsmalId}`;

module.exports = {
  API_BASE_URL,
  API_BASE_URL_VERT,
  API_BASE_URL_DELTAKER,
  API_VERT_UNDERSØKELSE_URL,
  API_VERT_UNDERSØKELSE_STATUS_URL,
  API_VERT_SPØRSMÅL_URL,
  API_VERT_ANTALL_SVARTE_URL,
  API_DELTAKER_UNDERSØKELSE_URL,
  API_DELTAKER_SPØRSMÅL_URL,
};
