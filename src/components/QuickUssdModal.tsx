import React, { useState } from 'react';
import { SignalHigh, Check, RotateCcw, X, Smartphone } from 'lucide-react';
import { USSD_TREE, USSDNode } from '../utils/smsParser';

interface QuickUssdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickUssdModal: React.FC<QuickUssdModalProps> = ({ isOpen, onClose }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [keypadInput, setKeypadInput] = useState<string>('');
  const [sessionTrace, setSessionTrace] = useState<string[]>(['Dialed *123#']);

  if (!isOpen) return null;

  const currentNode: USSDNode = USSD_TREE[currentNodeId] || USSD_TREE.root;

  const handleKeypadPress = (val: string) => {
    setKeypadInput(prev => prev + val);
  };

  const handleSend = () => {
    const val = keypadInput.trim();
    if (!val) return;

    if (val === '00') {
      setCurrentNodeId('root');
      setSessionTrace(prev => [...prev, '-> Main Menu (00)']);
      setKeypadInput('');
      return;
    }

    if (val === '0') {
      setCurrentNodeId('root');
      setSessionTrace(prev => [...prev, '-> Back (0)']);
      setKeypadInput('');
      return;
    }

    const opt = currentNode.options?.find(o => o.key === val);
    if (opt) {
      setCurrentNodeId(opt.nextNodeId);
      setSessionTrace(prev => [...prev, `[${val}] ${opt.label}`]);
      setKeypadInput('');
    } else {
      setSessionTrace(prev => [...prev, `Invalid choice [${val}]`]);
      setKeypadInput('');
    }
  };

  const handleReset = () => {
    setCurrentNodeId('root');
    setKeypadInput('');
    setSessionTrace(['Session reset to *123#']);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-stone-900 border-4 border-stone-700 text-stone-100 rounded-[32px] max-w-[340px] w-full p-5 shadow-2xl space-y-3 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full bg-stone-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Earpiece */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
            <SignalHigh className="w-3.5 h-3.5 text-emerald-400" />
            <span>BSNL GSM</span>
          </div>
          <div className="w-12 h-1.5 bg-stone-700 rounded-full"></div>
          <div className="text-[11px] font-mono text-stone-400">100%</div>
        </div>

        {/* Green Dot-Matrix Screen */}
        <div className="bg-[#a3be8c]/20 border-2 border-emerald-900/60 rounded-xl p-3 font-mono text-emerald-300 shadow-inner min-h-[180px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-[10px] text-emerald-400/80 border-b border-emerald-500/20 pb-1 mb-2">
              <span className="font-bold">{currentNode.title}</span>
              <span>LIVE</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-emerald-200">
              {currentNode.screenText}
            </pre>
          </div>

          <div className="mt-2 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400">Input:</span>
            <span className="font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-100 min-w-[36px] text-center">
              {keypadInput || '_'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleSend}
            className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Send Choice</span>
          </button>
          <button
            onClick={handleReset}
            className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset *123#</span>
          </button>
        </div>

        {/* Numeric Keypad (44px touch targets) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((n) => (
            <button
              key={n}
              onClick={() => handleKeypadPress(n)}
              className="h-11 bg-stone-800 hover:bg-stone-700 active:bg-emerald-900/40 rounded-xl border border-stone-700 flex items-center justify-center text-stone-200 font-mono font-bold text-base transition-colors"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
