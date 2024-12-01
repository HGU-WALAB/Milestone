import { Routes, Route, Outlet } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import ResumePage from '../pages/ResumePage';
import ActivitiesPage from '../pages/ActivitiesPage';
import ProfilePage from '../pages/ProfilePage';
import MainPage from '../pages/MainPage';

function Layout () {
  return (
    <div>
      <HeaderBar />
      <main>
        <Outlet /> {/* 하위 라우트를 렌더링 */}
      </main>
    </div>
  );
};

export default Layout;

export const Routing = () => {
  return (
      <Routes>
        {/* Layout이 HeaderBar를 포함하므로 HeaderBar를 중첩 라우터에 포함하지 X */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
  );
};