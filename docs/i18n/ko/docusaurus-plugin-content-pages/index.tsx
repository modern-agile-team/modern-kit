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
          @devgrace는 유용한 리액트 UI 컴포넌트, 리액트 커스텀 훅 및 다양한
          유틸리티 함수를 제공하는 라이브러리 입니다.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduce">
            Getting Started
          </Link>
          <a
            className="button button--secondary button--lg"
            href="https://github.com/Team-Grace/devgrace"
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
        <meta property="og:title" content="@devgrace" />
        <meta
          property="og:description"
          content="@devgrace is an open source library that provides useful React UI Components, React Custom Hooks, and various Utility Functions"
        />
        <meta
          property="og:url"
          content="https://team-grace.github.io/devgrace/"
        />
        <meta
          property="og:image"
          content="https://github.com/Team-Grace/devgrace/assets/64779472/dcf0fed7-0411-45b4-adbf-363bdf38a5d2"
        />
      </Head>

      <main>
        <div className={styles.mainContentWrapper}>
          <h2 className={styles.mainContentHead}>
            @devgrace/react
            <a
              href="https://www.npmjs.com/package/@devgrace/react"
              target="_blank">
              <img src="https://img.shields.io/npm/v/@devgrace/react.svg" />
            </a>{' '}
            <a
              href="https://bundlephobia.com/package/@devgrace/react"
              target="_blank">
              <img src="https://img.shields.io/bundlephobia/minzip/@devgrace/react/latest" />
            </a>
          </h2>
          <p className={styles.mainContentParagraph}>
            React와 관련된 유용한 컴포넌트와 커스텀 훅을 제공하는
            라이브러리입니다.
          </p>
          <h2 className={styles.mainContentHead}>
            @devgrace/utils
            <a
              href="https://www.npmjs.com/package/@devgrace/utils"
              target="_blank">
              <img src="https://img.shields.io/npm/v/@devgrace/utils.svg" />
            </a>{' '}
            <a
              href="https://bundlephobia.com/package/@devgrace/utils"
              target="_blank">
              <img src="https://img.shields.io/bundlephobia/minzip/@devgrace/utils/latest" />
            </a>
          </h2>

          <p className={styles.mainContentParagraph}>
            클라이언트 개발과 관련된 유용한 유틸리티 함수를 제공하는
            라이브러리입니다.
          </p>
          <h2 className={styles.mainContentHead}>
            @devgrace/ui
            <a
              href="https://www.npmjs.com/package/@devgrace/ui"
              target="_blank">
              <img src="https://img.shields.io/npm/v/@devgrace/ui.svg" />
            </a>{' '}
            <a
              href="https://bundlephobia.com/package/@devgrace/ui"
              target="_blank">
              <img src="https://img.shields.io/bundlephobia/minzip/@devgrace/ui/latest" />
            </a>
          </h2>

          <p className={styles.mainContentParagraph}>
            React UI 컴포넌트를 제공하는 라이브러리입니다. (예: Button, Select,
            Checkbox)
          </p>
        </div>
      </main>
      <div className={styles.contributors}>
        <h2>Thank you to all contributors! 💗</h2>
        <p>
          @devgrace는 지속적으로 유지 관리되며, 여러분들의 모든 기여를
          환영합니다.
        </p>
        <div>
          <img src="https://contrib.rocks/image?repo=Team-Grace/devgrace" />
        </div>
      </div>
    </Layout>
  );
}
