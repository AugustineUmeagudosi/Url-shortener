import { Url, UrlStatistics } from "../models";
import { Constants } from "../utils/index";


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

/**
 * fetches a url by short url
 * @memberof UrlService
 * @param {String} shortUrl - short url
 * @returns { Promise<Object | Error> } A promise that resolves or rejects
 * with an Array of the url resource or a DB Error.
*/
export const findByShortUrl = async(shortUrl) => {
  return Url.findOne({shortUrl});
};

/**
 * records the activities on each shorturl
 * @memberof UrlService
 * @param {String} urlId - Id of a short url
 * @returns { Promise<Object | Error> } A promise that resolves or rejects with DB Error.
*/
export const recordVisit = async(urlId) => {
  const date = new Date().toISOString().split('T')[0];
  const visits = await UrlStatistics.findOne({urlId, visitedOn: date});
  if(visits) {
    visits.visitorsCount += 1;
    await visits.save();
  }else{
    const urlStatistics = new UrlStatistics({
      urlId,
      date
    });
    await urlStatistics.save();
  }
};

/**
 * fetches short url activities
 * @memberof UrlService
 * @param {String} urlId - url id
 * @returns { Promise<Object | Error> } A promise that resolves or rejects
 * with an Array of the url resource or a DB Error.
*/
export const getUsageStatistics = async(urlId) => {
  return UrlStatistics.find({urlId}).select(Constants.urlStatistics);
};
