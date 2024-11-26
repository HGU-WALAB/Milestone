import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import down from "../assets/down.svg";
import up from "../assets/up.svg";
import axios from "axios";
import { currentSidAtom } from "../atom";

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

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

interface CategoryProps {
  category: string;
  categoryIndex: number;  // Category index (1, 2, 3, 4, or 5)
}

function Category({ category, categoryIndex }: CategoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentSid = useRecoilValue(currentSidAtom); // Fetch the current sid from atom
  const [activityList, setActivityList] = useState<Activity[]>([]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const getActivityList = async () => {
    try {
      const response: AxiosResponse<Activity[]> = await axios.get(
        `http://localhost:3000/activities`
      );
      const filteredActivities = response.data.filter(
        (activity) => activity.sid === currentSid
      ); // Filter by current sid
      setActivityList(filteredActivities);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getActivityList();
  }, [currentSid]); // Re-fetch if sid changes

  // Filter the activities by the specific category
  const filteredActivities = activityList.filter(
    (activity) => activity[`category${categoryIndex}` as keyof Activity] !== 0
  );

  return (
    <CatComponentWrapper>
      <CategoryWrapper onClick={toggle}>
        <CategoryTitle>{category}</CategoryTitle>
        <ToggleButton>
          <img src={isOpen ? up : down} />
        </ToggleButton>
      </CategoryWrapper>
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