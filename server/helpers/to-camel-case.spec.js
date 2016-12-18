const toCamelCase = require('./to-camel-case');
const { assert } = require('chai');

describe('server middleware plugins to-camel-case -- unit', () => {
  const NAME_WITH_HYPHENS = '0_body-parser';
  const EXPECTED_NAME_CAMELCASED = '0_bodyParser';

  context('when passed a string with a single hyphen seperating words', () => {
    it('should return the same string with the hyphens removed and the first let of the word capitalize, using camel case', () => {
      let result = toCamelCase(NAME_WITH_HYPHENS);
      assert.equal(result, EXPECTED_NAME_CAMELCASED, `The result ${result} was not camel cased as expected`);
    });
  });
});
