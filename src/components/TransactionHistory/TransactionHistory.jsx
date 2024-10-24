import s from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => {
  const transactionTableRow = items.map(({ id, type, amount, currency }) => (
    <tr className={s.tableRow} key={id}>
      <td>{type}</td>
      <td>{amount}</td>
      <td>{currency}</td>
    </tr>
  ));
  return (
    <table className={s.tableTransaction}>
      <thead className={s.headTable}>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Currency</th>
        </tr>
      </thead>
      <tbody>{transactionTableRow}</tbody>
    </table>
  );
};

export default TransactionHistory;
