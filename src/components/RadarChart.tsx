import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// 필요한 Chart.js 모듈을 등록하여 차트를 사용할 수 있도록 설정
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// RadarChart 컴포넌트의 props 타입 정의
interface RadarChartProps {
  skillData: {
    labels: string[]; // 레이더 차트의 라벨 (각 카테고리 이름)
    datasets: {
      label: string; // 데이터셋의 레이블 (예: "나의 역량", "평균 합격자 역량")
      data: number[]; // 각 카테고리의 점수 데이터
      backgroundColor: string; // 데이터의 배경색
      borderColor: string; // 데이터의 테두리 색
      borderWidth: number; // 테두리의 두께
    }[];
  };
}

// RadarChart 컴포넌트 정의
const RadarChart = ({ skillData }: RadarChartProps) => {
  // 차트의 옵션 설정
  const options: ChartOptions<"radar"> = {
    responsive: true, // 화면 크기에 맞춰 차트 크기 자동 조정
    maintainAspectRatio: false, // 비율 유지하지 않음
    scales: {
      r: {
        beginAtZero: true, // r 스케일의 시작점을 0으로 설정
        min: 0, // 최소값 설정
        max: 100, // 최대값 설정
        ticks: {
          stepSize: 25, // 간격을 25로 설정
          showLabelBackdrop: false, // 라벨 배경 제거
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  // Radar 컴포넌트에서 skillData와 options을 사용하여 차트를 렌더링
  return (
    <div style={{ width: "500px", height: "500px"}}>
      <Radar data={skillData} options={options} />
    </div>
  );
};

export default RadarChart;