import { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Context } from '../..';
import { history } from '../../history/history';
import './transfer.scss';
export const Transfer = () => {
    const [addressTo, setAddressTo] = useState('');
    const [amount, setAmount] = useState(0);

    const { generalStore } = useContext(Context);

	const handleTransfer =  async () => {
		await generalStore.contract.methods.transfer(addressTo, (amount * 10 ** 18).toExponential()).send({from: generalStore.account});
	}

    useEffect(() => {
        if (!generalStore.account) {
            history.push('/');
        }
    }, [])
    

    return (
        <div className='transfer'>
            <div className="transfer__container">
                <button onClick={handleTransfer}>Transfer</button>
                <form className="transfer__form">
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
