import { Response, Constants, Helpers } from "../utils/index";
import { Url } from "../models/index";
import _ from "lodash";
import { UrlService } from "../services/index";

/**
 * Controller used for creating a short url
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
  * @returns { JSON } A JSON response containing the details of the newly created short link
 * @memberof UrlController
 */
export const createShortLink = async (req, res) => {
  const longUrl = req.body.longUrl.trim().toLowerCase();
  if(!Helpers.isValidUrl(longUrl)) return Response.error(res, `Url should be in this format 'http://foo.bar' or 'https://foo.bar'`, 400);

  const longUrlExists = await UrlService.findByLongUrl(longUrl);
  if(longUrlExists) return Response.error(res, `${req.body.longUrl} has already been shortened before`, 400);

  const newUrl = new Url({longUrl}); 
  newUrl.shortUrl = Helpers.generateShortUrl();
  await newUrl.save();

  const data = _.pick(newUrl, Constants.urlDetails);
  return Response.info(res, "Url shortened successfully!", 201, data);
};

/**
 * Controller used for decoding a short url to its original long url
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the details of the short link
 * @memberof UrlController
 */
export const decode = async (req, res) => {
  // record this visit
  UrlService.recordVisit(req.url._id);

  const data = _.pick(req.url, Constants.urlDetails);
  return Response.info(res, "Url decoded successfully!", 200, data);
};

/**
 * Controller used for fetching the usage statistics of a long url
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response containing the usage statistics of a given short link
 * @memberof UrlController
 */
 export const getUrlStatistics = async (req, res) => {
    const { url } = req;
   
    const statistics = await UrlService.getUsageStatistics(url._id);
    if(statistics.length == 0) Response.error(res, `No usage statistics found for ${url.shortUrl}`, 404);

  return Response.info(res, `Showing usage statistics found for ${url.shortUrl}`, 200, statistics);
};
