"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartLegend } from "./ChartLegend";
import { ChartTooltip } from "./ChartTooltip";
import { usePaymentHistoryByOfferIDQuery } from "src/queries/business/usePaymentHistoryByOfferIDQuery";
import { Spinner } from "src/components/ui/spinner";
import dayjs from "dayjs";

// Types
interface ChartDataPoint {
  date: string;
  day: number;
  budget: number;
  views: number;
}

interface BudgetChartProps {
  offerID: number;
}

interface ChartRanges {
  budget: number;
  views: number;
}

interface PaymentHistoryItem {
  id: number;
  date: string;
  sum: number;
  views: number;
}

// Constants
const MIN_DAYS_TO_SHOW = 7;
const RANGE_BUFFER = 1.2;
const MAX_BREAKPOINTS = 8;
const CHART_COLORS = {
  budget: "#f8d47a",
  views: "#FF9364",
} as const;

// Utility functions
const formatBudgetTick = (value: number): string => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const formatViewsTick = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const calculateBreakpoints = (max: number): number[] => {
  if (max <= 0) return [0, 1, 2, 5, 10];
  if (max <= 10) return [0, 2, 5, 10];
  
  if (max <= 1000) {
    const logMax = Math.log10(max);
    const breakpoints = [0];
    
    for (let i = 0; i <= Math.ceil(logMax); i++) {
      const value = Math.pow(10, i);
      if (value <= max * RANGE_BUFFER) {
        breakpoints.push(value);
      }
    }
    return breakpoints;
  }
  
  // Adaptive scale for large values
  const magnitude = Math.floor(Math.log10(max));
  const base = Math.pow(10, magnitude);
  const normalizedMax = max / base;
  
  let step = 1;
  if (normalizedMax <= 2) step = 0.5;
  else if (normalizedMax <= 5) step = 1;
  else if (normalizedMax <= 10) step = 2;
  else step = 5;
  
  const breakpoints = [0];
  let current = step * base;
  
  while (current <= max * RANGE_BUFFER && breakpoints.length < MAX_BREAKPOINTS) {
    breakpoints.push(current);
    current += step * base;
  }
  
  return breakpoints;
};

const createEmptyChartData = (): ChartDataPoint[] => {
  return Array.from({ length: MIN_DAYS_TO_SHOW }, (_, index) => ({
    date: dayjs().subtract(MIN_DAYS_TO_SHOW - 1 - index, 'day').format('MM/DD'),
    day: index + 1,
    budget: 0,
    views: 0,
  }));
};

const processPaymentHistory = (paymentHistory: PaymentHistoryItem[]): ChartDataPoint[] => {
  if (!paymentHistory?.length) return createEmptyChartData();
  
  // Sort and prepare data
  const sorted = [...paymentHistory].sort((a, b) => 
    dayjs(a.date).diff(dayjs(b.date))
  );
  
  const historyMap = new Map(
    sorted.map(item => [
      dayjs(item.date).format('YYYY-MM-DD'),
      { sum: item.sum || 0, views: item.views || 0 }
    ])
  );
  
  const firstDate = dayjs(sorted[0].date);
  const lastDate = dayjs(sorted[sorted.length - 1].date);
  const totalDays = lastDate.diff(firstDate, 'day') + 1;
  const daysToAdd = Math.max(0, MIN_DAYS_TO_SHOW - totalDays);
  
  // Generate all dates
  const allDates: string[] = [];
  
  // Add days before first date
  for (let i = daysToAdd; i > 0; i--) {
    allDates.push(firstDate.subtract(i, 'day').format('YYYY-MM-DD'));
  }
  
  // Add days from first to last date
  for (let i = 0; i < totalDays; i++) {
    allDates.push(firstDate.add(i, 'day').format('YYYY-MM-DD'));
  }
  
  // Create chart data with cumulative values
  let lastKnownBudget = 0;
  let lastKnownViews = 0;
  
  return allDates.map((date, idx) => {
    const shortDate = dayjs(date).format('MM/DD');
    const historyItem = historyMap.get(date);
    
    if (historyItem) {
      lastKnownBudget = historyItem.sum;
      lastKnownViews = historyItem.views;
    }
    
    return {
      date: shortDate,
      day: idx + 1,
      budget: lastKnownBudget,
      views: lastKnownViews,
    };
  });
};

const calculateChartRanges = (chartData: ChartDataPoint[]): ChartRanges => {
  const budgetValues = chartData
    .map(d => d.budget)
    .filter(v => isFinite(v) && !isNaN(v));
    
  const viewsValues = chartData
    .map(d => d.views)
    .filter(v => isFinite(v) && !isNaN(v));
  
  const maxBudget = budgetValues.length ? Math.max(...budgetValues) : 0;
  const maxViews = viewsValues.length ? Math.max(...viewsValues) : 0;
  
  const budgetBreakpoints = calculateBreakpoints(maxBudget);
  const viewsBreakpoints = calculateBreakpoints(maxViews);
  
  const budgetRange = budgetBreakpoints.find(bp => bp >= maxBudget) || 
    Math.ceil(maxBudget * RANGE_BUFFER) || 100;
    
  const viewsRange = viewsBreakpoints.find(bp => bp >= maxViews) || 
    Math.ceil(maxViews * RANGE_BUFFER) || 1000;
  
  return { budget: budgetRange, views: viewsRange };
};

export const BudgetChart = ({ offerID }: BudgetChartProps) => {
  const t = useTranslations("business.offer");
  const { paymentHistory, paymentHistoryLoading } = usePaymentHistoryByOfferIDQuery(offerID);

  // Memoized chart data processing
  const chartData = useMemo(() => 
    processPaymentHistory(paymentHistory || []), 
    [paymentHistory]
  );

  // Memoized chart ranges calculation
  const chartRanges = useMemo(() => 
    calculateChartRanges(chartData), 
    [chartData]
  );

  // Loading state
  if (paymentHistoryLoading) {
    return (
      <div className="col-span-2 row-span-4 flex items-center justify-center rounded-lg h-full w-full bg-white p-6">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="col-span-2 row-span-4 flex flex-col gap-7 rounded-lg h-[595px] lg:h-full w-full bg-white p-6">
      <h2 className="text-xl sm:text-2xl font-bold">{t("budgetChartTitle")}</h2>
      
      <ResponsiveContainer className="flex-grow">
        <LineChart data={chartData} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="2 10" />
          
          <XAxis
            dataKey="date"
            tickMargin={18}
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis
            yAxisId="left"
            domain={[0, chartRanges.budget]}
            label={{
              value: "Budget ($)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatBudgetTick}
          />
          
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, chartRanges.views]}
            tickFormatter={formatViewsTick}
            label={{
              value: "Views",
              angle: -90,
              position: "insideRight",
              offset: 10,
            }}
            tickLine={false}
            axisLine={false}
          />
          
          <Tooltip content={<ChartTooltip />} />
          
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: 13 }}
            content={ChartLegend}
          />
          
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="budget"
            stroke={CHART_COLORS.budget}
            strokeWidth={5}
            dot={false}
            activeDot={{ r: 8, strokeWidth: 3 }}
          />
          
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="views"
            stroke={CHART_COLORS.views}
            strokeWidth={5}
            dot={false}
            activeDot={{ r: 8, strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
