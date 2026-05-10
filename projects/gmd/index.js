const abi = 'uint256:totalUSDvaults';

const arbitrum_vault = "0xA7Ce4434A29549864a46fcE8662fD671c06BA49a";
const arbitrum_vault2 = "0x8080B5cE6dfb49a6B86370d6982B3e2A86FBBb08";
const arbitrum_gmdbfr_vault = "0x56009e94418ddfe8604331eceff38db0738775f8";

const avax_vault = "0x5517c5F22177BcF7b320A2A5daF2334344eFb38C"

module.exports = {
  misrepresentedTokens: true,
  methodology: 'TVL is calculated as the USD value reported by GMD vault contracts.',
  arbitrum: {
    tvl
  },
  avax: {
    tvl
  },
};

const config = {
  avax: [avax_vault],
  arbitrum: [arbitrum_vault, arbitrum_vault2, arbitrum_gmdbfr_vault],
}

async function tvl(api) {
  const vaults = config[api.chain]
  const bals = (await api.multiCall({  abi , calls: vaults })).map(i=>i/1e18).reduce((a,b)=>a+b,0)
  api.addUSDValue(bals)
}
