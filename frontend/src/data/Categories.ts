const CATEGORIES = [
  {
    id: 1,
    name: "Cốc Sứ",
  },
  {
    id: 6,
    name: "Hộp Bút",
  },
  {
    id: 5,
    name: "Khung Ảnh",
  },
  {
    id: 4,
    name: "Đèn Ngủ",
  },
  {
    id: 2,
    name: "Đồ Chơi",
  },
  {
    id: 3,
    name: "Đồng Hồ",
  },
  {
    id: 7,
    name: "Khác",
  },
];
export default CATEGORIES;

export const getCategoryName = (id: number): string | undefined =>
  CATEGORIES.find((c) => c.id === id)?.name;
