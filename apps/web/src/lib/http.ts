export type Endpoint = { path: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE' }

export type EndpointFunction = (...args: any[]) => Endpoint

export type DomainEndpoints = {
  [key: string]: Endpoint | EndpointFunction
}
