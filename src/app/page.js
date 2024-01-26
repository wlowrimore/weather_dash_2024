// src/app/page.js

import CityStateCountryForm from "./components/forms/CityStateCountryForm";
import getCityLatLong from "./libs/getCityLatLon";
export default async function Home() {
  const cityLatLong = await getCityLatLong();
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center mx-auto'>
      <div className='w-full mx-12'>
        <h1 className='flex flex-col text-emerald-800 text-3xl font-semibold px-4'>Weather Dashboard</h1>
        <CityStateCountryForm />
        <div className='grid grid-cols-5 gap-2'>
          {cityLatLong.map(latLong => (
            <div key={latLong.name} className='text-emerald-900 p-2 border-2 border-neutral-700 rounded-lg shadow-xl shadow-neutral-700'>
              <p>{latLong.lat}</p> <p>{latLong.lon}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
