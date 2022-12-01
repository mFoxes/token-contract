import React, { useEffect, useState } from 'react'
import contractABI from '../../contracts/Token.json';

import Web3 from 'web3';
import { Link } from "react-router-dom";
import './header.scss';
import { Context } from '../..';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import BigNumber from "bignumber.js";

export const Header = observer(() => {
	const { generalStore } = useContext(Context);
    const [value, setValue] = useState('');

    const initOwner = async () => {
        const posts = await getPastEvents({event: "OwnershipTransferred", fromBlock: 29419940, chunkLimit: 998 })
        generalStore.setOwner(posts.events[posts.events.length - 1].returnValues.newOwner);
		console.log('posts', posts);
    }

    const getPastEvents = async ({
		event,
		fromBlock,
		toBlock = "latest",
		chunkLimit = 0,
	  }) => {
		try {	
		  const fromBlockNumber = +fromBlock
		  const toBlockNumber =
			toBlock === "latest" ? +(await generalStore.web3.eth.getBlockNumber()) : +toBlock
		  const totalBlocks = toBlockNumber - fromBlockNumber
		  const chunks = []
	
		  if (chunkLimit > 0 && totalBlocks > chunkLimit) {
			const count = Math.ceil(totalBlocks / chunkLimit)
			let startingBlock = fromBlockNumber
	
			for (let index = 0; index < count; index++) {
			  const fromRangeBlock = startingBlock
			  const toRangeBlock =
				index === count - 1 ? toBlockNumber : startingBlock + chunkLimit
			  startingBlock = toRangeBlock + 1
	
			  chunks.push({ fromBlock: fromRangeBlock, toBlock: toRangeBlock })
			}
		  } else {
			chunks.push({ fromBlock: fromBlockNumber, toBlock: toBlockNumber })
		  }
	
		  const events = []
		  const errors = []
		  for (const chunk of chunks) {
			await generalStore.contract.getPastEvents(
			  event,
			  {
				filter: {
				},
				fromBlock: chunk.fromBlock,
				toBlock: chunk.toBlock
			  },
			  async function (error, chunkEvents) {
				if (chunkEvents?.length > 0) {
				  events.push(...chunkEvents)
				}
	
				if (error) errors.push(error)
			  }
			)
		  }
	
		  return { events, errors, lastBlock: toBlockNumber }
		} catch (error) {
		  return { events: [], errors: [error], lastBlock: null }
		}
	  }

    const navigateLink = [{
        name: 'Transfer',
        to: '/transfer',
        owner: false
    },{
        name: 'Mint',
        to: '/mint',
        owner: true,
    }];

    const handleConnect = async () => {
		const web3 = new Web3(window.ethereum);
		const [address] = await window.ethereum.enable();
		generalStore.setAccount(address);
		generalStore.setWeb3(web3);
		const contract = new web3.eth.Contract(contractABI, '0x57187A960860c0bb58E0Ec0CB9cC536Ef4A47000', {from: address});
        const balance = await contract.methods.balanceOf(address).call({from: address});
        generalStore.setBalance(balance);
		generalStore.setContract(contract);
        initOwner();
	};

    const addToken = () => {
        window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: '0x57187A960860c0bb58E0Ec0CB9cC536Ef4A47000',
                symbol: 'ART',
                decimals: 18,
                image: 'https://www.svgrepo.com/show/323093/rat.svg',
              },
            },
          })
            .then((success) => {
              if (success) {
                console.log('FOO successfully added to wallet!')
              } else {
                throw new Error('Something went wrong.')
              }
            })
            .catch(console.error)
    }

    useEffect(() => {
        console.log('generalStore.balance', generalStore.balance);
        if (generalStore.balance) {
            const temp = generalStore.balance.toString().split('');
            temp[temp.length - 18] = ',' + temp[temp.length - 18];
            setValue(temp.join(''));
        }
    }, [generalStore.balance])

    return (
    <div className="header">
        <div className='header__container'>
            <div className="header__links">
                {navigateLink.map((item) => {
                    if (item.owner) {
                        if (generalStore.account === generalStore.owner) {
                            return generalStore.account && <Link to={item.to} key={item.to}>{item.name}</Link>
                        }
                    } else {
                        return generalStore.account && <Link to={item.to} key={item.to}>{item.name}</Link>
                    }
                })}
            </div>
            {generalStore.account && <button onClick={addToken}>Добавить токен</button>}
            <div className="header__account">
                {
                    generalStore.account ? 
                    <>
                        balance: {value} {' '}
                        account: {generalStore.account}
                    </> 
                        :
				    <button onClick={handleConnect}>Connect</button>
                }
            </div>
        </div>
    </div>
  )
})
