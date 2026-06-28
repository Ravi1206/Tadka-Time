import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert, 
  HelpCircle, 
  CheckSquare, 
  PiggyBank, 
  Coins, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function FinanceCalculator() {
  const [activeTab, setActiveTab] = useState<'sip' | 'budget'>('sip');

  // SIP states
  const [monthlySip, setMonthlySip] = useState(15000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(15);
  const [annualStepUp, setAnnualStepUp] = useState(10); // 10% step up

  // 50/30/20 Budget state
  const [monthlySalary, setMonthlySalary] = useState(75000);

  // Emergency fund check state
  const [monthlyRent, setMonthlyRent] = useState(15000);
  const [monthlyGroceries, setMonthlyGroceries] = useState(8000);
  const [monthlyBills, setMonthlyBills] = useState(4000);
  const [monthsCovered, setMonthsCovered] = useState(6);

  // Calculate standard SIP compound interest
  // Formula: M * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
  const calculateSip = () => {
    const P = monthlySip;
    const monthlyRate = (expectedReturn / 12) / 100;
    const months = years * 12;

    let totalInvested = 0;
    let futureValue = 0;

    // Standard static SIP calculation
    if (annualStepUp === 0) {
      totalInvested = P * months;
      futureValue = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      // Step-up compound SIP calculations
      let currentMonthlyP = P;
      for (let y = 1; y <= years; y++) {
        const yearMonths = 12;
        for (let m = 1; m <= yearMonths; m++) {
          totalInvested += currentMonthlyP;
          // compound existing FV + new deposit
          futureValue = (futureValue + currentMonthlyP) * (1 + monthlyRate);
        }
        // apply annual step up
        currentMonthlyP = currentMonthlyP * (1 + annualStepUp / 100);
      }
    }

    const wealthGained = Math.max(0, futureValue - totalInvested);

    return {
      totalInvested: Math.round(totalInvested),
      futureValue: Math.round(futureValue),
      wealthGained: Math.round(wealthGained)
    };
  };

  const { totalInvested, futureValue, wealthGained } = calculateSip();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // 50/30/20 calculation
  const needs = monthlySalary * 0.5;
  const wants = monthlySalary * 0.3;
  const savings = monthlySalary * 0.2;

  // Emergency Fund Calculation
  const baselineNeedsMonthly = monthlyRent + monthlyGroceries + monthlyBills;
  const targetEmergencyFund = baselineNeedsMonthly * monthsCovered;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8" id="finance-advisor">
      {/* Banner introduction */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-tr from-emerald-50 to-emerald-100/50 p-6 dark:border-emerald-950/40 dark:from-neutral-900 dark:to-neutral-950 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold px-3 py-1 uppercase tracking-wider dark:bg-emerald-950/40 dark:text-emerald-400">
            <Coins className="h-3.5 w-3.5 animate-pulse" />
            <span>Tadka Wealth Hub</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
            Personal Finance & Growth Trackers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-lg leading-relaxed">
            Financial freedom is built on discipline, compounding, and smart allocation. Model your mutual fund SIP wealth projection, or map your monthly salary budget below.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('sip')}
            className={`rounded-lg px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'sip'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white hover:bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            SIP Calculator
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`rounded-lg px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'budget'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white hover:bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800'
            }`}
          >
            <PiggyBank className="h-4 w-4" />
            50/30/20 Budgeting
          </button>
        </div>
      </div>

      {/* Render Calculator Section */}
      <div>
        {activeTab === 'sip' ? (
          /* SIP WEALTH CALCULATOR LAYOUT */
          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Left Box: Controls & Sliders */}
            <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-6">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Calculator className="h-4.5 w-4.5 text-emerald-500" />
                <span>Adjust SIP Parameters</span>
              </h3>

              {/* Monthly Contribution */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Monthly SIP Contribution</label>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 px-2.5 py-1 rounded-md dark:bg-emerald-950/20">{formatCurrency(monthlySip)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:bg-neutral-800"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>₹500</span>
                  <span>₹1 Lakh</span>
                </div>
              </div>

              {/* Expected Return Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Expected Return Rate (p.a.)</label>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 px-2.5 py-1 rounded-md dark:bg-emerald-950/20">{expectedReturn}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                  className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:bg-neutral-800"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>5% (Debt)</span>
                  <span>25% (High Equity)</span>
                </div>
              </div>

              {/* Time Horizon */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Investment Time Horizon</label>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 px-2.5 py-1 rounded-md dark:bg-emerald-950/20">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:bg-neutral-800"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>1 Year</span>
                  <span>35 Years</span>
                </div>
              </div>

              {/* Annual Step-Up Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Annual Investment Step-Up</label>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 px-2.5 py-1 rounded-md dark:bg-emerald-950/20">{annualStepUp}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={annualStepUp}
                  onChange={(e) => setAnnualStepUp(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:bg-neutral-800"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                  <span>0% (Static)</span>
                  <span>25% (Aggressive)</span>
                </div>
              </div>
            </div>

            {/* Right Box: Calculations, Visual Graph */}
            <div className="space-y-6">
              
              {/* Core Output numbers */}
              <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 grid grid-cols-2 gap-4">
                <div className="col-span-2 border-b pb-4 dark:border-neutral-900">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Estimated Total Corpus</span>
                  <p className="text-3xl font-black text-emerald-500 tracking-tight mt-1">{formatCurrency(futureValue)}</p>
                </div>
                
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Total Amount Invested</span>
                  <p className="text-base font-extrabold text-neutral-800 dark:text-neutral-200 mt-0.5">{formatCurrency(totalInvested)}</p>
                </div>

                <div className="pt-2 border-l pl-4 dark:border-neutral-900">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase">Total Estimated Returns</span>
                  <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">+{formatCurrency(wealthGained)}</p>
                </div>
              </div>

              {/* Custom SVG Bar Graph representing wealth comparison */}
              <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest block mb-6">Investment Proportion Ratio</span>
                
                {/* Visual bar proportions */}
                <div className="space-y-4">
                  {/* Total Invested proportion bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-neutral-500">Invested Capital</span>
                      <span className="font-extrabold">{formatCurrency(totalInvested)}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-4 rounded-full dark:bg-neutral-900 overflow-hidden">
                      <div 
                        className="bg-neutral-400 h-full transition-all duration-300 dark:bg-neutral-600"
                        style={{ width: `${(totalInvested / futureValue) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Wealth Gained proportion bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-600">Compounded Wealth Gained</span>
                      <span className="font-extrabold text-emerald-600">{formatCurrency(wealthGained)}</span>
                    </div>
                    <div className="w-full bg-neutral-100 h-4 rounded-full dark:bg-neutral-900 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${(wealthGained / futureValue) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Educational compound interest note */}
                <div className="mt-6 p-4 rounded-xl bg-neutral-50/50 border flex items-start gap-2.5 dark:bg-neutral-900/40 dark:border-neutral-900">
                  <HelpCircle className="h-4.5 w-4.5 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-500 leading-relaxed dark:text-neutral-400">
                    With an annual step-up of {annualStepUp}%, your monthly contributions increase along with your career growth, dramatically boosting your compound curve over {years} years!
                  </p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* 50/30/20 SALARY BUDGETING ALLOCATOR */
          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Budget details */}
            <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-6">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <PiggyBank className="h-4.5 w-4.5 text-emerald-500" />
                <span>Salary Allocation Model</span>
              </h3>

              {/* Monthly Salary Input */}
              <div>
                <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide block mb-2">Your Monthly Net In-Hand Salary</label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-sm font-bold text-neutral-400">₹</span>
                  <input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-8 pr-4 text-sm font-bold outline-none focus:border-emerald-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Allocation Outputs */}
              <div className="space-y-4 pt-2">
                {/* Needs */}
                <div className="p-3 border rounded-xl border-neutral-100 bg-neutral-50/50 flex justify-between items-center dark:border-neutral-900 dark:bg-neutral-900/40">
                  <div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Needs (50%)</span>
                    <p className="text-[10px] text-neutral-400">Rent, Utilities, Food bills, EMIs</p>
                  </div>
                  <span className="text-sm font-extrabold text-neutral-800 dark:text-neutral-200">{formatCurrency(needs)}</span>
                </div>

                {/* Wants */}
                <div className="p-3 border rounded-xl border-neutral-100 bg-neutral-50/50 flex justify-between items-center dark:border-neutral-900 dark:bg-neutral-900/40">
                  <div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Wants (30%)</span>
                    <p className="text-[10px] text-neutral-400">Cafes, shopping, OTT, travel</p>
                  </div>
                  <span className="text-sm font-extrabold text-neutral-800 dark:text-neutral-200">{formatCurrency(wants)}</span>
                </div>

                {/* Savings */}
                <div className="p-3 border rounded-xl border-neutral-100 bg-neutral-50/50 flex justify-between items-center dark:border-neutral-900 dark:bg-neutral-900/40">
                  <div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">Savings & Investment (20%)</span>
                    <p className="text-[10px] text-neutral-400">SIPs, Stocks, PPF, emergency corpus</p>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(savings)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Emergency Fund Planner */}
            <div className="border rounded-2xl bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 space-y-6">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <ShieldAlert className="h-4.5 w-4.5 text-red-500" />
                <span>Emergency Fund Planner</span>
              </h3>

              <div className="space-y-4">
                {/* Rent component */}
                <div>
                  <div className="flex justify-between mb-1.5 text-xs">
                    <span className="text-neutral-500 font-semibold">Monthly rent allocation</span>
                    <span className="font-bold">{formatCurrency(monthlyRent)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="60000"
                    step="1000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 accent-emerald-500 rounded-lg cursor-pointer dark:bg-neutral-800"
                  />
                </div>

                {/* Groceries & Essentials */}
                <div>
                  <div className="flex justify-between mb-1.5 text-xs">
                    <span className="text-neutral-500 font-semibold">Monthly groceries & bills</span>
                    <span className="font-bold">{formatCurrency(monthlyGroceries)}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="30000"
                    step="500"
                    value={monthlyGroceries}
                    onChange={(e) => setMonthlyGroceries(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 accent-emerald-500 rounded-lg cursor-pointer dark:bg-neutral-800"
                  />
                </div>

                {/* Target Months */}
                <div>
                  <div className="flex justify-between mb-1.5 text-xs">
                    <span className="text-neutral-500 font-semibold">Survival safety months</span>
                    <span className="font-bold">{monthsCovered} Months</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="1"
                    value={monthsCovered}
                    onChange={(e) => setMonthsCovered(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 accent-emerald-500 rounded-lg cursor-pointer dark:bg-neutral-800"
                  />
                </div>
              </div>

              {/* Calculation Summary Block */}
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 dark:bg-red-950/10 dark:border-red-900/40 text-center">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Recommended Emergency Cushion</span>
                <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">{formatCurrency(targetEmergencyFund)}</p>
                <p className="text-[11px] text-neutral-400 mt-1">Based on maintaining survival necessities (₹{formatCurrency(baselineNeedsMonthly)}/mo) for {monthsCovered} months.</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
