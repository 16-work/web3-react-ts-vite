import { getWalletConnectConnector, Wallet } from "@rainbow-me/rainbowkit"
import { createConnector } from "wagmi"
import { injected } from "wagmi/connectors"
import { isInBinance } from "@binance/w3w-utils"

export interface MyWalletOptions {
  projectId: string
}

function getExplicitInjectedProvider(flag: any) {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return
  const providers = window.ethereum.providers
  return providers
    ? providers.find((provider: any) => provider[flag])
    : window.ethereum[flag]
      ? window.ethereum
      : void 0
}
function getWindowProviderNamespace(namespace: any) {
  // @ts-ignore
  const providerSearch = (provider: any, namespace2: any) => {
    const [property, ...path] = namespace2.split(".")
    const _provider = provider[property]
    if (_provider) {
      if (path.length === 0) return _provider
      return providerSearch(_provider, path.join("."))
    }
  }
  if (typeof window !== "undefined") return providerSearch(window, namespace)
}
// @ts-ignore
function hasInjectedProvider({ flag, namespace }) {
  if (namespace && typeof getWindowProviderNamespace(namespace) !== "undefined")
    return true
  if (flag && typeof getExplicitInjectedProvider(flag) !== "undefined")
    return true
  return false
}
// @ts-ignore
function getInjectedProvider({ flag, namespace }) {
  var _a
  if (typeof window === "undefined") return
  if (namespace) {
    const windowProvider = getWindowProviderNamespace(namespace)
    if (windowProvider) return windowProvider
  }
  const providers = (_a = window.ethereum) == null ? void 0 : _a.providers
  if (flag) {
    const provider = getExplicitInjectedProvider(flag)
    if (provider) return provider
  }
  if (typeof providers !== "undefined" && providers.length > 0)
    return providers[0]
  return window.ethereum
}
function createInjectedConnector(provider: any) {
  // @ts-ignore
  return walletDetails => {
    const injectedConfig = provider
      ? {
          target: () => ({
            id: walletDetails.rkDetails.id,
            name: walletDetails.rkDetails.name,
            provider,
          }),
        }
      : {}
    return createConnector((config: any) => ({
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }))
  }
}
// @ts-ignore
function getInjectedConnector({ flag, namespace, target }) {
  const provider = target ? target : getInjectedProvider({ flag, namespace })
  return createInjectedConnector(provider)
}

export { hasInjectedProvider, getInjectedConnector }

export const BinanceWallet = ({
  projectId,
  walletConnectParameters,
}: any): Wallet => {
  const shouldUseWalletConnect = !isInBinance()
  return {
    id: "binance",
    name: "Binance Web3 Wallet",

    iconUrl: async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjMUUxRTFFIiBkPSJNMCAwaDI1NnYyNTZIMHoiLz48cGF0aCBkPSJtNzMuMTgzMyAxMjguMDI4LTIyLjU2MzIgMjIuNTY0TDI4IDEyOC4wMjhsMjIuNTYzMi0yMi41NjMgMjIuNjIwMSAyMi41NjNabTU0Ljg0NDctNTQuODQ0NyAzOC43MDUgMzguNzAzNyAyMi41NjMtMjIuNTYyOEwxMjguMDI4IDI4IDY2LjcwNDIgODkuMzI0MmwyMi41NjMyIDIyLjU2MjggMzguNzYwNi0zOC43MDM3Wm03Ny40MDkgMzIuMjgxNy0yMi41NjMgMjIuNTYzIDIyLjU2MyAyMi41NjRMMjI4IDEyOC4wMjhsLTIyLjU2My0yMi41NjNabS03Ny40MDkgNzcuNDA5LTM4LjcwMzgtMzguNzA1LTIyLjU2MzIgMjIuNTY0IDYxLjI2NyA2MS4zMjQgNjEuMjY4LTYxLjMyNC0yMi41NjMtMjIuNTY0LTM4LjcwNSAzOC43MDVabTAtMzIuMjgyIDIyLjU2NC0yMi41NjQtMjIuNTY0LTIyLjU2My0yMi42MiAyMi41NjMgMjIuNjIgMjIuNTY0WiIgZmlsbD0iI0YwQjkwQiIvPjwvc3ZnPgo="
    },

    iconAccent: "#1E1E1E",
    iconBackground: "#1E1E1E",
    installed: isInBinance() || undefined,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.binance.dev",
      ios: "https://apps.apple.com/us/app/binance-buy-bitcoin-crypto/id1436799971",
      mobile: "https://www.binance.com/en/download",
      qrCode: "https://www.binance.com/en/download",
    },
    mobile: {
      getUri: (uri: string) => uri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl:
          "https://www.binance.com/en/blog/markets/introducing-binance-web3-wallet-5931309459106555347",
        steps: [
          {
            description:
              "Log in to your Binance app and tap [Wallets]. Go to [Web3].",
            step: "install",
            title: "Open Binance app",
          },
          {
            description: "Tap [Create Wallet] to start using your Web3 Wallet.",
            step: "create",
            title: "Create or Import a Wallet",
          },
          {
            description:
              "After you scan, a connection prompt will appear for you to connect your wallet.",
            step: "scan",
            title: "Tap the scan button",
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl:
          "https://www.binance.com/en/blog/markets/introducing-binance-web3-wallet-5931309459106555347",
        steps: [
          {
            description:
              "Log in to your Binance app and tap [Wallets]. Go to [Web3].",
            step: "install",
            title: "Open Binance app",
          },
          {
            description: "Tap [Create Wallet] to start using your Web3 Wallet.",
            step: "create",
            title: "Create or Import a Wallet",
          },
          {
            description:
              "After you scan, a connection prompt will appear for you to connect your wallet.",
            step: "scan",
            title: "Tap the scan button",
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : //@ts-ignore
        getInjectedConnector({
          target:
            typeof window !== "undefined"
              ? window.ethereum?.providers?.find(window.ethereum.isBinance) ??
                window.ethereum
              : undefined,
        }),
  }
}
