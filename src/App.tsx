import React, { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import RadarChart from "./components/RadarChart";
import Category from "./components/Category";
import { getUsers, getActivities } from "./api/api";

interface User {
  id: string;
  name: string;
  sid: number;
}

interface Activity {
  sid: number;
  category1: number;
  category2: number;
  category3: number;
  category4: number;
  category5: number;
}

const categories: string[] = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [individualData, setIndividualData] = useState<number[]>([]);
  const [averageData, setAverageData] = useState<number[]>([]);

  const targetSid = 22100058; // 권채은의 sid

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const activitiesData = await getActivities();
        setUsers(usersData);
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 권채은의 데이터 계산
  useEffect(() => {
    const userActivities = activities.filter((activity) => activity.sid === targetSid);

    const aggregatedData = [1, 2, 3, 4, 5].map((categoryIndex) => {
      const nonZeroScores = userActivities
        .map((activity) => activity[`category${categoryIndex}` as keyof Activity])
        .filter((score) => score !== 0);

      const total = nonZeroScores.reduce((sum, score) => sum + score, 0);
      const count = nonZeroScores.length;

      return count > 0 ? (total / (count * 5)) * 100 : 0;
    });

    setIndividualData(aggregatedData);
  }, [activities]);

  // 권채은을 제외한 평균값 계산
  useEffect(() => {
    const otherUsers = users.filter((user) => user.sid !== targetSid).map((user) => user.sid);

    const totalData = [1, 2, 3, 4, 5].map((categoryIndex) => {
      const nonZeroScores: number[] = [];

      activities
        .filter((activity) => otherUsers.includes(activity.sid))
        .forEach((activity) => {
          const score = activity[`category${categoryIndex}` as keyof Activity];
          if (score !== 0) {
            nonZeroScores.push(score);
          }
        });

      const total = nonZeroScores.reduce((sum, score) => sum + score, 0);
      const count = nonZeroScores.length;

      return count > 0 ? (total / (count * 5)) * 100 : 0;
    });

    setAverageData(totalData);
  }, [activities, users]);

  return (
    <RecoilRoot>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          padding: "20px",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>핵심 역량</h1>

        {/* RadarChart 추가 */}
        {individualData.length > 0 && averageData.length > 0 && (
          <RadarChart
            skillData={{
              labels: categories,
              datasets: [
                {
                  label: "나의 역량",
                  data: individualData,
                  backgroundColor: "rgba(0, 89, 255, 0.2)",
                  borderColor: "rgba(0, 89, 255, 0.8)",
                  borderWidth: 2,
                },
                {
                  label: "평균 합격자 역량",
                  data: averageData,
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                  borderColor: "rgba(255, 0, 0, 0.8)",
                  borderWidth: 2,
                },
              ],
            }}
          />
        )}

        {/* Category 리스트 */}
        {categories.map((category, index) => (
          <Category key={index} category={category} categoryIndex={index + 1} />
        ))}
      </div>
    </RecoilRoot>
  );
};

export default App;