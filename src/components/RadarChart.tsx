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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  skillData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ skillData }) => {
  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100, // 최대값을 100으로 설정
        ticks: {
          stepSize: 25, // 간격을 25로 설정
          showLabelBackdrop: false, // 라벨 배경 제거
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "500px"}}>
      <Radar data={skillData} options={options} />
    </div>
  );
};

export default RadarChart;