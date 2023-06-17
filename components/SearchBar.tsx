'use client';
import React from 'react';
import Image from 'next/image';
import { SearchManufacturer } from './';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

const SearchBar = () => {
  const [manufacture, setManufacture] = React.useState('');
  const [model, setModel] = React.useState('');
  const router = useRouter();

  const updateSearchParams = (model: string, manufacture: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }
    if (manufacture) {
      searchParams.set('manufacture', manufacture);
    } else {
      searchParams.delete('manufacture');
    }
    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathName);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacture === '' && model === '') {
      return alert('Заполните поисковое поле');
    }
    updateSearchParams(model.toLowerCase(),manufacture.toLowerCase());
  };
  return (
    <form className="searchbar" onSubmit={(e) => handleSearch(e)}>
      <div className="searchbar__item">
        <SearchManufacturer manufacture={manufacture} setManufacture={setManufacture} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src={'/model-icon.png'}
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Camry"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
