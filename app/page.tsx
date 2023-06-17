import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { searchParamsProps } from '@/types';
import { fetchCars } from '@/utils';

export default async function Home({ searchParams }: searchParamsProps) {
  const allCars = await fetchCars({
    manufacture: searchParams.manufacture || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">Каталог машин</h1>
          <p>Найдите машину которая вам нравится</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car,i) => (
                <CarCard car={car} key={i} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-x1 font-bold">No cars here</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
