import { Url } from "../models";


/**
 * fetches a url by long url
 * @memberof UrlService
 * @param {String} longUrl - long url
 * @returns { Promise<Object | Error> } A promise that resolves or rejects
 * with an Array of the url resource or a DB Error.
*/
export const findByLongUrl = async(longUrl) => {
  return Url.findOne({longUrl});
};

