export interface IWallet {
  id: number;
  address: string;
  privatekey?: string;
  favourite: boolean;
}
