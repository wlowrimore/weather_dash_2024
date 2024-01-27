// src/app/page.js

import CityStateCountryForm from "./components/forms/CityStateCountryForm";
export default async function Home() {
  return (
    <main className='w-screen h-screen flex flex-col items-center mx-auto'>
      <div className='w-full h-full mx-12'>
        <h1 className='flex flex-col items-center text-emerald-800 text-4xl font-semibold px-4'>Weather Dashboard</h1>
        <CityStateCountryForm />
      </div>
    </main>
  );
}
