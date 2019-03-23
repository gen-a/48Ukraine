import settings from './_settings.scss';

const smMin = parseInt(settings.smMin, 10);
const mdMin = parseInt(settings.mdMin, 10);
const lgMin = parseInt(settings.lgMin, 10);
const xlMin = parseInt(settings.xlMin, 10);

export const mediaPrefixes = {
  xs: [null, smMin - 1],
  sm: [smMin, mdMin - 1],
  md: [mdMin, lgMin - 1],
  lg: [lgMin, xlMin - 1],
  xl: [xlMin, null]
};

