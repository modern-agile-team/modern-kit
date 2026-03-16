import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from '@site/src/pages/index.module.css';

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
          A library providing useful React components, custom hooks, utility
          functions, and types for client-side development.
        </p>
        <p className={styles.mainContentSubtitle}>
          Offering a wide range of code references and aiming for a modern
          development experience.
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
              3 core packages for client-side development
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
                A library providing useful React components and custom hooks.
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
                A library providing useful utility functions for client-side
                development.
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
                A library providing useful TypeScript utility types.
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
            <p className={styles.sectionDescription}>
              Get started in 3 simple steps
            </p>
          </div>

          <div className={styles.quickStartSteps}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Install</h3>
                <p className={styles.stepDescription}>
                  Install the package you need
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
                  Import the functions or hooks you need
                </p>
                <pre className={styles.stepCodeBlock}>
                  <code>{`import { useToggle } from '@modern-kit/react';
import { debounce } from '@modern-kit/utils';
`}</code>
                </pre>

                <br />

                <div className={styles.subpathSubtitle}>
                  <p className={styles.stepDescription}>
                    📂 SubPath Import is also supported
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
                  Use it right away with a simple API
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
              Reduce unused code and import only what you need to minimize
              bundle size
            </p>
          </div>

          <div className={styles.comparisonContainer}>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                <span className={styles.comparisonLabel}>Full Import</span>
                <span className={styles.comparisonSize}>📦 Larger Bundle</span>
              </div>
              <pre className={styles.codeBlock}>
                <code>{`// Import from the full package
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
                <code>{`// Import only the modules you need
import { useToggle } from '@modern-kit/react/hooks/useToggle';
import { debounce } from '@modern-kit/utils/common/debounce';`}</code>
              </pre>
            </div>
          </div>

          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>⚡</div>
              <div className={styles.benefitContent}>
                <h4>Improved Dev Server Performance</h4>
                <p>
                  By importing only the modules you need, unnecessary code is
                  avoided and the bundler's module identification process is
                  optimized.
                </p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🌳</div>
              <div className={styles.benefitContent}>
                <h4>Effective Tree-shaking</h4>
                <p>
                  The bundler can better identify individual modules, making
                  tree-shaking more effective and helping reduce the final
                  bundle size.
                </p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🔧</div>
              <div className={styles.benefitContent}>
                <h4>Version Compatibility</h4>
                <p>
                  Select only the modules you need without version constraints
                  — for example, use features in a React v17 environment
                  without importing v18-specific hooks.
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
              @modern-kit is actively maintained and welcomes
              <br />
              all contributions from the community.
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
