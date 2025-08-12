'use client';

import { useSearchParams } from 'next/navigation';
import { useCat } from '@/store/store';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { AudioPlayerCard } from '@/components/player/AudioPlayerCard';
import { Bricolage } from '@/utils/fonts';

const Voice: React.FC = () => {
  const searchParams = useSearchParams();
  const Breed = searchParams.get('breed');
  const { cat, setCat } = useCat();
  const { theme } = useTheme();

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
    <div className={`relative w-full bg-neutral-50 lg:min-h-screen dark:bg-neutral-900`}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: ` ${
            theme === 'dark'
              ? `radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000`
              : `radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.65), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.70), transparent 60%)`
          }
        `,
        }}
      />
      <AudioPlayerCard
        src={Object.values(cat?.voice ?? {})}
        title={Object.keys(cat?.voice ?? {})}
      />
    </div>
  );
};
export default Voice;
