import React from 'react';
import { Link } from 'react-router-dom';
import '../HeaderBar.css'; // 스타일 추가를 위한 CSS 파일 (선택)

const HeaderBar: React.FC = () => {
  return (
    <header className="header-bar">
      <div className="logo">
        <Link to="/">milestone</Link>
      </div>
      <nav className="nav-links">
        <Link to="/resume">내 이력서</Link>
        <Link to="/activities">내 활동</Link>
        <Link to="/profile">프로필</Link>
      </nav>
    </header>
  );
};

export default HeaderBar;
