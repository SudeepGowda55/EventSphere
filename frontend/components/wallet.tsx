"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

function WalletConnect() {
  return (
    <>
      <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
        <header className="pt-4 pr-4">
          <div className="flex justify-end">
            <div className="wallet-container">
              <Wallet>
                <ConnectWallet>
                  <Avatar className="h-6 w-6" />
                  <Name />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownLink
                    icon="wallet"
                    href="https://keys.coinbase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wallet
                  </WalletDropdownLink>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
        </header>
        <div>Main page</div>
      </div>

      {/* <main>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p>
                Head to{" "}
                <a
                  href="/api/dev"
                  style={{ display: "inline", fontWeight: "semibold" }}
                >
                  <code>localhost:3000/api</code>
                </a>{" "}
                for your frame endpoint.
              </p>
            </div>
          </div>
        </main> */}
    </>
  );
}
export default WalletConnect;
