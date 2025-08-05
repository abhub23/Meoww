import {
  Bricolage_Grotesque,
  Montserrat,
  Host_Grotesk,
  DM_Sans,
  Bangers,
  Press_Start_2P,
  Eater,
  Irish_Grover,
  Nosifer,
  Kalnia_Glaze,
  Rubik_Gemstones,
} from 'next/font/google';

const Bricolage_font = Bricolage_Grotesque({ subsets: ['latin'] });
const Montserrat_font = Montserrat({ subsets: ['latin'] });
const Host_Grotesk_font = Host_Grotesk({ subsets: ['latin'] });
const DM_Sans_font = DM_Sans({ subsets: ['latin'] });
const Kalnia_Glaze_font = Kalnia_Glaze({ subsets: ['latin'] });
const Rubik_Gemstones_font = Rubik_Gemstones({ subsets: ['latin'], weight: '400' });
const Press_Start_2P_font = Press_Start_2P({ subsets: ['latin'], weight: '400' });
const Bangers_font = Bangers({ subsets: ['latin'], weight: '400' });
const Eater_font = Eater({ subsets: ['latin'], weight: '400' });
const Irish_Grover_font = Irish_Grover({ subsets: ['latin'], weight: '400' });
const Nosifer_font = Nosifer({ subsets: ['latin'], weight: '400' });

export const Bricolage = Bricolage_font.className;
export const Montserratfont = Montserrat_font.className;
export const HostGrotesk = Host_Grotesk_font.className;
export const DMSans = DM_Sans_font.className;
export const KalniaGlaze = Kalnia_Glaze_font.className;
export const RubikGemstones = Rubik_Gemstones_font.className;
export const PressStart2P = Press_Start_2P_font.className;
export const Bangersfont = Bangers_font.className;
export const Eaterfont = Eater_font.className;
export const IrishGrover = Irish_Grover_font.className;
export const Nosiferfont = Nosifer_font.className;
