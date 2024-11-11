import React, { useCallback, useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'QEWRTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, charAllowed, numberAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow overflow-hidden mb-4 rounded-lg'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{copied ? <div><FaCheck /></div> : "Copy!"}
          </button>
        </div>
        <div className='flex div1 text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
            <label>Length: {length}</label>
          </div>
          <div className='flex div2 items-center gap-x-1'>
            <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
            <label>Numbers</label>
          </div>
          <div className='flex div2 items-center gap-x-1'>
            <input type="checkbox" checked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
