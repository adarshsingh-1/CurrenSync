import { useState } from 'react';
import { InputBox } from './components/Index';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    const tempFrom = from;
    const tempTo = to;
    const tempAmount = amount;
    const tempConverted = convertedAmount;

    setFrom(tempTo);
    setTo(tempFrom);
    setAmount(tempConverted);
    setConvertedAmount(tempAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-[1400px] min-h-[70vh] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl">
        
        
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto">
          <img
            src="https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Currency"
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 lg:p-16 bg-white flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="w-full max-w-2xl space-y-8"
          >
            
            <InputBox
              label="From"
              amount={amount}
              currency={from}
              onAmountChange={(val) => setAmount(val)}
              onCurrencyChange={(val) => setFrom(val)}
              currencyOptions={options}
              isDisabled={false}
              selectCurrency={from} 
            />

            
            <div className="text-center">
              <button
                type="button"
                onClick={swap}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-lg"
              >
                Swap
              </button>
            </div>

            
            <InputBox
              label="To"
              amount={convertedAmount}
              currency={to}
              onAmountChange={() => {}}
              onCurrencyChange={(val) => setTo(val)}
              currencyOptions={options}
              isDisabled={true}
              selectCurrency={to}
            />

            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg font-medium px-4 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;