import faker from 'faker';

export const longUrl = {
  longUrl: `https://www.${faker.internet.domainWord()}.${faker.internet.domainSuffix()}`
};

export const badLongUrl = {
  longUrl: `www.${faker.internet.domainWord()}.${faker.internet.domainSuffix()}`
};
