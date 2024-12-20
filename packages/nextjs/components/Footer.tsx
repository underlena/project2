import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "./SwitchTheme";
import { BuidlGuidlLogo } from "./assets/BuidlGuidlLogo";
import { Faucet } from "./scaffold-eth/Faucet";
import { useTargetNetwork } from "./../hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "./../services/store/store";

export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          {nativeCurrencyPrice > 0 && (
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-6 w-6" />
              <span>{nativeCurrencyPrice.toFixed(2)}</span>
            </div>
          )}
          {isLocalNetwork && (
            <>
              <Faucet />
              <Link href="/blockexplorer" passHref className="flex items-center space-x-2">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <span>Block Explorer</span>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <SwitchTheme />
          <a href="https://github.com/scaffold-eth/se-2" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
            Fork me
          </a>
          <span>·</span>
          <div className="flex items-center space-x-2">
            <p className="text-gray-300">
              Built with <HeartIcon className="inline-block h-4 w-4" /> at
            </p>
            <a
              className="flex items-center space-x-1"
              href="https://buidlguidl.com/"
              target="_blank"
              rel="noreferrer"
            >
              <BuidlGuidlLogo className="w-3 h-5 pb-1" />
              <span className="text-gray-300 hover:text-white">BuidlGuidl</span>
            </a>
          </div>
          <span>·</span>
          <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};