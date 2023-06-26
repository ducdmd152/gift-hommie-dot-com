import ProductDTO from "./ProductDTO";

interface ValueDTO {
  topSale: ProductDTO[];
  topRating: ProductDTO[];
}
interface DayProductDTO {
  value: ValueDTO;
}
interface WeekProductDTO {
  value: ValueDTO;
}
interface MonthProductDTO {
  value: ValueDTO;
}
export default interface StatisticProductDTO {
  day: DayProductDTO;
  week: WeekProductDTO;
  month: MonthProductDTO;
}
