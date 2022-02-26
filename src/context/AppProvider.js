import React, { createContext, useState, useEffect } from "react";
import provincesApi from "../apis/provincesApi";
import organizationApi from "../apis/organizationApi";
import tagsApi from "../apis/tagApi";
import bannerApi from "../apis/bannerApi";
export const AppContext = createContext();
export default function AppProvider({ children }) {
  const listRangePrice = [
    { id: 1, min_price: 0, max_price: 1000000, title: "Dưới 1 triệu" },
    { id: 2, min_price: 1000000, max_price: 4000000, title: "Từ 1 - 4 triệu" },
    { id: 3, min_price: 4000000, max_price: 8000000, title: "Từ 4 - 8 triệu" },
    {
      id: 4,
      min_price: 8000000,
      max_price: 12000000,
      title: "Từ 8 - 12 triệu",
    },
    {
      id: 5,
      min_price: 12000000,
      max_price: 20000000,
      title: "Từ 12 - 20 triệu",
    },
    { id: 6, min_price: 20000000, max_price: 100000000, title: "Trên 20 triệu" },
  ];
  const section = [
    {
      proCode: 79,
      proTitle: "Hồ Chí Minh",
      listOrg: [],
    },
    {
      proCode: 1,
      proTitle: "Hà Nội",
      listOrg: [],
    },
  ];
  const [parentBranch, setParentBranch] = useState();
  const [areaLocation, setAreaLocation] = useState([]);
  const [valuesFilter, setValuesFilter] = useState({});
  // ----------
  // load first

  const [provinces, setProvinces] = useState([]);
  const [listViewMoreOrg, setListViewMoreOrg] = useState([]);
  const [listOrg, setListOrg] = useState([]);
  const [listBanner, setListBanner] = useState([]);
  //const source = axios.CancelToken.source();

  // ----------
  const [tags, setTags] = useState([]);
  //save state for org detail
  const [org, setOrg] = useState();
  const [galleries, setGalleries] = useState();
  const [orgBr, setOrgBr] = useState([]);
  const [orgSerCate, setOrgSerCate] = useState([]);
  const [orgPrCate, setPrCate] = useState([]);
  const [chooseTab, setChooseTab] = useState("Dịch vụ");
  const [chooseCateSer, setChooseCateSer] = useState();
  const [orgSerSpecial, setOrgSerSpecial] = useState();
  const [orgProSpecial, setOrgProSpecial] = useState();
  // ----------
  // booking step
  const [openNextBranches, setOpenNextBranches] = useState(false);
  const [orgBooking, setOrgBooking] = useState();
  const [serBooking, setSerBooking] = useState([]);
  const [brBooking, setBrBooking] = useState();
  const [timeBooking, setTimeBooking] = useState();
  const [orderId, setOrderId] = useState();
  const [urlViewMore, setUrlViewMore] = useState()
  // ----------
  // order history detail
  const [listItem, setListItem] = useState();
  // ----------
  async function handleListOrg({ item }) {
    const resOrg = await organizationApi.getOrganizationByProvince_code({
      code: item.proCode,
      page: 1,
      limit: 10,
      include: "tags|branches",
    });
    setListOrg((prev) => [
      ...prev,
      {
        proCode: item.proCode,
        proTitle: item.proTitle,
        listOrg: resOrg.data.context,
      },
    ]);
  }
  //get location user
  // async function
  async function handleSetProvince() {
    try {
      const resTag = await tagsApi.getTags();
      setTags(resTag.data.context.data);
      const resProvinces = await provincesApi.getProvinces();
      const provinceOrgCount = await resProvinces.data.context.data.filter(item => item.organizations_count > 0)
      setProvinces(provinceOrgCount);
      // setListOrg(resOrg.data.context.data)
    } catch (err) {
      console.log(err);
    }
  }
  async function handleSetBanner(){
    try {
      const resTag = await bannerApi.getAll();
      setListBanner(resTag.data.context.data);
      // setListOrg(resOrg.data.context.data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleSetBanner();
    handleSetProvince();
    section.forEach((item) => handleListOrg({ item }));
    // return(
    //       source.token.cancel()
    // )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = {
    listRangePrice,
    provinces,
    tags,
    parentBranch,
    setParentBranch,
    areaLocation,
    setAreaLocation,
    valuesFilter,
    setValuesFilter,
    chooseTab,
    setChooseTab,
    serBooking,
    setSerBooking,
    brBooking,
    setBrBooking,
    timeBooking,
    setTimeBooking,
    orderId,
    setOrderId,
    orgBooking,
    setOrgBooking,
    openNextBranches,
    setOpenNextBranches,
    urlViewMore, setUrlViewMore,

    org,
    setOrg,
    chooseCateSer,
    setChooseCateSer,
    orgSerSpecial, 
    setOrgSerSpecial,
    galleries,
    setGalleries,
    orgBr,
    setOrgBr,
    orgSerCate,
    setOrgSerCate,
    orgProSpecial, 
    setOrgProSpecial,
    orgPrCate,
    setPrCate,
    listItem,
    setListItem,

    listOrg,
    setListOrg,
    listViewMoreOrg,
    setListViewMoreOrg,
    listBanner,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
