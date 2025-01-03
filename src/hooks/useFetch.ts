import { useEffect, useState } from "react";
import { FetchTypes, RequestConfig } from "../types";
import axios from "axios";

export const useFetch = (
  selectedAirport: string,
  fetchType: FetchTypes,
  requestConfig: RequestConfig,
) => {
  const [data, setData] = useState({});

  const makeRequest = (config: RequestConfig) => {
    axios.request(config as any)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData({
          id: '...',
          name: 'AIRPORT NOT FOUND',
          runways: [],
          coords: [0, 0]
        });
        console.log(error);
      });
  }

  useEffect(() => {
    switch (fetchType) {
      case "AIRPORT_INFO":
        selectedAirport && makeRequest(requestConfig);
        break;
      case "AIRPORT_WEATHER":
        selectedAirport && makeRequest(requestConfig);
        break;
      default:
        console.error('INVALID FETCHTYPE', fetchType)
    }
  }, [selectedAirport, fetchType]);

  return data;

}
