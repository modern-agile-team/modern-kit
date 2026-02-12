export async function getBlobFromUrl(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`리소스 요청에 실패했습니다. 상태 코드: ${response.status}`, {
        cause: response,
      });
    }

    return await response.blob();
  } catch (err: any) {
    throw new Error(`URL에서 Blob 데이터를 가져오는 데 실패했습니다.`, {
      cause: err,
    });
  }
}
