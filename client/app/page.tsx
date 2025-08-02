import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import axios from 'axios';

export default async function Home() {
  const res = await axios.get('http://192.168.0.103:8090/getimage');
  const data: string = await res.data.caturl;
  return (
    <>
      <Hero initialURL={data} />
      <Footer />
    </>
  );
}

/*
Is used only for the initial page load.

It runs on the server, before sending the HTML to the browser.
It gives your React component (Hero) the image URL before rendering, so there's no loader flash.

its only and only for initial render not updated render 

This page is Server not a client
*/
