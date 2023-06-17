import { CarProps, FilterProps } from '@/types';

export const fetchCars = async (filters: FilterProps) => {
  const { manufacture, year, model, limit, fuel } = filters;
  const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1244a13733mshb3256ed89b16adep1f6ec9jsnabf17a8133a6',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(
      `${url}make=${manufacture}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`,
      options,
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    alert(`Oops, error wrong ${error}`);
  }
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 2500; //Базовая цена аренды в рублях
  const mileageFactor = 0.1; //Фактор езды
  const ageFactor = 0.05; //Фактор года машины

  //Подсчёт
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  //Подсчёт итоговой цены аренды за день
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const getCarImage = (car: CarProps, angle?: string) => {
  const url = new URL(`https://cdn.imagin.studio/getimage`);
  const { make, year, model } = car;
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
};
