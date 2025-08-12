'use client';

import { useCatname } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { RainbowButton } from './magicui/rainbow-button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { ToggleTheme } from './ToggleTheme';
import { motion } from 'motion/react';
import { Separator } from './ui/separator';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';

const Hero = () => {
  const { catName, setCatName } = useCatname();
  const { theme } = useTheme();

  const router = useRouter();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['catquery'],
    queryFn: async () => {
      const res = await axios.get('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CATAPI,
        },
      });
      return res.data;
    },
  });

  function useWindowWidth() {
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize(); // Set initial value

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
  }

  const width = useWindowWidth();

  const handleVoicePage = () => {
    const trimmedName = catName.split(' ').join('');
    router.push(`/voice?breed=${trimmedName}`);
  };

  return (
    <>
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
            }`,
          }}
        />
        <div className="relative flex h-[100svh] flex-col items-center justify-center overflow-hidden text-black lg:h-screen lg:flex-row lg:gap-40 dark:text-white">
          <div className="fixed top-[20px] right-[20px] lg:right-[30px]">
            <ToggleTheme />
          </div>
          <div className="mt-[-100px] lg:mt-[0px]">
            <p className="p-2 text-center text-[22px] font-medium lg:text-[30px]">
              Random Cat&apos;s
            </p>
            {!isLoading && isSuccess && (
              <Image
                alt=""
                src={data[0].url}
                width={360}
                height={300}
                className="rounded-[4px]"
                priority={true}
                unoptimized={true}
              />
            )}
          </div>
          <div className="font-black lg:h-[500px]">
            <Separator orientation={width !== null && width > 1460 ? 'vertical' : 'horizontal'} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center"
          >
            <label htmlFor="cats" className="p-4 text-[22px] font-medium lg:text-[30px]">
              Choose your Breed
            </label>
            <select
              id="cat breeds"
              name="cat_breeds"
              defaultValue="Persian"
              className="cursor-pointer overflow-hidden rounded-[6px] border-black p-[12px] text-[18px] ring-1 dark:border-white dark:bg-black"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCatName(e.target.value)}
            >
              <option value="Indian Domestic Shorthair">Indian Domestic Shorthair</option>
              <option value="Persian">Persian</option>
              <option value="Siamese">Siamese</option>
              <option value="Bengal">Bengal</option>
              <option value="Birman">Birman</option>
              <option value="Maine Coon">Maine Coon</option>
              <option value="British Shorthair">British Shorthair</option>
              <option value="Exotic Shorthair">Exotic Shorthair</option>
              <option value="Scottish Fold">Scottish Fold</option>
              <option value="Oriental Shorthair">Oriental Shorthair</option>
            </select>

            <RainbowButton
              variant={'default'}
              className="mt-[18px] h-[40px] w-[263px] text-[17px] lg:mt-[16px]"
              onClick={handleVoicePage}
            >
              Talk to Cat
            </RainbowButton>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
