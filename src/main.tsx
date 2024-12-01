import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from "recoil";
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './App';


createRoot(document.getElementById('root')!).render(
  <RecoilRoot> {/* RecoilRoot로 전체 앱을 감싸서 상태 관리 기능 활성화 */}
    <BrowserRouter>
      <StrictMode>
        <App/>
      </StrictMode>
    </BrowserRouter>
  </RecoilRoot>
)
