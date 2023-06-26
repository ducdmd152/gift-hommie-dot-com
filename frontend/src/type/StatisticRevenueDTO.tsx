interface DayRevenueDTO {
  revenue: number;
}
interface WeekRevenueDTO {
  revenue: number;
  days: DayRevenueDTO[];
}
interface MonthRevenueDTO {
  revenue: number;
  weeks: WeekRevenueDTO[];
}
export default interface StatisticRevenueDTO {
  day: DayRevenueDTO;
  week: WeekRevenueDTO;
  month: MonthRevenueDTO;
}
