import { validate } from '@/src/lib/inputValidation/validation';

describe('validate', () => {
  test('should return true for required rule with non-empty string value', async () => {
    const result = await validate({ rule: 'required', value: 'test' });
    expect(result).toBe(true);
  });

  test('should return true for required rule with non-empty array of string value', async () => {
    const result = await validate({ rule: 'required', value: ['test'] });
    expect(result).toBe(true);
  });

  test('should return false for required rule with empty  string value', async () => {
    const result = await validate({ rule: 'required', value: '' });
    expect(result).toBe(false);
  });

  test('should return false for required rule with empty array value', async () => {
    const result = await validate({ rule: 'required', value: [] });
    expect(result).toBe(false);
  });

  test('should return true for email rule with valid email case 1(user@example.com)', async () => {
    const result = await validate({ rule: 'email', value: 'user@example.com' });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case 2(user123@email.co.uk)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'user123@email.co.uk',
    });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case 3(john.doe@company.org)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'john.doe@company.org',
    });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case 4(user_name1234@email-provider.net)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'user_name1234@email-provider.net',
    });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case 5(info@sub.domain.com)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'info@sub.domain.com',
    });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case 6(name@my-email-provider.xyz)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'name@my-email-provider.xyz',
    });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case7(john.doe@email.travel)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'john.doe@email.travel',
    });
    expect(result).toBe(true);
  });

  test('should return true for email rule with valid email case8(_______@domain.com)', async () => {
    const result = await validate({
      rule: 'email',
      value: '_______@domain.com',
    });
    expect(result).toBe(true);
  });

  test('should return false for email rule with invalid email case 1(invalidemail.com)', async () => {
    const result = await validate({ rule: 'email', value: 'invalidemail.com' });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 2(user@invalid-tld.123)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'user@invalid-tld.123',
    });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 3(user#domain.com)', async () => {
    const result = await validate({ rule: 'email', value: 'user#domain.com' });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 4(user#domain.con)', async () => {
    const result = await validate({ rule: 'email', value: 'user#domain.con' });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 5(user&name@email-provider.net)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'user&name@email-provider.net',
    });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 6(spaced user@domain.info)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'spaced user@domain.info',
    });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 7(@.com)', async () => {
    const result = await validate({ rule: 'email', value: '@.com' });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 8(user@domain with space.com)', async () => {
    const result = await validate({
      rule: 'email',
      value: 'user@domain with space.com',
    });
    expect(result).toBe(false);
  });

  test('should return false for email rule with invalid email case 9(user@domain..com)', async () => {
    const result = await validate({ rule: 'email', value: 'user@domain..com' });
    expect(result).toBe(false);
  });

  test('should return true for url rule with valid URL', async () => {
    const result = await validate({
      rule: 'url',
      value: 'https://example.com',
    });
    expect(result).toBe(true);
  });

  test('should return false for url rule with invalid URL', async () => {
    const result = await validate({ rule: 'url', value: 'invalid-url' });
    expect(result).toBe(false);
  });
});
