import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FetchTypes, RequestConfig } from "../types";
import axios from "axios";

export const useFetch = (
  selectedAirport: string,
  fetchType: FetchTypes,
  requestConfig: RequestConfig,
) => {
  const [data, setData] = useState({});

  const makeRequest = (config: RequestConfig) => {
    axios.request(config)
      .then((response) => {
        // console.log('get fetch!', response.data);
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
  useEffect(() => console.log(data), [data]);

  useEffect(() => {
    switch (fetchType) {
      case "AIRPORT_INFO":
        console.log(selectedAirport ? selectedAirport : 'no airport selected');
        selectedAirport && makeRequest(requestConfig);
        break;
      case "AIRPORT_WEATHER":
        console.log(selectedAirport ? selectedAirport : 'no weather selected');
        selectedAirport && makeRequest(requestConfig);
        break;
      default:
        console.error('INVALID FETCHTYPE', fetchType)
    }
  }, [selectedAirport, fetchType]);

  return data;

}
