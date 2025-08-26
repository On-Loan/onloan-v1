// src/pages/dashboard/History.jsx (Implemented with event fetching for user history)
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/Web3Provider';
import { FaHistory } from 'react-icons/fa';  // Icon for history

const History = () => {
  const { contract, address } = useContext(Web3Context);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (contract && address) {
        // Fetch events: LoanCreated, RepaymentMade, etc. filtered by borrower/lender
        const loanCreatedFilter = contract.filters.LoanCreated(address);
        const loanCreatedEvents = await contract.queryFilter(loanCreatedFilter);

        const repaymentFilter = contract.filters.RepaymentMade(address);
        const repaymentEvents = await contract.queryFilter(repaymentFilter);

        const depositFilter = contract.filters.DepositToPool(address);
        const depositEvents = await contract.queryFilter(depositFilter);

        const withdrawalFilter = contract.filters.WithdrawalFromPool(address);
        const withdrawalEvents = await contract.queryFilter(withdrawalFilter);

        const liquidatedFilter = contract.filters.Liquidated(address);
        const liquidatedEvents = await contract.queryFilter(liquidatedFilter);

        // Combine and sort by timestamp (block)
        const allEvents = [
          ...loanCreatedEvents.map(e => ({ type: 'Loan Created', ...e.args, block: e.blockNumber })),
          ...repaymentEvents.map(e => ({ type: 'Repayment Made', ...e.args, block: e.blockNumber })),
          ...depositEvents.map(e => ({ type: 'Deposit to Pool', ...e.args, block: e.blockNumber })),
          ...withdrawalEvents.map(e => ({ type: 'Withdrawal from Pool', ...e.args, block: e.blockNumber })),
          ...liquidatedEvents.map(e => ({ type: 'Liquidated', ...e.args, block: e.blockNumber })),
        ].sort((a, b) => b.block - a.block);  // Newest first

        setHistory(allEvents);
      }
    };
    fetchHistory();
  }, [contract, address]);

  return (
    <div className="font-sans">  {/* Good font: sans-serif for clean look */}
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaHistory className="mr-2 text-lime" /> Transaction History
      </h1>
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-navy/50 border border-gray-300 dark:border-lime rounded-lg shadow">
            <thead>
              <tr className="bg-gray-200 dark:bg-navy text-left">
                <th className="p-4">Type</th>
                <th className="p-4">Amount (USDT)</th>
                <th className="p-4">Details</th>
                <th className="p-4">Block</th>
              </tr>
            </thead>
            <tbody>
              {history.map((event, index) => (
                <tr key={index} className="border-b dark:border-lime/50">
                  <td className="p-4">{event.type}</td>
                  <td className="p-4">{event.amount ? ethers.formatUnits(event.amount, 6) : 'N/A'}</td>
                  <td className="p-4">
                    {event.duration ? `Duration: ${event.duration / 86400} days` : ''}
                    {event.loanType !== undefined ? ` Type: ${['Personal', 'Home', 'Business', 'Auto'][event.loanType]}` : ''}
                  </td>
                  <td className="p-4">{event.block}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No transaction history yet.</p>
      )}
    </div>
  );
};

export default History;