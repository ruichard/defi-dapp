import React, { useEffect, useState } from 'react';
import { fetchAllMarketSummaries, AllMarketSummariesResponse, RPC_URL_OP, perpsV2MarketDataAddress } from '../contracts/ethersService';
import { ethers } from "ethers";
import { Table, Th, Td } from './PerpsMarketStyled';

const PerpsMarket: React.FC = () => {
    const [markets, setMarkets] = useState<AllMarketSummariesResponse>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function getAllMarketSummaries() {
        try {
            const res = await fetchAllMarketSummaries(RPC_URL_OP, perpsV2MarketDataAddress);
            const sortedMarkets = [...res].sort((a, b) =>
                parseFloat(ethers.utils.formatUnits(b.marketSize, 'ether')) -
                parseFloat(ethers.utils.formatUnits(a.marketSize, 'ether'))
            );
            setMarkets(sortedMarkets);
        } catch (error) {
            console.error("Failed to fetch market summaries:", error);
        } finally {
            setIsLoading(false); // 加载完成
        }
    }
    
    useEffect(() => {
        getAllMarketSummaries();
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <Th>MARKET</Th>
                            <Th>PRICE</Th>
                            <Th>MARKET SIZE</Th>
                            <Th>MAKER / TAKER</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets.map((market, index) => (
                            <tr key={index}>
                                <Td>{ethers.utils.parseBytes32String(market.asset)}</Td>
                                <Td>${ethers.utils.formatUnits(market.price, 'ether')}</Td>
                                <Td>${parseFloat(ethers.utils.formatUnits(market.marketSize, 'ether')).toLocaleString()}</Td>
                                <Td>{ethers.utils.formatUnits(market.feeRates.makerFeeOffchainDelayedOrder, 'ether')}%/{ethers.utils.formatUnits(market.feeRates.takerFeeOffchainDelayedOrder, 'ether')}%</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
    
};

export default PerpsMarket;