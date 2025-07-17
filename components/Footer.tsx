import Link from 'next/link';

const Footer = () => {
  return (
    <div className="fixed bottom-3 left-1/2 w-full -translate-x-1/2 transform text-center text-[12px] text-black/60 lg:text-[16px] dark:text-white/60">
      Designed and Developed by
      <Link
        className="ml-1 font-medium text-black dark:text-white"
        href="https://x.com/abdullah_twt23"
        target="_black"
      >
        Abdullah
      </Link>
    </div>
  );
};

export default Footer;
