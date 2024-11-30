import { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import RadarChart from "./components/RadarChart";
import Category from "./components/Category";
import { getUsers, getActivities } from "./api/api";

// User 인터페이스: 사용자 정보를 나타내는 타입 정의
interface User {
  id: string;
  name: string;
  sid: number;
}

// Activity 인터페이스: 활동 데이터를 나타내는 타입 정의
interface Activity {
  sid: number;
  category1: number;
  category2: number;
  category3: number;
  category4: number;
  category5: number;
}
// 카테고리 이름 리스트
const categories: string[] = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];

function App () {
  // 상태 변수 선언: 사용자 정보, 활동 정보, 개인 데이터, 평균 데이터
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [individualData, setIndividualData] = useState<number[]>([]);
  const [averageData, setAverageData] = useState<number[]>([]);

  const targetSid = 22100058; // 권채은의 sid

  // 데이터 가져오기: useEffect를 사용하여 사용자의 정보와 활동 데이터를 비동기적으로 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers(); // 사용자 데이터 가져오기
        const activitiesData = await getActivities(); // 활동 데이터 가져오기
        setUsers(usersData); // 사용자 데이터 상태 업데이트
        setActivities(activitiesData); // 활동 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // 데이터 가져오기 함수 호출
  }, []);

  // 권채은의 데이터 계산
  useEffect(() => {
    const userActivities = activities.filter((activity) => activity.sid === targetSid);

    // 각 카테고리별로 권채은의 점수 계산 (0이 아닌 점수만 사용)
    const aggregatedData = [1, 2, 3, 4, 5].map((categoryIndex) => {
      const nonZeroScores = userActivities
        .map((activity) => activity[`category${categoryIndex}` as keyof Activity])
        .filter((score) => score !== 0); // 0이 아닌 점수만 필터링

      const total = nonZeroScores.reduce((sum, score) => sum + score, 0);
      const count = nonZeroScores.length; // 0이 아닌 점수의 개수

      // 평균 점수 계산 후 비율로 변환하여 100으로 정규화
      return count > 0 ? (total / (count * 5)) * 100 : 0;
    });

    setIndividualData(aggregatedData); // 개인 데이터 상태 업데이트
  }, [activities]); // 활동 데이터가 변경될 때마다 실행

  // 권채은을 제외한 평균값 계산
  useEffect(() => {
    const otherUsers = users.filter((user) => user.sid !== targetSid).map((user) => user.sid);

    const totalData = [1, 2, 3, 4, 5].map((categoryIndex) => {
      const nonZeroScores: number[] = [];

      // 다른 사용자들의 활동 데이터를 기반으로 점수 수집
      activities
        .filter((activity) => otherUsers.includes(activity.sid)) // 권채은을 제외한 사용자들 필터링
        .forEach((activity) => {
          const score = activity[`category${categoryIndex}` as keyof Activity]; // 해당 카테고리 점수 가져오기
          if (score !== 0) { 
            nonZeroScores.push(score); // 0이 아닌 점수만 추가
          }
        });

      const total = nonZeroScores.reduce((sum, score) => sum + score, 0); // 점수 합계 계산
      const count = nonZeroScores.length; // 0이 아닌 점수의 개수

      return count > 0 ? (total / (count * 5)) * 100 : 0; 
    });

    setAverageData(totalData); // 평균 데이터 상태 업데이트
  }, [activities, users]); // 활동 데이터나 사용자 데이터가 변경될 때마다 실행

  return (
    <RecoilRoot> {/* RecoilRoot로 전체 앱을 감싸서 상태 관리 기능 활성화 */}
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