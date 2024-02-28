import { ethers } from "ethers";
import PerpsV2MarketDataABI from "./abis/PerpsV2MarketData.json";

const apiKey = process.env.ALCHEMY_API_KEY;
export const RPC_URL_OP = `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`;
export const perpsV2MarketDataAddress = "0x340B5d664834113735730Ad4aFb3760219Ad9112";

export interface FeeRates {
  takerFee: string;
  makerFee: string;
  takerFeeDelayedOrder: string;
  makerFeeDelayedOrder: string;
  takerFeeOffchainDelayedOrder: string;
  makerFeeOffchainDelayedOrder: string;
}

export interface MarketSummary {
  market: string;
  asset: string;
  key: string;
  maxLeverage: string;
  price: string;
  marketSize: string;
  marketSkew: string;
  marketDebt: string;
  currentFundingRate: string;
  currentFundingVelocity: string;
  feeRates: FeeRates;
}

export type AllMarketSummariesResponse = MarketSummary[];

export async function fetchAllMarketSummaries(rpcUrl: string, contractAddress: string): Promise<AllMarketSummariesResponse> {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, PerpsV2MarketDataABI, provider);
    return await contract.allProxiedMarketSummaries();
}
