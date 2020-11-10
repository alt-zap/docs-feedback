import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function useRouterQuery() {
  const router = useRouter();

  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(router.query);
  }, [router.query]);

  return query;
}

export default useRouterQuery;
