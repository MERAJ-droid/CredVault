const hre = require("hardhat");

async function main() {
  const contractAddress = "0xd6d9e9aC375233Ab9EE35c64Dfc02f33cF4bd792";
  const Contract = await hre.ethers.getContractFactory("CredNFT");
  const contract = await Contract.attach(contractAddress);

  // Mint NFT
  const recipientAddress = "0x55b324A0E932a8e295C675Cb11422329Ce31C977";
  const tokenURI = "ipfs://your-metadata-uri";
  
  const tx = await contract.mintNFT(recipientAddress, tokenURI);
  await tx.wait();
  
  console.log("NFT minted successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
