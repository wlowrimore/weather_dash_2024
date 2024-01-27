// src/app/page.js

import CityStateCountryForm from "./components/forms/CityStateCountryForm";
export default async function Home() {
  return (
    <main className='w-screen flex flex-col items-center mx-auto'>
      <div className='w-full h-full px-4 my-12'>
        <h1 className='flex flex-col items-start text-emerald-800 text-[2.3rem] font-semibold'>Weather Now</h1>
        <h2 className='text-xl tracking-wide leading-tight mb-4'>Enter a city, state/province, and country to find the current weather conditions and 5-day forecast.</h2>
        <CityStateCountryForm />
      </div>
    </main>
  );
}
