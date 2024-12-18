import { useEffect } from "react";
import { FetchTypes, RequestConfig } from "../types";

export const useFetch = (
  selectedAirport: string,
  fetchType: FetchTypes,
  requestConfig: RequestConfig,
) => {

  const config = {
    url: (requestConfig.url + selectedAirport),
    headers: {
      'x-api-key': 'f15b282e5bd6495eae4cafe2d42b72e5',
      'Authorization': `Bearer ${portalState.token}`,
      'Content-Type': 'application/json'
    }
  };

  //   const makeRequest = (portalState: PortalContextInterface, requestData: any) => {
  //   portalState.token && requestData &&
  //   axios.request(config)
  //     .then((response) => {
  //       console.log('get fetch!', response.data);
  //       setData(response.data);
  //     })
  //       .catch((error) => {
  //       console.log(error);
  //     });
  // }



  useEffect(() => {
    switch (fetchType) {
      case "AIRPORT_INFO":
        console.log(selectedAirport ? selectedAirport : 'no airport selected');
        break;
      case "AIRPORT_WEATHER":
        console.log(selectedAirport ? selectedAirport : 'no weather selected');
        break;
      default:
        console.error('INVALID FETCHTYPE', fetchType)
    }
  }, [selectedAirport, fetchType]);

}
