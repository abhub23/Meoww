import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { SafeRender } from '@/components/ToggleTheme';

export default async function Home() {

  return (
    <div>
      <SafeRender>
        <Hero />
        <Footer />
      </SafeRender>

    </div>
  );
}

/*
Is used only for the initial page load.

It runs on the server, before sending the HTML to the browser.
It gives your React component (Hero) the image URL before rendering, so there's no loader flash.

its only and only for initial render not updated render 

This page is Server not a client
*/
