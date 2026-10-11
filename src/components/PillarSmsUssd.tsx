import React, { useState } from 'react';
import { 
  Smartphone, 
  Send, 
  RotateCcw, 
  Hash, 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  HelpCircle,
  MessageSquare,
  SignalHigh
} from 'lucide-react';
import { parseIncomingSMS, USSD_TREE, USSDNode } from '../utils/smsParser';
import { SMSCommandResult, LanguageMode } from '../types';

interface PillarSmsUssdProps {
  lang: LanguageMode;
}

export const PillarSmsUssd: React.FC<PillarSmsUssdProps> = ({ lang }) => {
  // Mode: 'ussd' | 'sms'
  const [activeSubMode, setActiveSubMode] = useState<'ussd' | 'sms'>('ussd');

  // USSD Session state
  const [ussdInput, setUssdInput] = useState('*123#');
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [ussdSessionActive, setUssdSessionActive] = useState<boolean>(true);
  const [ussdHistory, setUssdHistory] = useState<string[]>(['Dialed *123#']);
  const [dialerKeypadInput, setDialerKeypadInput] = useState<string>('');

  // SMS Parser state
  const [smsInput, setSmsInput] = useState('MANDI WHEAT DEWAS');
  const [smsResult, setSmsResult] = useState<SMSCommandResult>(() => parseIncomingSMS('MANDI WHEAT DEWAS'));
  const [smsLog, setSmsLog] = useState<{ id: string; time: string; sender: string; msg: string; reply: string }[]>([
    {
      id: 'log-1',
      time: '08:42 AM',
      sender: '+91 98261••••• (Mukesh)',
      msg: 'MANDI WHEAT DEWAS',
      reply: '[GramSetu] [LIVE-VERIFIED] Wheat at Dewas APMC: Modal ₹3,120/qtl (Min: ₹2,850, Max: ₹3,380). Updated: Today, 08:35 AM.'
    },
    {
      id: 'log-2',
      time: '07:30 AM',
      sender: '+91 94250••••• (Bhanwar)',
      msg: 'MAUSAM SEHORE',
      reply: '[GramSetu] ⚠️ ALERT: Sehore & Hoshangabad Belt: 28°C, Rain chance 65%, Wind 24km/h. Hold off on foliar spray application.'
    }
  ]);
  const [copiedReply, setCopiedReply] = useState(false);

  const currentNode: USSDNode = USSD_TREE[currentNodeId] || USSD_TREE.root;

  const handleKeypadPress = (val: string) => {
    setDialerKeypadInput(prev => prev + val);
  };

  const handleUssdSubmit = (keyToSend?: string) => {
    const key = (keyToSend !== undefined ? keyToSend : dialerKeypadInput).trim();
    if (!key) return;

    if (key === '*123#' || key === '*123') {
      setCurrentNodeId('root');
      setUssdSessionActive(true);
      setUssdHistory(prev => [...prev, `Dialed ${key}`]);
      setDialerKeypadInput('');
      return;
    }

    // Direct shortcode support like *123*1# or *123*2#
    if (key === '*123*1#' || key === '*123*1') {
      setCurrentNodeId('mandi_select');
      setUssdSessionActive(true);
      setUssdHistory(prev => [...prev, `Fast Shortcode: ${key}`]);
      setDialerKeypadInput('');
      return;
    }
    if (key === '*123*2#' || key === '*123*2') {
      setCurrentNodeId('weather_view');
      setUssdSessionActive(true);
      setUssdHistory(prev => [...prev, `Fast Shortcode: ${key}`]);
      setDialerKeypadInput('');
      return;
    }

    if (key === '00') {
      setCurrentNodeId('root');
      setUssdHistory(prev => [...prev, `-> 00 (Main Menu)`]);
      setDialerKeypadInput('');
      return;
    }

    const matchedOption = currentNode.options?.find(o => o.key === key);
    if (matchedOption) {
      setCurrentNodeId(matchedOption.nextNodeId);
      setUssdHistory(prev => [...prev, `Input [${key}] -> ${matchedOption.label}`]);
      setDialerKeypadInput('');
    } else {
      // Invalid key
      setUssdHistory(prev => [...prev, `Invalid choice [${key}]`]);
      setDialerKeypadInput('');
    }
  };

  const handleResetUssd = () => {
    setCurrentNodeId('root');
    setUssdSessionActive(true);
    setDialerKeypadInput('');
    setUssdHistory(['Reset session to *123#']);
  };

  const handleRunSMS = (textToTest?: string) => {
    const text = textToTest || smsInput;
    const res = parseIncomingSMS(text);
    setSmsResult(res);

    if (textToTest) {
      setSmsInput(textToTest);
    }

    // Add to interactive simulation log
    const newLogItem = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: '+91 97552••••• (Demo Farmer)',
      msg: text,
      reply: res.generatedResponse
    };
    setSmsLog(prev => [newLogItem, ...prev.slice(0, 7)]);
  };

  const handleCopyReply = () => {
    navigator.clipboard.writeText(smsResult.generatedResponse);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Pillar 1</span>
              <span aria-hidden="true">·</span>
              <span>Low-Bandwidth Resilience</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Data 2G GSM Stack</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {lang === 'hi' ? 'ऑफलाइन SMS एवं USSD वर्कफ़्लो' : 'Offline SMS & USSD Resilient Workflow'}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {lang === 'hi'
                ? 'दूरदराज के नेटवर्क-विहीन क्षेत्रों के लिए फीचर-फोन आधारित इंटरफ़ेस। बिना इंटरनेट के तुरंत मंडी भाव, मौसम व रोग सहायता प्राप्त करें।'
                : 'Enables smallholders and Gram Mitras with basic keypad feature phones to fetch live auction rates, Doppler weather forecasts, and emergency crop triage without data connectivity.'}
            </p>
          </div>

          {/* Submode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start sm:self-center">
            <button
              onClick={() => setActiveSubMode('ussd')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSubMode === 'ussd'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              USSD (*123#) Session
            </button>
            <button
              onClick={() => setActiveSubMode('sms')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSubMode === 'sms'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              SMS Parser & Responder
            </button>
          </div>
        </div>
      </div>

      {activeSubMode === 'ussd' ? (
        /* USSD Mode: Feature Phone Simulator + Protocol Spec */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Feature Phone Physical Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] bg-stone-850 bg-stone-900 rounded-[36px] p-5 shadow-2xl border-4 border-stone-700 text-stone-100">
              
              {/* Phone Earpiece Speaker & Signal */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <SignalHigh className="w-3.5 h-3.5 text-emerald-400" />
                  <span>BSNL / JIO 2G</span>
                </div>
                <div className="w-12 h-1.5 bg-stone-700 rounded-full"></div>
                <div className="text-[11px] font-mono text-stone-400">100%</div>
              </div>

              {/* Monochrome LCD Screen (Authentic 1990s-2000s dot matrix glow) */}
              <div className="bg-[#a3be8c]/20 border-2 border-emerald-900/60 rounded-xl p-3.5 mb-4 font-mono text-emerald-300 shadow-inner min-h-[190px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-emerald-400/80 border-b border-emerald-500/20 pb-1 mb-2">
                    <span className="font-bold">USSD: {currentNode.title}</span>
                    <span>SESSION OPEN</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-xs sm:text-[13px] leading-relaxed text-emerald-200">
                    {currentNode.screenText}
                  </pre>
                </div>

                <div className="mt-2 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400">Input:</span>
                  <span className="font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-100 min-w-[36px] text-center">
                    {dialerKeypadInput || '_'}
                  </span>
                </div>
              </div>

              {/* Navigation Action Keys */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => handleUssdSubmit()}
                  className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Send / Select</span>
                </button>
                <button
                  onClick={handleResetUssd}
                  className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-stone-300 font-semibold text-xs rounded-xl border border-stone-700 shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>End / Reset</span>
                </button>
              </div>

              {/* Physical Numeric Keypad (44px touch targets) */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: '1', sub: '.,' },
                  { n: '2', sub: 'ABC' },
                  { n: '3', sub: 'DEF' },
                  { n: '4', sub: 'GHI' },
                  { n: '5', sub: 'JKL' },
                  { n: '6', sub: 'MNO' },
                  { n: '7', sub: 'PQRS' },
                  { n: '8', sub: 'TUV' },
                  { n: '9', sub: 'WXYZ' },
                  { n: '*', sub: 'Short' },
                  { n: '0', sub: 'Back' },
                  { n: '#', sub: 'Dial' },
                ].map((item) => (
                  <button
                    key={item.n}
                    onClick={() => handleKeypadPress(item.n)}
                    className="h-12 bg-stone-800 hover:bg-stone-700 active:bg-emerald-900/40 rounded-xl border border-stone-700/80 flex flex-col items-center justify-center text-stone-200 transition-all select-none shadow-xs"
                  >
                    <span className="text-base font-bold font-mono leading-none">{item.n}</span>
                    <span className="text-[9px] text-stone-400 font-mono leading-none mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>

              {/* Fast Direct Shortcode Quick Dialers */}
              <div className="mt-4 pt-3 border-t border-stone-800 text-center">
                <span className="text-[11px] text-stone-400 block mb-2">Fast Direct Shortcode Dial:</span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <button
                    onClick={() => handleUssdSubmit('*123*1#')}
                    className="text-[11px] font-mono px-2 py-1 bg-stone-800 hover:bg-emerald-900/60 rounded text-stone-300 border border-stone-700"
                  >
                    *123*1# Mandi
                  </button>
                  <button
                    onClick={() => handleUssdSubmit('*123*2#')}
                    className="text-[11px] font-mono px-2 py-1 bg-stone-800 hover:bg-emerald-900/60 rounded text-stone-300 border border-stone-700"
                  >
                    *123*2# Weather
                  </button>
                  <button
                    onClick={() => handleUssdSubmit('00')}
                    className="text-[11px] font-mono px-2 py-1 bg-stone-800 hover:bg-emerald-900/60 rounded text-stone-300 border border-stone-700"
                  >
                    00 Main
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Protocol Architecture & Session Ledger */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Architectural Explanation Card */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-2">
                USSD Session State Machine (Unstructured Supplementary Service Data)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                USSD uses session-oriented signaling channels over GSM MAP (Mobile Application Part). Unlike SMS, transactions are real-time, zero-latency, and do not consume mobile balance or internet data on any basic feature phone.
              </p>

              {/* Live Session Breadcrumb Trail */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs font-mono space-y-1">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  Active Session Trace (Telco Gateway)
                </div>
                {ussdHistory.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-700">
                    <span className="text-stone-400">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Option Navigator for Rapid Testing */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                Current Menu Available Choices:
              </h4>

              {currentNode.options && currentNode.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentNode.options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleUssdSubmit(opt.key)}
                      className="p-3 text-left bg-stone-50 hover:bg-emerald-50 hover:border-emerald-300 border border-stone-200 rounded-lg transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-mono font-bold text-emerald-800 mr-2">[{opt.key}]</span>
                        <span className="text-xs font-medium text-stone-800">{opt.label}</span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">Select</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                  <span>Terminal screen reached. You can return to main menu.</span>
                  <button
                    onClick={handleResetUssd}
                    className="px-2.5 py-1 bg-emerald-700 text-white rounded text-xs font-medium"
                  >
                    Return to 00
                  </button>
                </div>
              )}
            </div>

            {/* Telecom Technical Guardrails */}
            <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 text-xs text-stone-600 space-y-2">
              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Field-Hardened Telecom Constraints Enforced:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-stone-600 text-[11px]">
                <li><strong className="text-stone-800">182-Character USSD Window:</strong> All screen menus fit within GSM Phase 2 182-character limits to prevent multi-screen clipping.</li>
                <li><strong className="text-stone-800">120-Second Network Session Timeout:</strong> Sessions automatically release MAP resources if the farmer pauses.</li>
                <li><strong className="text-stone-800">Bilingual Transliteration:</strong> Shortcodes support Hindi Latin keywords (e.g. <em>Bhav, Mausam</em>) for seamless farmer recognition.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* SMS Mode: Interactive Parsing Engine & Outgoing Dispatch */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Command Tester */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-1">
                GramSetu SMS Gateway Parser Bench
              </h3>
              <p className="text-xs text-stone-600 mb-4">
                Test incoming SMS commands sent to shortcode <code className="bg-stone-100 px-1.5 py-0.5 rounded text-emerald-900 font-semibold">56161</code>. Watch tokenization, intent recognition, entity extraction, and GSM-7 compliance.
              </p>

              {/* Quick Presets */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-stone-500 block mb-1.5 uppercase tracking-wider">
                  Select Preset SMS Command:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'MANDI WHEAT DEWAS',
                    'MANDI SOYBEAN INDORE',
                    'MANDI CHANA UJJAIN',
                    'MAUSAM DEWAS',
                    'MAUSAM SEHORE',
                    'ROGI SOYBEAN PEST',
                    'MITRA VISIT'
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleRunSMS(preset)}
                      className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-colors ${
                        smsInput === preset 
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-semibold' 
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Command Input */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={smsInput}
                    onChange={(e) => setSmsInput(e.target.value)}
                    placeholder="Type keyword e.g. MANDI MUSTARD MORENA"
                    className="w-full pl-3 pr-10 py-2.5 border border-stone-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 uppercase"
                  />
                  <div className="absolute right-2.5 top-2.5 text-xs text-stone-400 font-mono">
                    {smsInput.length} chars
                  </div>
                </div>
                <button
                  onClick={() => handleRunSMS()}
                  className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Parse & Reply</span>
                </button>
              </div>

              {/* Parser Output Breakdown */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-stone-700" />
                    <span className="text-xs font-bold text-stone-800">GramSetu NLP Rule Tokenizer</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-stone-500">GSM Segments:</span>
                    <span className="font-semibold text-emerald-800">{smsResult.gsmSegments} / 1</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-white">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                      <span className="text-[10px] text-stone-500 block">Parsed Intent</span>
                      <span className="text-xs font-bold font-mono text-emerald-900">{smsResult.parsedIntent}</span>
                    </div>
                    <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                      <span className="text-[10px] text-stone-500 block">Character Budget</span>
                      <span className="text-xs font-bold font-mono text-stone-800 tabular-nums">
                        {smsResult.responseLength} / 160 GSM-7
                      </span>
                    </div>
                    <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-stone-500 block">Delivery Status</span>
                      <span className={`text-xs font-bold font-mono ${smsResult.status === 'success' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {smsResult.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Extracted Entities */}
                  <div>
                    <span className="text-[11px] font-semibold text-stone-500 block mb-1">
                      Extracted Entities:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(smsResult.extractedEntities).length > 0 ? (
                        Object.entries(smsResult.extractedEntities).map(([key, val]) => (
                          <span key={key} className="px-2 py-1 bg-stone-100 border border-stone-200 rounded text-xs font-mono text-stone-800">
                            <span className="text-stone-500">{key}:</span> {val}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-stone-400 italic">None extracted</span>
                      )}
                    </div>
                  </div>

                  {/* Generated SMS Outbound Payload */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-stone-700">
                        Generated Concise SMS Payload (Sent to Farmer Phone):
                      </span>
                      <button
                        onClick={handleCopyReply}
                        className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1"
                      >
                        {copiedReply ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedReply ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs font-mono text-emerald-950 leading-relaxed break-words">
                      {smsResult.generatedResponse}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Message Transmission Stream */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-sm font-bold text-stone-900">Gram Mitra SMS Gateway Activity</h4>
                </div>
                <span className="text-[11px] text-stone-500">Live Queue</span>
              </div>

              <div className="space-y-3">
                {smsLog.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg border border-stone-200 bg-stone-50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-stone-500 text-[11px]">
                      <span className="font-semibold text-stone-700">{log.sender}</span>
                      <span>{log.time}</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-stone-200 font-mono text-[11px] text-stone-800">
                      <span className="text-stone-400 mr-1.5">IN:</span>
                      {log.msg}
                    </div>
                    <div className="bg-emerald-50/80 p-2 rounded border border-emerald-200/80 font-mono text-[11px] text-emerald-900">
                      <span className="text-emerald-700 font-semibold mr-1.5">OUT:</span>
                      {log.reply}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Cheatsheet */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 text-xs text-stone-600 space-y-2">
              <span className="font-bold text-stone-800 block">Universal Feature-Phone Syntax:</span>
              <div className="space-y-1.5 text-[11px]">
                <div><code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-semibold text-stone-900">MANDI &lt;CROP&gt; &lt;MANDI&gt;</code>: Returns min, modal, max and live badging status.</div>
                <div><code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-semibold text-stone-900">MAUSAM &lt;DISTRICT&gt;</code>: Doppler rainfall % and pesticide spray suitability warning.</div>
                <div><code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-semibold text-stone-900">ROGI &lt;CROP&gt;</code>: Logs emergency triage and schedules KVK extension officer call.</div>
                <div><code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-semibold text-stone-900">MITRA VISIT</code>: Alerts designated village facilitator for home doorstep help.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
