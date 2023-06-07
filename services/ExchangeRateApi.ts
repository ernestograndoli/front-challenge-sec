import FetchService from "./FetchService";

class ExchangeRateApi {
  public static async findAll() {
    return FetchService.get({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/exchangeRate`,
    });
  }

  public static async findOne(id: number) {
    return FetchService.get({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/exchangeRate/${id}`,
    });
  }

  public static async update(id: number, body: object) {
    return FetchService.put({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/exchangeRate/${id}`,
      body: body,
    });
  }
}

export default ExchangeRateApi;
