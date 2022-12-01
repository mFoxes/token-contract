import { useEffect, useState } from 'react';
import './mint.scss'

import { useContext } from 'react';
import { Context } from '../..';
import { history } from '../../history/history';

export const Mint = () => {
    const { generalStore } = useContext(Context);

    const [addressTo, setAddressTo] = useState('');
    const [amount, setAmount] = useState(0);

    
	const handleMint =  async () => {
		await generalStore.contract.methods.mint(addressTo, amount).send({from: generalStore.account});
	}


    useEffect(() => {
        if (!generalStore.account) {
            history.push('/');
        }
    }, [])

    useEffect(() => {
        if (generalStore.owner !== generalStore.account) {
            history.push('/');
        }
    }, [generalStore.owner])
    

  return (
    <div className='mint'>
        <div className="mint__container">
            <button onClick={handleMint}>Mint</button>
            <form className="mint__form">
                <input type="text" value={addressTo} onChange={(event) => {
                    setAddressTo(event.target.value)
                }} placeholder='Адресс...'/>
                <input type="text" value={amount} onChange={(event) => {
                    setAmount(event.target.value)
                }} placeholder='Сумма...'/>
            </form>
        </div>
    </div>
  )
}
