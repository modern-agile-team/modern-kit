import { removeSpecialCharacters } from '.';

describe.concurrent('removeSpecialCharacters', () => {
  it('should return the input string as is if there are no special characters', () => {
    const str = 'Hello World';
    expect(removeSpecialCharacters(str)).toBe('Hello World');
  });

  it('should return a string without special characters if there are special characters', () => {
    const str = 'H@#!ello, @Wo!@#!!(%)(!&@rld!';
    expect(removeSpecialCharacters(str)).toBe('Hello World');
  });
});
