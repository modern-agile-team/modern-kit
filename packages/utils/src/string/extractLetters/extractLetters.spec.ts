import { extractLetters } from '.';

describe.concurrent('extractLetters', () => {
  it('should return a string with only letters if options argument is not defined.', () => {
    const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300!';

    const letterOnly = extractLetters(input);
    expect(letterOnly).toBe('Hello世界안녕하세요こんにちは');
  });

  it('should return a string that reflects the options setting', () => {
    const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300!';

    const lettersAndWhiteSpace = extractLetters(input, {
      letters: true,
      whiteSpace: true,
    });
    expect(lettersAndWhiteSpace).toBe('Hello 世界 안녕하세요  こんにちは     ');

    const lettersAndNumbers = extractLetters(input, {
      letters: true,
      numbers: true,
    });
    expect(lettersAndNumbers).toBe('Hello世界안녕하세요123こんにちは100200300');

    const numbersAndSpecialCharacters = extractLetters(input, {
      numbers: true,
      specialCharacters: true,
    });
    expect(numbersAndSpecialCharacters).toBe(',!123$100+200=300!');
  });

  it('should return a string that reflects the options setting (another input)', () => {
    const input =
      'Добрый * день, &^ мир! Olá, mundo! Ciao, mondo! 54321 - 러시아, 브라질, 이탈리아 언어가 섞인 문장입니다.';

    const lettersAndWhiteSpace = extractLetters(input, {
      letters: true,
      whiteSpace: true,
    });
    expect(lettersAndWhiteSpace).toBe(
      'Добрый  день  мир Olá mundo Ciao mondo   러시아 브라질 이탈리아 언어가 섞인 문장입니다'
    );

    const lettersAndNumbers = extractLetters(input, {
      letters: true,
      numbers: true,
    });
    expect(lettersAndNumbers).toBe(
      'ДобрыйденьмирOlámundoCiaomondo54321러시아브라질이탈리아언어가섞인문장입니다'
    );

    const numbersAndSpecialCharacters = extractLetters(input, {
      numbers: true,
      specialCharacters: true,
    });
    expect(numbersAndSpecialCharacters).toBe('*,&^!,!,!54321-,,.');
  });
});
