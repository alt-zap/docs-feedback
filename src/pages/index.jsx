import React from 'react';

import { Layout, Section, GridList } from '@components/common';
import { PageCard } from '@components/overview';
import { requestDocsPages } from '@services';

import styles from '@styles/pages/Overview.module.css';

function Overview({ docsPages }) {
  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.title}>Alt Docs</h1>
        <div className={styles.separator} />
        <h2 className={styles.subtitle}>Feedback</h2>
      </header>

      <main>
        <Section title="Páginas de documentação">
          <GridList>
            {docsPages.map((page) => (
              <PageCard
                key={page.id}
                pageId={page.id}
                title={page.title}
                statusColor={page.statusColor}
                pendingReviews={page.pendingReviews}
              />
            ))}
          </GridList>
        </Section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const docsPages = await requestDocsPages();

  return { props: { docsPages } };
}

export default Overview;
