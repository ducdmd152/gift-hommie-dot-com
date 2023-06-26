interface DayOrderDTO {
  total: number;
  revenue: number;
  cancelled: number;
  refused: number;
  confirmed: number;
  delivering: number;
  pending: number;
  successful: number;
  fail: number;
}
interface WeekOrderDTO {
  total: number;
  revenue: number;
  cancelled: number;
  refused: number;
  confirmed: number;
  delivering: number;
  pending: number;
  successful: number;
  fail: number;
  day: DayOrderDTO[];
}
interface MonthOrderDTO {
  total: number;
  revenue: number;
  cancelled: number;
  refused: number;
  confirmed: number;
  delivering: number;
  pending: number;
  successful: number;
  fail: number;
  weeks: WeekOrderDTO[];
}
export default interface StatisticOrderDTO {
  day: DayOrderDTO;
  week: WeekOrderDTO;
  month: MonthOrderDTO;
}
