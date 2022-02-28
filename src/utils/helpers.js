import "dotenv/config";
import Chance from "chance";

const chance = new Chance();

/**
 * Url shortner.
 * @memberof Helpers
 * @returns { string } - a unique url.
 */
 export const generateShortUrl = () => {
  const code  = chance.string({ length: 6, alpha: true, numeric: true });
  return `http://short.est/${stringSanitizer(code)}`;
};

/**
 * This is used to sanitize route parameters of dynamic routes
 * @param {string} urlParameter - route parameters to be sanitized.
 * @memberof Helper
 * @returns {string} - returns a string of the sanitized string.
 */
 export const stringSanitizer = (urlParameter) => {
  urlParameter = urlParameter.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return urlParameter.trim();
};

/**
 * This is used to validate a given url
 * @param {string} url - route parameters to be sanitized.
 * @memberof Helper
 * @returns {string} - returns true or false.
 */
 export const isValidUrl = (url) => {
  const regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return regEx.test(url);
};