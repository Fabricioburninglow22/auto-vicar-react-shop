
import * as React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer } from "./chart"

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#3B82F6"],
  valueFormatter,
  yAxisWidth = 40,
}: BarChartProps) {
  return (
    <ChartContainer 
      config={{}}
      className="h-full w-full"
    >
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={index} />
        <YAxis width={yAxisWidth} tickFormatter={valueFormatter} />
        <Tooltip formatter={valueFormatter} />
        {categories.map((category, i) => (
          <Bar 
            key={category} 
            dataKey={category} 
            fill={colors[i % colors.length]} 
            radius={[4, 4, 0, 0]} 
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}
