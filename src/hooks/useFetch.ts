import { Dispatch, SetStateAction, useEffect } from "react";
import { FetchTypes, RequestConfig } from "../types";
import axios from "axios";
import { config } from "maplibre-gl";

export const useFetch = (
  selectedAirport: string,
  fetchType: FetchTypes,
  requestConfig: RequestConfig,
  setData: Dispatch<SetStateAction<any>>,
) => {

  const makeRequest = (config: RequestConfig) => {
    console.log(config);
    axios.request(config)
      .then((response) => {
        console.log('get fetch!', response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

}
