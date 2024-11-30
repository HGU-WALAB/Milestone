import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import ResumePage from '../pages/ResumePage';
import ActivitiesPage from '../pages/ActivitiesPage';
import ProfilePage from '../pages/ProfilePage';
import App from '../App';
import { Outlet } from 'react-router-dom';

function Layout () {
  return (
    <>
      <HeaderBar />
      <main>
        <Outlet /> {/* 하위 라우트를 렌더링 */}
      </main>
    </>
  );
};

export default Layout;

export const Routing = () => {
  return (
    <Router>
      <Routes>
        {/* Layout이 HeaderBar를 포함하므로 HeaderBar를 중첩 라우터에 포함하지 X */}
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};