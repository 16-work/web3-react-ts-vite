import { WAGMI_CONFIG } from '@/constants/wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';

/** Constants */
const queryClient = new QueryClient();
const theme = { accentColor: 'rgb(var(--cus-primary-1))' }; // 主题

/** Component */
export const WalletProvider = (props: { children: ReactNode }) => {
  /** Template */
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" theme={store.global().theme.search('light') ? lightTheme(theme) : darkTheme(theme)} coolMode>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
