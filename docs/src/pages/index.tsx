import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.banner}>
      <div className={styles.bannerContainer}>
        <h1
          className="hero__title"
          style={{ fontSize: '3.5rem', color: '#2e8555' }}>
          {siteConfig.title}
        </h1>
        <p className={styles.mainContentTitle}>
          @modern-kit는 클라이언트 개발에 유용한 리액트 커스텀 훅 및 유틸리티
          함수를 제공하는 라이브러리 입니다.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduce">
            Getting Started
          </Link>
          <a
            className="button button--secondary button--lg"
            href="https://github.com/modern-agile-team/modern-kit"
            target="_blank">
            Github
          </a>
        </div>
      </div>
    </header>
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
        <div className={styles.mainContentWrapper}>
          <h2 className={styles.mainContentHead}>
            @modern-kit/react
            <a
              href="https://www.npmjs.com/package/@modern-kit/react"
              target="_blank">
              <img src="https://img.shields.io/npm/v/@modern-kit/react.svg" />
            </a>
            <a
              href="https://bundlephobia.com/package/@modern-kit/react"
              target="_blank">
              <img src="https://img.shields.io/bundlephobia/minzip/@modern-kit/react/latest" />
            </a>
          </h2>
          <p className={styles.mainContentParagraph}>
            React와 관련된 유용한 컴포넌트와 커스텀 훅을 제공하는
            라이브러리입니다.
          </p>
          <h2 className={styles.mainContentHead}>
            @modern-kit/utils
            <a
              href="https://www.npmjs.com/package/@modern-kit/utils"
              target="_blank">
              <img src="https://img.shields.io/npm/v/@modern-kit/utils.svg" />
            </a>
            <a
              href="https://bundlephobia.com/package/@modern-kit/utils"
              target="_blank">
              <img src="https://img.shields.io/bundlephobia/minzip/@modern-kit/utils/latest" />
            </a>
          </h2>
          <p className={styles.mainContentParagraph}>
            클라이언트 개발과 관련된 유용한 유틸리티 함수를 제공하는
            라이브러리입니다.
          </p>
          <h2 className={styles.mainContentHead}>
            @modern-kit/types
            <a
              href="https://www.npmjs.com/package/@modern-kit/types"
              target="_blank">
              <img src="https://img.shields.io/npm/v/@modern-kit/types.svg" />
            </a>
            <a
              href="https://bundlephobia.com/package/@modern-kit/types"
              target="_blank">
              <img src="https://img.shields.io/bundlephobia/minzip/@modern-kit/types/latest" />
            </a>
          </h2>
          <p className={styles.mainContentParagraph}>
            유용한 타입스크립트 유틸 타입들을 제공합니다.
          </p>
        </div>
      </main>
      <div className={styles.contributors}>
        <h2>Thank you to all contributors! 💗</h2>
        <p>
          @modern-kit는 지속적으로 유지 관리되며, 여러분들의 모든 기여를
          환영합니다.
        </p>
        <div>
          <img src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit" />
        </div>
      </div>
    </Layout>
  );
}
