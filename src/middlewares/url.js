import { UrlService } from '../services/index';
import { Response, Helpers } from '../utils';

/**
 * It checks if a short url exits
 * @param { Object } req - The request from the endpoint.
 * @param { Object } res - The response returned by the method.
 * @param { function } next - Calls the next handle.
 * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
 * @memberof UrlMiddleware
 *
 */
export const checkIfShortUrlExists = async (req, res, next) => {
  const { url_path } = req.query;
  const shortUrl = url_path.trim();
  if(!Helpers.isValidUrl(shortUrl)) return Response.error(res, `Url should be in this format 'http://foo.bar' or 'https://foo.bar'`, 400);

  const shortUrlExists = await UrlService.findByShortUrl(shortUrl);
  if (!shortUrlExists) return Response.error(res, 'Url not found.', 404);

  req.url = shortUrlExists;
  return next();
};
