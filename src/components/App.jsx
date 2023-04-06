import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export function App() {
  const [value, setValue] = useState();

  const onGetValue = value => {
    setValue(value);
  };

  return (
    <div>
      <Searchbar onGetValue={onGetValue} />
      <ImageGallery value={value} />
    </div>
  );
}
