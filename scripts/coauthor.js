// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
const GITHUB_USERS_API_URL = `https://api.github.com/users`;

const getGithubUserInfo = async (userName) => {
  const res = await fetch(`${GITHUB_USERS_API_URL}/${userName}`);
  const userInfo = await res.json();

  return [userName, userInfo];
};

const generateCoAuthorMessage = (userName, userInfo) => {
  return `Co-authored-by: ${userInfo?.name ?? userName} <${
    userInfo.id
  }+${userName}@users.noreply.github.com>`;
};

/**
 * @description 공동 작업자(co-author)를 추가하기 위해 쉽게 co-author 메시지를 생성하는 함수입니다.
 * Github Api를 활용해 "no-reply" 형태의 이메일을 수집 후, 수집한 이메일을 기반으로 co-author 메시지를 생성합니다.
 *
 * 공동 작업자(co-author) 추가 방법
 * - https://docs.github.com/ko/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors
 *
 * 실행 방법(터미널)
 * - yarn coauthor {userName} {userName} {userName} ...
 * - ex) yarn coauthor ssi02014 Sangminnn
 */
const coauthors = async (args) => {
  const userInfoList = await Promise.all(
    args.map((userName) => getGithubUserInfo(userName))
  );

  const messages = userInfoList.map(([userName, userInfo]) =>
    generateCoAuthorMessage(userName, userInfo)
  );

  console.log(messages.join('\n'));
};

coauthors(process.argv.slice(2));
