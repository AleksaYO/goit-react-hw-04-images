import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ largeImageURL, onToggleModal }) {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onCloseModalKey);
  // }
  useEffect(() => {
    const onCloseModalKey = e => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    };
    window.addEventListener('keydown', onCloseModalKey);

    return () => window.removeEventListener('keydown', onCloseModalKey);
  }, [onToggleModal]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onToggleModal();
    }
  };

  return (
    <div onClick={onBackdropClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}
