'use client';

import { useSearchParams } from 'next/navigation';
import { useCat } from '@/store/store';
import { useEffect } from 'react';
import AudioPlayer from '@/components/player/AudioPlayer';

const Voice: React.FC = () => {
  const searchParams = useSearchParams();
  const Breed = searchParams.get('breed');
  const { cat, setCat } = useCat();

  useEffect(() => {
    if (!Breed) {
      return;
    }

    try {
      (async () => {
        const catData = await import(`@/components/catData`);
        const selected = catData[Breed as keyof typeof catData];

        setCat(selected);
      })();
    } catch (err) {
      console.log('Error occured ', err);
    }
  }, [Breed]);

  return (
    <div className=''>
      <div className='grid gap-y-12 mt-12 lg:grid-cols-3 '>
        {Object.values(cat?.voice ?? {}).map((ele, idx) => (
      <AudioPlayer key={idx} src={ele as string}  title={Object.keys(cat?.voice ?? {})[idx]}/>
    ))}
      </div>
    </div>
  );
};

export default Voice;
