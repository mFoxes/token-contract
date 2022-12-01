const HDWalletProvider = require('@truffle/hdwallet-provider');
// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic and Infura project key below. Note: .env is ignored by git to keep your private information safe
require('dotenv').config();
// const mnemonic = process.env["MNEMONIC"];
const mnemonic = 'soup flock erase circle dentist zebra street test stove adapt random raw';
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

module.exports = {

    /**
     * contracts_build_directory tells Truffle where to store compiled contracts
     */
    contracts_build_directory: './build/contracts',

    /**
     * contracts_directory tells Truffle where the contracts you want to compile are located
     */
    contracts_directory: './contracts',


    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: "*", // Any network (default: none)
        },
        //polygon Infura mainnet
        polygon_matic: {
            provider: () => new HDWalletProvider({
                mnemonic: {
                    phrase: mnemonic
                },
                providerOrUrl: "https://polygon-mainnet.infura.io/v3/" + infuraProjectId
            }),
            network_id: 137,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
            chainId: 137
        },
        //polygon Infura testnet
        polygon_mumbai: {
            provider: () => new HDWalletProvider({
                mnemonic: {
                    phrase: mnemonic
                },
                providerOrUrl: "https://rpc-mumbai.maticvigil.com/"
            }),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
            chainId: 80001
        }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.17"
        }
    },
    db: {
        enabled: true
    },
    plugins: ['truffle-plugin-verify'],
    api_keys: {
        polygonscan: 'ACU2MDAZPGD995GQ6CPCAH5SSM9I2A4C7J'
    }
}