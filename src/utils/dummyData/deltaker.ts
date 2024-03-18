const dummyDeltakerBliMed = {
  sesjonsId: "790fba4d-1c9f-4c20-a019-d574d9542421",
};

const dummyStartDto = {
  spørsmålId: "ef4d406d-abc2-4ed6-8de7-72a7feb40326",
  temaId: "UTVIKLE_PARTSSAMARBEID",
};

const dummyDeltakerSpørsmål = {
  spørsmålTekst: "Hvorfor?",
  svaralternativer: [
    {
      tekst: "Morroskyld",
      id: "1",
    },
    {
      tekst: "Plikt",
      id: "2",
    },
  ],
  nesteId: "ef4d406d-abc2-4ed6-8de7-72a7feb40327",
  nesteType: "SPØRSMÅL",
  forrigeId: "ef4d406d-abc2-4ed6-8de7-72a7feb40327",
  forrigeType: "SPØRSMÅL",
};

module.exports = {
  dummyDeltakerBliMed,
  dummyStartDto,
  dummyDeltakerSpørsmål,
};
