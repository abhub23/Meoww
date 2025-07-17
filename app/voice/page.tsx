'use client';

import { useSearchParams } from 'next/navigation';
import { useCat } from '@/store/store';
import { useEffect } from 'react';

const Voice: React.FC = () => {
  const searchParams = useSearchParams();
  const Breed = searchParams.get('breed');
  const { cat, setCat } = useCat()

  useEffect(() => {
    if (!Breed) {
      return
    }

    try {
      (async () => {
        const catData = await import(`@/components/catData`)
        const selected = catData[Breed as keyof typeof catData];

        setCat(selected);
      })()
    } catch (err) {
      console.log('Error occured ', err)
    }

  }, [Breed])


  return <div>
    hi {Breed}
    <div>
      {Object.values(cat?.voice ?? {}).map((ele, idx) => (
        <li key={idx}>{ele}</li>
      ))}
    </div>
  </div>;
};

export default Voice;
