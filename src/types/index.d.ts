/////////////////////
/// GENERAL TYPES ///
/////////////////////

export interface Headers {
  "ff-coding-exercise": string,
  "Content-Type": "application/json",
  username?: string,
  password?: string,
};

export interface RequestConfig {
  url: string,
  header: Headers,
}

export type FetchTypes = "AIRPORT_INFO" | "AIRPORT_WEATHER";


