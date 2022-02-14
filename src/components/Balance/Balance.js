import s from './Balance.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { addBalanceThunk, getBalanceThunk } from '../../redux/balance/thunk';
import { getBalance } from '../../redux/balance/selectors';
import { Notification } from '../Notification/Notification';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Report from '../Report/Report';

export default function Balance({ showBtn = true }) {
  const [value, setValue] = useState('00.00');
  const [readonly, setReadonly] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const balanceString = useSelector(getBalance);
  const balance = Number(balanceString);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBalanceThunk());
  }, []);

  useEffect(() => {
    if (!showBtn) {
      setReadonly(true);
    }
    if (balance > 0) {
      setReadonly('readonly');
    }
  }, [showBtn, balance]);

  useEffect(() => {
    const balanceFix = `${parseFloat(balance).toFixed(2)}`;
    if (balanceFix) setValue(balanceFix);
  }, [balance]);

  const сhangeBalance = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handleBalance = () => {
    dispatch(addBalanceThunk(value));

    setReadonly('readonly');
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className={s.container}>
        <Report />
        <div className={s.containerBalance}>
          <span className={s.text}>Баланс:</span>
          <div className={s.containerInput}>
            <div className={s.containerRelative}>
              <input
                className={s.balanceInput}
                value={value}
                onChange={сhangeBalance}
                readOnly={readonly}
                type="text"
                pattern="^[ 0-9]+$"
              />
              <span className={s.span}>UAH</span>
              {!balance && <Notification />}
            </div>
            {readonly && showBtn && (
              <button
                className={s.editBtn}
                type="button"
                onClick={() => setReadonly(null)}
              >
                <EditOutlinedIcon className={s.iconEdit} />
              </button>
            )}
            {!!readonly ||
              (!!showBtn && (
                <button
                  className={s.confirmBtn}
                  type="button"
                  onClick={toggleModal}
                >
                  Підтвердити
                </button>
              ))}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal text={'Ви впевнені?'} toggleModal={toggleModal}>
          <Button type="button" text="так" onClick={handleBalance} />
        </Modal>
      )}
    </>
  );
}
