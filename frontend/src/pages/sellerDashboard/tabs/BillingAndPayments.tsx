import { useCallback, useRef, useEffect, useState } from "react";
import AnimatedLoadWrapper from "@/components/wrappers/AnimatedLoadWrapper";
import ConnectToWallet from "../main-components/ConnectToWallet";
import { useUpdateWalletAddressMutation } from "@/hooks/apiMutations";
import { useGetWalletAddress } from "@/hooks/apiQueries";
import { useWallet } from "@solana/wallet-adapter-react";
import { errorToast } from "@/components/ui/customToast";
import { tryCatch } from "@/utils/tryCatch.util";

interface BillingAndPaymentsTabProps {
  logout?: () => Promise<void>;
}

export default function BillingAndPaymentsTab({
  logout,
}: BillingAndPaymentsTabProps) {
  const pendingOperation = useRef(false);
  const hasInitialized = useRef(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const { publicKey, connected, disconnect } = useWallet();

  const {
    data: walletData,
    isLoading: existingAddressLoading,
    isError: existingAddressError,
  } = useGetWalletAddress({ logout });

  const { mutateAsync: updateWalletAddressMutate, isPending: isUpdating } =
    useUpdateWalletAddressMutation({
      logout,
    });

  const existingAddress = walletData?.data?.wallet_address || null;

  useEffect(() => {
    if (!existingAddressLoading && walletData && !hasInitialized.current) {
      hasInitialized.current = true;

      // Only need cleanup if: no stored address BUT wallet is connected (silent connection)
      const needsCleanup = !existingAddress && connected && publicKey;
      
      if (needsCleanup) {
        setIsInitializing(true);
        
        const cleanupSilentConnection = async () => {
          const [, error] = await tryCatch(() => disconnect());
          if (error) {
            console.error("Error disconnecting silently connected wallet:", error);
            errorToast("Error disconnecting silently connected wallet. Refresh the page.");
          }
          setTimeout(() => {
            setIsInitializing(false);
          }, 500);
        };

        cleanupSilentConnection();
      } else {
        setIsInitializing(false);
      }

      return () => {
        setIsInitializing(false);
      };
    }
  }, [
    existingAddressLoading,
    walletData,
    disconnect,
    connected,
    publicKey,
    existingAddress,
  ]);

  const handleWalletConnect = useCallback(
    async (address: string, signature: string, message: string) => {
      if (isInitializing || pendingOperation.current) return;
      if (existingAddressLoading || isUpdating) return;
      if (address === existingAddress) return;

      pendingOperation.current = true;
      const [, error] = await tryCatch(() =>
        updateWalletAddressMutate({ address, signature, message })
      );

      setTimeout(() => {
        pendingOperation.current = false;
      }, 500);

      if (error) throw error;
    },
    [
      existingAddressLoading,
      isUpdating,
      existingAddress,
      updateWalletAddressMutate,
      isInitializing,
    ]
  );

  const handleWalletDisconnect = useCallback(async () => {
    if (isInitializing || pendingOperation.current) return;
    if (existingAddressLoading || isUpdating) return;
    if (!existingAddress) return;

    pendingOperation.current = true;
    const [, error] = await tryCatch(() => updateWalletAddressMutate(""));

    setTimeout(() => {
      pendingOperation.current = false;
    }, 500);

    if (error) throw error;
  }, [
    existingAddressLoading,
    isUpdating,
    existingAddress,
    updateWalletAddressMutate,
    isInitializing,
  ]);

  const isLoading = existingAddressLoading || isUpdating || isInitializing;

  return (
    <AnimatedLoadWrapper>
      <div className="space-y-6 mt-6 lg:mt-0 md:mt-0">
        <h1 className="text-4xl text-center md:text-left lg:text-left font-bold mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
          Wallet Connection
        </h1>
        <ConnectToWallet
          walletAddress={existingAddress}
          isLoading={isLoading}
          isError={existingAddressError}
          onWalletConnect={handleWalletConnect}
          onWalletDisconnect={handleWalletDisconnect}
        />
      </div>
    </AnimatedLoadWrapper>
  );
}
