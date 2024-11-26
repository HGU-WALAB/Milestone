import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import down from "../assets/down.svg";
import up from "../assets/up.svg";
import axios from "axios";
import { currentSidAtom } from "../atom";

// AxiosResponse 인터페이스: Axios의 응답 타입 정의
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

// Activity 인터페이스: 활동 데이터의 타입 정의
interface Activity {
  sid: number;
  category1: number;
  category2: number;
  category3: number;
  category4: number;
  category5: number;
  title: string;
  date: string;
  id: string;
}

// CategoryProps 인터페이스: Category 컴포넌트의 props 타입 정의
interface CategoryProps {
  category: string;
  categoryIndex: number;  // Category index (1, 2, 3, 4, or 5) 점수
}

// Category 컴포넌트: 카테고리 별로 활동 목록을 보여주는 컴포넌트
function Category({ category, categoryIndex }: CategoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // 카테고리 펼침 상태
  const currentSid = useRecoilValue(currentSidAtom); // Recoil을 사용해 현재 SID 값 가져오기
  const [activityList, setActivityList] = useState<Activity[]>([]); // 활동 목록 상태

  // 카테고리 펼침/접힘 토글 함수
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // 활동 목록을 서버에서 가져오는 함수
  const getActivityList = async () => {
    try {
      const response: AxiosResponse<Activity[]> = await axios.get(
        `http://localhost:3000/activities` // 활동 목록 API 호출
      );
      // 현재 SID에 해당하는 활동만 필터링
      const filteredActivities = response.data.filter(
        (activity) => activity.sid === currentSid
      ); // Filter by current sid
      setActivityList(filteredActivities); // 필터링된 활동 목록 상태에 저장
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getActivityList(); // 컴포넌트가 마운트될 때 활동 목록을 가져옴
  }, [currentSid]); // SID가 변경될 때마다 재호출

  // 주어진 카테고리에 해당하는 활동 필터링 (점수가 0이 아닌 활동만)
  const filteredActivities = activityList.filter(
    (activity) => activity[`category${categoryIndex}` as keyof Activity] !== 0
  );

  return (
    <CatComponentWrapper>
    {/* 카테고리 제목과 토글 버튼 */}
      <CategoryWrapper onClick={toggle}>
        <CategoryTitle>{category}</CategoryTitle>
        <ToggleButton>
          <img src={isOpen ? up : down} />
        </ToggleButton>
      </CategoryWrapper>
      {/* 카테고리가 열려 있고, 활동 목록이 있을 경우 상세 정보 표시 */}
      {isOpen && filteredActivities.length > 0 && (
        <DetailWrapper>
          {filteredActivities.map((activity, index) => (
            <div key={index}>
              <h3>{activity.title}</h3>
              <p>{activity.date}</p>
              <hr />
            </div>
          ))}
        </DetailWrapper>
      )}
    </CatComponentWrapper>
  );
}

export default Category;

// Styled components
const CatComponentWrapper = styled.div`
  width: 30rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const CategoryWrapper = styled.div`
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  padding: 0.5rem;
  background-color: #8ca1bf;
  border-radius: 1rem;
  transform: translateY(1rem);
`;

const DetailWrapper = styled.div`
  min-height: 20rem;
  margin-top: 0;
  padding: 1rem;
  background-color: #e2e2e2;
  border-radius: 0 0 1rem 1rem;
`;

const CategoryTitle = styled.span``;

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 2rem;
  border: none;
  outline: none;

  &:focus {
    border: none;
    outline: none;
  }
`;