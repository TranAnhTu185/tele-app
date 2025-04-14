"use client";
import type React from "react";
import Navbar from "../navbar/page";
import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "@ton/core";

const WalletPage: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
        setIsLoading(false);
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log("Wallet disconnected successfully!");
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account?.address);
            } else {
                handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            } else {
                handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true);
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    const formatAddress = (address: string) => {
        const tempAddress = Address.parse(address).toString();
        return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
    };

    const sentTon = async () => {
        try {
            await tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                    {
                        address: '0QBngP-cJUrnfAjKYd4rOuBeYCO7VXdyv0c_h40GO6zRzuCH', // địa chỉ nhận
                        amount: '100000000', // 0.1 TON = 100M nanoTON
                        payload: '', // nếu cần, dùng base64 payload
                    },
                ],
            })
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
                    Loading...
                </div>
            </main>
        );
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">TON Connect</h1>
            {tonWalletAddress ? (
                <div className="flex flex-col items-center">
                    <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
                    <button
                        onClick={handleWalletAction}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Disconnect Wallet
                    </button>
                    <button
                        onClick={sentTon}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Sent Ton
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleWalletAction}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Connect TON Wallet
                </button>
            )}



            <Navbar />
        </main>
    );
};

export default WalletPage;
