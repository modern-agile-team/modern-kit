import { describe, it, expect } from 'vitest';
import { StorageManager } from '.';

// 서버 환경(window 없음) 케이스입니다.
// 구현이 `typeof window` 를 직접 확인하고 나머지 테스트는 DOM 환경이 필요하므로, window 를 조작하지 않고 node 환경에서 실행되도록 파일을 분리합니다.
describe('StorageManager (server)', () => {
  it('서버 환경에서는 에러를 발생시켜야 합니다.', () => {
    const storage = new StorageManager<{ name: string }>('localStorage');

    expect(() => {
      storage.setItem('name', 'John');
    }).toThrow('Storage를 지원하는 환경이 아닙니다');
  });

  it('서버 환경에서 throwOnError가 false이면 에러를 발생시키지 않고 null을 반환해야 합니다.', () => {
    const storage = new StorageManager<{ name: string }>('localStorage', {
      throwOnError: false,
    });

    expect(storage.getItem('name')).toBeNull();
  });
});
