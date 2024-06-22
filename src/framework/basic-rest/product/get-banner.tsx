import { QueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchBanner = async (section: any) => {
  console.log(section, "___sect");

  const url = `${API_ENDPOINTS.BANNER_VIEW}${section}`;
  const {
    data: { app_data: data },
  } = await http.get(url);
  console.log(data, "new__Data");

  return data;
};

export const useGetBanners = (options: QueryOptionsType, section: any) => {
    console.log(section,"_______wwww");
    
  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.BANNER_VIEW, options],
    queryFn: () => fetchBanner(section),
  });
};
