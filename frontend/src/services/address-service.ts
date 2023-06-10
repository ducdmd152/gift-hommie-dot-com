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
      result = res.data.data.reverse() as ProvinceDTO[];
    });
    return result;
  },
  async getDistricts(provinceId: number) {
    let result = [] as DistrictDTO[];
    const url = GHN.url + "/district";
    await axios
      .post(url, { province_id: provinceId }, { headers: { token: GHN.token } })
      .then((res) => {
        result = res.data.data.reverse() as DistrictDTO[];
      });
    return result;
  },
  async getWards(districtId: number) {
    let result = [] as WardDTO[];
    const url = GHN.url + "/ward";
    await axios
      .post(url, { district_id: districtId }, { headers: { token: GHN.token } })
      .then((res) => {
        result = res.data.data.reverse() as WardDTO[];
      });
    return result;
  },
};
