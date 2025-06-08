'use client';

import { useSearchParams } from 'next/navigation';

const Voice: React.FC = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('breed');
  return <div>hi {search}</div>;
};

export default Voice;
