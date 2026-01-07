import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.banner}>
      <div className={styles.bannerContainer}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.logoTitle}>{siteConfig.title}</h1>
          <div className={styles.logoSubtitle}>
            Modern Toolkit for Client Development
          </div>
        </div>
        <p className={styles.mainContentTitle}>
          클라이언트 개발에 유용한 리액트 컴포넌트, 커스텀 훅 및 유틸리티 함수,
          타입을 제공하는 라이브러리입니다.
        </p>
        <p className={styles.mainContentSubtitle}>
          코드적으로 다양한 레퍼런스를 제공하고, 모던한 개발 경험을 지향합니다.
        </p>
        <div className={styles.buttons}>
          <Link
            className={`button button--primary button--lg ${styles.primaryButton}`}
            to="/docs/introduce">
            Getting Started →
          </Link>
          <a
            className={`button button--secondary button--lg ${styles.secondaryButton}`}
            href="https://github.com/modern-agile-team/modern-kit"
            target="_blank"
            rel="noreferrer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ marginRight: '8px' }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            View on GitHub
          </a>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Packages</div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Type Safe</div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <div className={styles.statNumber}>CJS · ESM</div>
            <div className={styles.statLabel}>Dual Format Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Provides React UI Components, React Custom Hooks, and Utility functions.">
      <HomepageHeader />

      <Head>
        <meta property="og:title" content="@modern-kit" />
        <meta
          property="og:description"
          content="@modern-kit is an open source library that provides useful React UI Components, React Custom Hooks, and various Utility Functions"
        />
        <meta
          property="og:url"
          content="https://modern-agile-team.github.io/modern-kit"
        />
        <meta
          property="og:image"
          content="https://github.com/modern-agile-team/modern-kit/assets/64779472/70cbcee5-8a1b-407b-8917-00d259d225ee"
        />
      </Head>

      <main>
        <div className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Packages</h2>
            <p className={styles.sectionDescription}>
              클라이언트 개발을 위한 3가지 핵심 패키지를 제공합니다
            </p>
          </div>

          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>@modern-kit/react</h3>
                <a
                  className={styles.npmBadge}
                  href="https://www.npmjs.com/package/@modern-kit/react"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    src="https://img.shields.io/npm/v/@modern-kit/react.svg"
                    alt="npm version"
                  />
                </a>
              </div>
              <p className={styles.cardDescription}>
                React와 관련된 유용한 컴포넌트와 커스텀 훅을 제공하는
                라이브러리입니다.
              </p>
              <div className={styles.cardFeatures}>
                <div className={styles.cardFeature}>✓ 60+ Custom Hooks</div>
                <div className={styles.cardFeature}>✓ Reusable Components</div>
                <div className={styles.cardFeature}>✓ SSR Compatible</div>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>@modern-kit/utils</h3>
                <a
                  className={styles.npmBadge}
                  href="https://www.npmjs.com/package/@modern-kit/utils"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    src="https://img.shields.io/npm/v/@modern-kit/utils.svg"
                    alt="npm version"
                  />
                </a>
              </div>
              <p className={styles.cardDescription}>
                클라이언트 개발과 관련된 유용한 유틸리티 함수를 제공하는
                라이브러리입니다.
              </p>
              <div className={styles.cardFeatures}>
                <div className={styles.cardFeature}>✓ Tree-shakable</div>
                <div className={styles.cardFeature}>✓ 100% Type Safe</div>
                <div className={styles.cardFeature}>✓ Zero Dependencies</div>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>@modern-kit/types</h3>
                <a
                  className={styles.npmBadge}
                  href="https://www.npmjs.com/package/@modern-kit/types"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    src="https://img.shields.io/npm/v/@modern-kit/types.svg"
                    alt="npm version"
                  />
                </a>
              </div>
              <p className={styles.cardDescription}>
                유용한 유틸리티 타입들을 제공하는 라이브러리입니다.
              </p>
              <div className={styles.cardFeatures}>
                <div className={styles.cardFeature}>✓ Advanced Types</div>
                <div className={styles.cardFeature}>✓ Type Utilities</div>
                <div className={styles.cardFeature}>✓ Better DX</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.codeSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quick Start</h2>
            <p className={styles.sectionDescription}>3단계로 바로 시작하세요</p>
          </div>

          <div className={styles.quickStartSteps}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Install</h3>
                <p className={styles.stepDescription}>
                  원하는 패키지를 설치하세요
                </p>
                <div className={styles.installTabs}>
                  <div className={styles.installTab}>
                    <div className={styles.installTabLabel}>yarn</div>
                    <pre className={styles.stepCodeBlock}>
                      <code>{`yarn add @modern-kit/react
yarn add @modern-kit/utils
yarn add -D @modern-kit/types`}</code>
                    </pre>
                  </div>
                  <div className={styles.installTab}>
                    <div className={styles.installTabLabel}>npm</div>
                    <pre className={styles.stepCodeBlock}>
                      <code>{`npm install @modern-kit/react
npm install @modern-kit/utils
npm install -D @modern-kit/types`}</code>
                    </pre>
                  </div>
                  <div className={styles.installTab}>
                    <div className={styles.installTabLabel}>pnpm</div>
                    <pre className={styles.stepCodeBlock}>
                      <code>{`pnpm add @modern-kit/react
pnpm add @modern-kit/utils
pnpm add -D @modern-kit/types`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Import</h3>
                <p className={styles.stepDescription}>
                  필요한 함수나 훅을 불러오세요
                </p>
                <pre className={styles.stepCodeBlock}>
                  <code>{`import { useToggle } from '@modern-kit/react';
import { debounce } from '@modern-kit/utils';
`}</code>
                </pre>

                <br />

                <div className={styles.subpathSubtitle}>
                  <p className={styles.stepDescription}>
                    📂 SubPath Import도 지원합니다
                  </p>
                </div>
                <pre className={styles.stepCodeBlock}>
                  <code>{`import { useToggle } from '@modern-kit/react/useToggle';
import { debounce } from '@modern-kit/utils/common/debounce';`}</code>
                </pre>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Use</h3>
                <p className={styles.stepDescription}>
                  간단한 API로 바로 사용하세요
                </p>
                <pre className={styles.stepCodeBlock}>
                  <code>{`function App() {
  const [isOpen, toggle] = useToggle();
  
  const handleSearch = debounce((value) => {
    console.log('Search:', value);
  }, 300);
  
  return <div>...</div>;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subpathSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>SubPath Imports</h2>
            <p className={styles.sectionDescription}>
              사용하지 않는 코드를 줄이고, 꼭 필요한 기능만 불러와 패키지 용량을
              줄이세요
            </p>
          </div>

          <div className={styles.comparisonContainer}>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                <span className={styles.comparisonLabel}>Full Import</span>
                <span className={styles.comparisonSize}>📦 Larger Bundle</span>
              </div>
              <pre className={styles.codeBlock}>
                <code>{`// 전체 패키지에서 import
import { useToggle, useDebounce } from '@modern-kit/react';
import { debounce, throttle } from '@modern-kit/utils';`}</code>
              </pre>
            </div>

            <div className={styles.comparisonDivider}>
              <div className={styles.vsText}>VS</div>
            </div>

            <div className={`${styles.comparisonCard}`}>
              <div className={styles.comparisonHeader}>
                <span className={styles.comparisonLabel}>SubPath Import</span>
                <span className={styles.comparisonSize}>📦 Smaller Bundle</span>
              </div>
              <pre className={styles.codeBlock}>
                <code>{`// 필요한 모듈만 개별 import
import { useToggle } from '@modern-kit/react/hooks/useToggle';
import { debounce } from '@modern-kit/utils/common/debounce';`}</code>
              </pre>
            </div>
          </div>

          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>⚡</div>
              <div className={styles.benefitContent}>
                <h4>개발 서버 성능 향상</h4>
                <p>
                  필요한 모듈만 불러오기 때문에 불필요한 코드를 방지하고,
                  번들러가 모듈을 읽고 식별하는 과정을 최적화할 수 있습니다
                </p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🌳</div>
              <div className={styles.benefitContent}>
                <h4>효과적인 Tree-shaking</h4>
                <p>
                  번들러가 개별 모듈을 더 잘 식별할 수 있어 Tree-shaking이 더욱
                  효과적으로 동작하며, 최종 번들 크기를 줄이는데 도움이 됩니다
                </p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🔧</div>
              <div className={styles.benefitContent}>
                <h4>버전 호환성 해결</h4>
                <p>
                  React v17 환경에서 v18 전용 훅을 사용하지 않고도 다른 기능을
                  사용할 수 있는 등, 버전 제약 없이 필요한 모듈만 선택
                  가능합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className={styles.contributors}>
        <div className={styles.contributorsContent}>
          <div className={styles.contributorsHeader}>
            <h2 className={styles.contributorsTitle}>
              Thank you to all contributors! 💗
            </h2>
            <p className={styles.contributorsDescription}>
              @modern-kit는 지속적으로 유지 관리되며,
              <br />
              여러분들의 모든 기여를 환영합니다
            </p>
          </div>

          <div className={styles.contributorsImageWrapper}>
            <a
              href="https://github.com/modern-agile-team/modern-kit/graphs/contributors"
              target="_blank"
              rel="noreferrer"
              className={styles.contributorsImageLink}>
              <img
                src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit"
                alt="Contributors"
                className={styles.contributorsImage}
              />
            </a>
          </div>

          <div className={styles.contributorsActions}>
            <a
              href="https://github.com/modern-agile-team/modern-kit/blob/main/.github/CONTRIBUTING.md"
              target="_blank"
              rel="noreferrer"
              className={styles.contributorsButton}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{ marginRight: '8px' }}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              Contributing Guide
            </a>
            <a
              href="https://github.com/modern-agile-team/modern-kit"
              target="_blank"
              rel="noreferrer"
              className={`${styles.contributorsButton} ${styles.contributorsButtonSecondary}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: '8px' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
