"use client";
import type React from "react";
import Image from "next/image";
import Navbar from "../navbar/page";
import { useEffect, useState } from "react";
import { dataStatic } from "../utils/common";

const PVPPage: React.FC = () => {
	return (
		<div className="flex flex-col items-center">
			<StatisticPage />
			<Navbar />
		</div>
	);
};



function StatisticPage() {
	const [datalist, setDataList] = useState<dataStatic[] | []>([]);
	useEffect(() => {
		const fetchData = async () => {
			const stored = localStorage.getItem('token');
			if (stored !== null && stored !== undefined) {
				try {
					const responListMon = await fetch('https://ton-war.bytebuffer.co/honor?type=1', {
						method: 'GET',
						headers: {
							'Authorization': JSON.parse(stored),
						},
					})

					if (responListMon.ok) {
						const dataTest = await responListMon.json();
						console.log(dataTest);
						setDataList(dataTest.rows);
					}
				} catch (error) {
					console.error('GET failed:', error);
				}
			} else {
				console.error("no token");
			}
		};

		fetchData();
	}, [])
	return (
		<div className="p-3 min-h-[500px] mt-[80px] w-full relative top-[10px]">
			<div className="flex justify-between items-center">
				<div className="mr-3">
					<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M23.25 1.65C23.25 1.21275 23.076 0.792751 22.767 0.483001C22.4573 0.174001 22.0373 0 21.6 0C21.2205 0 20.7795 0 20.4 0C19.9627 0 19.5427 0.174001 19.233 0.483001C18.924 0.792751 18.75 1.21275 18.75 1.65V16.35C18.75 16.7873 18.924 17.2073 19.233 17.517C19.5427 17.826 19.9627 18 20.4 18H21.6C22.0373 18 22.4573 17.826 22.767 17.517C23.076 17.2073 23.25 16.7873 23.25 16.35V1.65Z" fill="#96DC68" />
						<path fillRule="evenodd" clipRule="evenodd" d="M5.25 12.15C5.25 11.7127 5.076 11.2927 4.767 10.983C4.45725 10.674 4.03725 10.5 3.6 10.5C3.2205 10.5 2.7795 10.5 2.4 10.5C1.96275 10.5 1.54275 10.674 1.233 10.983C0.924001 11.2927 0.75 11.7127 0.75 12.15V16.35C0.75 16.7873 0.924001 17.2073 1.233 17.517C1.54275 17.826 1.96275 18 2.4 18H3.6C4.03725 18 4.45725 17.826 4.767 17.517C5.076 17.2073 5.25 16.7873 5.25 16.35V12.15Z" fill="#96DC68" />
						<path fillRule="evenodd" clipRule="evenodd" d="M17.25 9.15C17.25 8.71275 17.076 8.29275 16.767 7.983C16.4573 7.674 16.0373 7.5 15.6 7.5C15.2205 7.5 14.7795 7.5 14.4 7.5C13.9627 7.5 13.5427 7.674 13.233 7.983C12.924 8.29275 12.75 8.71275 12.75 9.15V16.35C12.75 16.7873 12.924 17.2073 13.233 17.517C13.5427 17.826 13.9627 18 14.4 18H15.6C16.0373 18 16.4573 17.826 16.767 17.517C17.076 17.2073 17.25 16.7873 17.25 16.35V9.15Z" fill="#96DC68" />
						<path fillRule="evenodd" clipRule="evenodd" d="M11.25 6.15C11.25 5.23875 10.5112 4.5 9.6 4.5C9.2205 4.5 8.7795 4.5 8.4 4.5C7.48875 4.5 6.75 5.23875 6.75 6.15V16.35C6.75 17.2613 7.48875 18 8.4 18H9.6C10.5112 18 11.25 17.2613 11.25 16.35V6.15Z" fill="#96DC68" />
					</svg>
				</div>
				<div className="flex-1 text-lg font-semibold text-left">Statistics</div>
			</div>
			<div className="mt-[16px] mb-[10px]">
				<div className="bg-[url('../../public/bg-thbg.svg')] bg-cover max-w-[390px] mx-auto grid grid-cols-3 gap-4 py-[9px] mb-[12px]">
					<div className="text-[16px] text-white text-left">User</div>
					<div className="text-[16px] text-white text-center">Egg</div>
					<div className="text-[16px] text-white text-right">Profit/day</div>
				</div>
				<div className="max-h-[100vh] overflow-y-auto pb-[120px]">
					{datalist.map(item => (
						<div className="max-w-[390px] mx-auto grid grid-cols-3 gap-4 py-[12px] mb-[12px]" key={item.user_id}>
							<div className="text-xs text-white text-left">{item.username}</div>
							<div className="text-xs text-white text-center flex items-center justify-center">+1
								<div className="ml-3">
									<Image
										src={item.avatar}
										alt=""
										className="w-[24px] h-[24px] mx-auto"
									/>
								</div>
							</div>
							<div className="text-xs text-[#7cce00] text-right">{item.profit} TON</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default PVPPage;
