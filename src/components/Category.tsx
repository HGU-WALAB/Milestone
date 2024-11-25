import { useState, useEffect } from "react";
import styled from "styled-components";

import down from "../assets/down.svg";
import up from "../assets/up.svg";
import axios from "axios";

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
}

function Category ({category}: CategoryProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(isOpen => !isOpen); // on,off 개념 boolean
    }

    // category type 을 파라미터로 넘기면 해당하는 activity list 를 받아오는 플로우
    const [activityList, setActivityList] = useState<Activity[]>([]);

    const getActivityList = async () => {
        try {
            const response: AxiosResponse<Activity[]> = await axios.get(`http://localhost:3000/activities`);
            console.log(response);
            setActivityList(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getActivityList();
    }, []);

    return (
        <CatComponentWrapper>
            <CategoryWrapper onClick={toggle}>
                <CategoryTitle>{category}</CategoryTitle>
                <ToggleButton>
                    <img src={isOpen ? up : down} />
                </ToggleButton>
            </CategoryWrapper>
            {isOpen &&
            <DetailWrapper>
                {activityList.map((activity, index) => {
                    return (
                        <div key={index}>
                            <h3>{activity.title}</h3>
                            <p>{activity.date}</p>
                            <hr/>
                        </div>
                    );
                })}
            </DetailWrapper>}
        </CatComponentWrapper>
    );
}

export default Category;

const CatComponentWrapper = styled.div`
width: 30rem;
margin: 1rem;
display: flex;
flex-direction: column;
`

const CategoryWrapper = styled.div`
height: 2rem;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 0;
padding: 0.5rem;
background-color: #8CA1BF;
border-radius: 1rem;
transform: translateY(1rem);
`

const DetailWrapper = styled.div`
min-height: 20rem;
margin-top: 0;
padding: 1rem;
background-color: #E2E2E2;
border-radius: 0 0 1rem 1rem;
`

const CategoryTitle = styled.span`
`

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
`