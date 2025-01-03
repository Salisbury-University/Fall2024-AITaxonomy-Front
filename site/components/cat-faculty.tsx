"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { data } from "autoprefixer";

const chartConfig = {
  Faculty: {
    label: "Faculty",
    color: "#8a0000",
  },
} satisfies ChartConfig


interface catData {
  category: string;
  faculty: number;
}

interface catFacultyProps {
  data: catData[];
}

export function CategoryFaculty({ data }:catFacultyProps) {

  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-full w-full text-black dark:text-white">
          <BarChart accessibilityLayer data={data} >
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string)=> value.slice(0, 3)}
                tick={{fontSize: 12}}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="faculty" fill="var(--color-Faculty)" radius={4}/>
          </BarChart>
      </ChartContainer>
    </div>
  );
}