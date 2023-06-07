import FetchService from "./FetchService";
import { IOrderBy } from "@/interfaces/IOrderBy";

class WalletApi {
  public static async findAll(orderParams: IOrderBy) {
    const { orderBy, order } = orderParams;
    let queryParams = "";

    if (orderBy && order) {
      queryParams = `?orderBy=${orderBy}&order=${order}`;
    }
    return FetchService.get({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/wallet${
        queryParams && queryParams
      }`,
    });
  }

  public static async addToFavourite(address: string, body: object) {
    return FetchService.put({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/wallet/${address}`,
      body: body,
    });
  }

  public static async create(body: object) {
    return FetchService.post({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/wallet`,
      body: body,
    });
  }

  public static async delete(address: string) {
    return FetchService.delete({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/wallet/${address}`,
    });
  }

  public static async getBalanceCurrency(address: string, rate: number) {
    return FetchService.get({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/wallet/${address}/balance/${rate}`,
    });
  }

  public static async isOldWallet(address: string) {
    return FetchService.get({
      url: `${process.env.NEXT_PUBLIC_HOST_SERVICES}/wallet/${address}/isOldWallet`,
    });
  }
}

export default WalletApi;
