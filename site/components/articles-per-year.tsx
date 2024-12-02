"use client"

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ArticleData {
  year: number;
  articles: number;
}

interface ArticlesPerYearChartProps {
    chartData: ArticleData[];
    className?: string;
}

const chartConfig = {
  articles: {
    label: "Articles",
    color: "hsl(var(--primary))",
  },
}

export default function ArticlesPerYearChart({ chartData, className }: ArticlesPerYearChartProps) {
  const currentYear = new Date().getFullYear()
  const lastYearData = chartData.find(data => data.year === currentYear - 1)
  const thisYearData = chartData.find(data => data.year === currentYear)
  const growthRate = lastYearData && thisYearData 
    ? ((thisYearData.articles - lastYearData.articles) / lastYearData.articles * 100).toFixed(1)
    : null

  return (
    <Card className={`w-full h-full ${className}`}>
      <CardHeader className="p-2 sm:p-4">
        <CardTitle className="text-sm sm:text-base md:text-lg">Articles Per Year</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{chartData[0].year} - {chartData[chartData.length - 1].year}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-0">
        <ChartContainer config={chartConfig} className="h-[150px] sm:h-[200px] md:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.toString().slice(-2)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}`}
                width={30}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Line
                type="monotone"
                dataKey="articles"
                stroke="var(--color-articles)"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: "var(--color-articles)",
                  strokeWidth: 2,
                  stroke: "var(--background)",
                }}
                activeDot={{
                  r: 5,
                  fill: "var(--color-articles)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs sm:text-sm p-2 sm:p-4 pt-0">
        {growthRate && (
          <div className="flex items-center gap-1 font-medium leading-none">
            Trending up by {growthRate}%
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Total articles published yearly
        </div>
      </CardFooter>
    </Card>
  )
}

