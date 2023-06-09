import axios from "axios";
import GHN from "../data/GHN";
import ProvinceDTO from "../type/ProvinceDTO";

interface ProvinceResponse {
  data: ProvinceDTO[];
}
export default {
  async getProvinces() {
    let result = [] as ProvinceDTO[];
    const url = GHN.url + "/province";
    await axios.get(url, { headers: { token: GHN.token } }).then((res) => {
      result = res.data.data as ProvinceDTO[];
    });
    return result;
  },
  getDistricts(provinceId: number) {},
  getWards(districtId: number) {},
};
