import { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ onGetValue }) {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onGetValue(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          onChange={onChange}
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          value={value}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
