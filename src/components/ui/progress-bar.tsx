import { FC } from "react";

interface IProps {
  value: number;
  maxValue: number;
  width?: string;
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
  className?: string;
}

const ProgressBar: FC<IProps> = ({
  value,
  maxValue,
  width = "162px",
  height = "6px",
  backgroundColor = "bg-gray300",
  progressColor = "bg-purpleGrad",
  className = "",
}) => {
  // Если maxValue равен 0 или отсутствует, устанавливаем процент заполнения в 0
  const percentage = maxValue > 0 ? Math.min(Math.max((value / maxValue) * 100, 0), 100) : 0;

  return (
    <div
      className={`${backgroundColor} w-[${width}] h-[${height}] rounded-[6px] relative ${className}`}
    >
      <div
        style={{ width: `${percentage}%` }}
        className={`absolute left-0 h-full ${progressColor} rounded-[6px]`}
      ></div>
    </div>
  );
};

export default ProgressBar; 