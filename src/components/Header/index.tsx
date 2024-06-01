import React from 'react';
import s from './Header.module.sass';
import logo from 'assets/img/logo.svg';

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <a href="/avia" className={s.header__logo}>
        <img src={logo} alt="Company Logo" />
      </a>
    </header>
  );
};

export default Header;
