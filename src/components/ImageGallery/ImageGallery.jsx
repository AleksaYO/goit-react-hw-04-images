import { useState, useEffect } from 'react';
import css from '../ImageGallery/ImageGallery.module.css';
import { SearchImages } from 'Api';
import { Button } from 'components/Button/Button';
import { Notify } from 'notiflix';
import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ value }) {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [oldValue, setOldValue] = useState(value);
  const [oldPage, setOldPage] = useState(page);

  useEffect(() => {
    setOldValue(value);
    setOldPage(page);
    const onFetchInfo = () => {
      SearchImages(value, page)
        .then(arr => {
          setGallery(prev => {
            return [...prev, ...arr.hits];
          });
          setLoading(false);
        })
        .catch(error => {
          Notify.failure(`${error.message}`);
        })
        .finally(setLoading(false));
    };

    if (value && page !== oldPage && page === 1) {
      onFetchInfo();
    }

    if (value !== oldValue && page !== 1) {
      setGallery([]);
      setPage(1);
    }

    if (value !== oldValue && page === 1) {
      setGallery([]);
      setLoading(true);
      setPage(1);
      onFetchInfo();
    }

    if (page !== oldPage && page !== 1) {
      setLoading(true);
      onFetchInfo();
    }
  }, [value, page, oldValue, oldPage]);

  const onBtnClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    gallery.length && (
      <div className={css.box}>
        <ul className={css.ImageGallery}>
          {gallery.map(item => {
            return <ImageGalleryItem key={item.id} item={item} />;
          })}
        </ul>
        {isLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        ) : (
          <Button onBtnClick={onBtnClick} />
        )}
      </div>
    )
  );
}
