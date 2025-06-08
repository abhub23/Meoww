'use client';

import { useCatname } from '@/store/store';
import React, { JSX, useEffect, useState } from 'react';
import { RainbowButton } from './magicui/rainbow-button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { ToggleTheme } from './ToggleTheme';
import { motion } from 'motion/react';
import { Separator } from './ui/separator';

type InitialUrlType = {
    initialURL: string;
};

const Hero: React.FC<InitialUrlType> = ({ initialURL }): JSX.Element => {
    const { catName, setCatName } = useCatname();
    const [catImgURL, setCatImgURL] = useState(initialURL);

    const router = useRouter();


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


    const handleVoice = () => {
        router.push(`/voice?breed=${catName}`);
    };

    useEffect(() => {
        const getURL = async () => {
            try {
                const response = await axios.get('http://localhost:8090/getimage');
                if (catImgURL != response.data.caturl) {
                    setCatImgURL(response.data.caturl);
                }
            } catch (error) {
                console.error('Error occured on client', error);
            }
        };
        getURL();
    }, []);

    return (
        <>
            <div className="flex h-[100svh] items-center justify-center overflow-hidden bg-white text-black lg:h-screen lg:flex-row flex-col lg:gap-40 dark:bg-black dark:text-white">
                <div className="fixed top-[20px] right-[20px] lg:right-[30px]">
                    <ToggleTheme />
                </div>
                <div className='lg:mt-[0px] mt-[-100px]'>
                    <p className="p-2 text-center font-medium lg:text-[30px] text-[28px]">Cat of the Day</p>
                    {catImgURL && (
                        <Image
                            alt=""
                            src={catImgURL}
                            width={360}
                            height={300}
                            className="rounded-[4px]"
                            priority={true}
                        />
                    )}
                </div>
                <div className="lg:h-[500px] font-black">
                    <Separator orientation={width !== null && width > 1460 ? 'vertical' : 'horizontal'} />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                >
                    <label htmlFor="cats" className="p-4 text-[28px] font-medium lg:text-[30px]">
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
                        onClick={handleVoice}
                    >
                        Talk to Cat
                    </RainbowButton>
                </motion.div>
            </div>
        </>
    );
};

export default Hero;
