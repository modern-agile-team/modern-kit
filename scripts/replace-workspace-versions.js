const fs = require('fs');
const path = require('path');

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * @description 주어진 데이터를 JSON 형식으로 파일에 작성합니다.
 * @param {string} filePath - 작성할 파일 경로
 * @param {Object} data - 작성할 데이터 객체
 */
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

/**
 * @description 워크스페이스 내의 모든 패키지 정보를 수집합니다.
 * @param {string} rootDir - 프로젝트 루트 디렉토리 경로
 * @param {string[]} workspaces - 워크스페이스 패턴 배열
 * @returns {Object} 패키지 이름을 키로 하고 버전과 경로 정보를 값으로 가지는 객체
 *
 * @example
 * {
 *  '@modern-kit/docs': {
 *    version: '0.0.14',
 *    pkgPath: '...path/modern-kit/docs/package.json'
 *  },
 *  '@modern-kit/react': {
 *  version: '2.2.3',
 *  pkgPath: '...path/modern-kit/packages/react/package.json'
 *  },
 *  // ...
 * }
 */
function getWorkspacePackages(rootDir, workspaces) {
  const packages = {};
  workspaces.forEach((pattern) => {
    if (pattern.endsWith('/*')) {
      const dir = pattern.slice(0, -2);
      const absDir = path.join(rootDir, dir);
      if (fs.existsSync(absDir)) {
        fs.readdirSync(absDir, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .forEach((dirent) => {
            const pkgPath = path.join(absDir, dirent.name, 'package.json');
            if (fs.existsSync(pkgPath)) {
              const pkg = readJSON(pkgPath);
              packages[pkg.name] = { version: pkg.version, pkgPath };
            }
          });
      }
    } else {
      // 단일 디렉토리 지정 시
      const absDir = path.join(rootDir, pattern);
      const pkgPath = path.join(absDir, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = readJSON(pkgPath);
        packages[pkg.name] = { version: pkg.version, pkgPath };
      }
    }
  });

  return packages;
}

/**
 * @description package.json의 의존성에서 `workspace:` 접두사를 실제 버전으로 교체합니다.
 * @param {Object} pkg - package.json 객체
 * @param {Object} workspacePackages - 워크스페이스 패키지 정보 객체
 */
function replaceWorkspaceVersions(pkg, workspacePackages) {
  ['dependencies', 'devDependencies'].forEach((depType) => {
    if (!pkg[depType]) return;
    Object.keys(pkg[depType]).forEach((depName) => {
      const val = pkg[depType][depName];
      if (
        typeof val === 'string' &&
        val.startsWith('workspace:') &&
        workspacePackages[depName]
      ) {
        pkg[depType][depName] = workspacePackages[depName].version;
      }
    });
  });
}

/**
 * @description 메인 실행 함수입니다.
 */
function main() {
  const rootDir = process.cwd();
  const rootPkg = readJSON(path.join(rootDir, 'package.json'));
  const workspaces = rootPkg.workspaces || rootPkg.workspaces?.packages;
  if (!workspaces) {
    console.error('No workspaces found in root package.json');
    process.exit(1);
  }

  const workspacePackages = getWorkspacePackages(rootDir, workspaces);

  Object.values(workspacePackages).forEach(({ pkgPath }) => {
    const pkg = readJSON(pkgPath);
    replaceWorkspaceVersions(pkg, workspacePackages);
    writeJSON(pkgPath, pkg);
    console.log(`Updated: ${pkgPath}`);
  });
}

main();
