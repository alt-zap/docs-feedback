import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/pages/PageDetails.module.css';

function PageDetails() {
  const { query } = useRouter();

  return (
    <div className={styles.container}>
      <p>
        Detalhes da página com id&nbsp;
        <i><b>{query.pageId}</b></i>
      </p>

      <br />

      <p>
        (em desenvolvimento...)
      </p>
    </div>
  );
}

export default PageDetails;
