const FACTORY = "0x0223F69c7742C6a31424D7aF9B3b7667c6b9797F";
const GOV_TOKEN = "0xf3bCBe4ee118ECC57c17820a2F03f46A750aB319";

const factoryAbi = [
  {
    name: "getCountries",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view",
  },
  {
    name: "getTotalStaked",
    type: "function",
    inputs: [{ name: "country", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
];

async function tvl(api) {
  const countries = await api.call({
    target: FACTORY,
    abi: factoryAbi[0],
  });

  for (const country of countries) {
    const totalStaked = await api.call({
      target: FACTORY,
      abi: factoryAbi[1],
      params: [country],
    });

    api.add(GOV_TOKEN, totalStaked);
  }
}

module.exports = {
  base: {
    tvl,
    methodology:
      "TVL is the sum of NationWars governance tokens staked in every live Country vault. The adapter reads the full country list from CountryFactory.getCountries() and adds each country's on-chain totalStaked balance.",
    timetravel: true,
  },
};
