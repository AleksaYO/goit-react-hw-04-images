import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import { nanoid } from 'nanoid';

export function ImageGalleryItem({ item }) {
  const [modal, setModal] = useState(false);

  const onToggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <li
        onClick={onToggleModal}
        key={nanoid()}
        className={css.ImageGalleryItem}
      >
        <img
          className={css['ImageGalleryItem-image']}
          src={item.webformatURL}
          alt=""
        />
      </li>

      {modal && (
        <Modal
          largeImageURL={item.largeImageURL}
          onToggleModal={onToggleModal}
        />
      )}
    </>
  );
}
