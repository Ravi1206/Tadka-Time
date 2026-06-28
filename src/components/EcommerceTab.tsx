import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  ChevronRight, 
  X,
  CreditCard,
  Download
} from 'lucide-react';
import { EbookProduct } from '../types';

interface EcommerceTabProps {
  products: EbookProduct[];
  userPoints: number;
}

export default function EcommerceTab({
  products,
  userPoints
}: EcommerceTabProps) {
  const [selectedProduct, setSelectedProduct] = useState<EbookProduct | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [downloadedProductIds, setDownloadedProductIds] = useState<string[]>([]);

  const handleProductBuy = (prod: EbookProduct) => {
    setSelectedProduct(prod);
    setCheckoutStep('details');
    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim()) {
      alert('Please fill out your name and email!');
      return;
    }
    // Simulate payment transaction success
    if (selectedProduct) {
      setDownloadedProductIds(prev => [...prev, selectedProduct.id]);
    }
    setCheckoutStep('success');
  };

  const handleDownloadDemo = (prodTitle: string) => {
    alert(`Downloading "${prodTitle}" demo package!`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8" id="ecommerce-arena">
      {/* Tab Banner header */}
      <div className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 p-6 sm:p-8 text-white shadow-xl shadow-red-500/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            Tadka Digital Market
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
            Chef Resource Shop
          </h2>
          <p className="text-sm text-red-50/90 mt-1 max-w-md">
            Gain immediate access to digital premium guidebooks, spreadsheets, and menus constructed by our experienced food business strategists.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-2xl border border-white/15">
          <ShoppingBag className="h-5 w-5 text-yellow-300" />
          <span className="text-sm font-bold">Secure digital delivery</span>
        </div>
      </div>

      {/* Grid List of Products */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => {
          const isPurchased = downloadedProductIds.includes(prod.id);
          return (
            <div 
              key={prod.id}
              className="border rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col justify-between dark:border-neutral-800 dark:bg-neutral-950"
              id={`shop-item-${prod.id}`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={prod.image}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute left-3 top-3 bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                  {prod.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 text-orange-600 text-xs font-bold">
                    <Star className="h-4 w-4 fill-orange-600" />
                    <span>{prod.rating}</span>
                    <span className="text-neutral-400 font-semibold">({prod.reviewsCount} reviews)</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white line-clamp-1">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-neutral-900 dark:text-white">₹{prod.price}</span>
                    <span className="text-xs text-neutral-400 line-through ml-1.5 font-semibold">₹{prod.originalPrice}</span>
                  </div>

                  {isPurchased ? (
                    <button
                      onClick={() => handleDownloadDemo(prod.title)}
                      className="rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-2 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleProductBuy(prod)}
                      className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <span>Buy Now</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal Overlay */}
      {showCheckoutModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl border p-6 shadow-2xl dark:bg-neutral-950 dark:border-neutral-800">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <X className="h-5 w-5" />
            </button>

            {checkoutStep === 'details' ? (
              <form onSubmit={handleCheckoutSubmit}>
                <div className="text-center mb-6">
                  <span className="bg-orange-500/15 text-orange-600 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase dark:bg-orange-950/40">Secure Digital Purchase</span>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white mt-2">Confirm Your Details</h3>
                  <p className="text-xs text-neutral-400 mt-1">Files will be emailed and unlocked for download instantly.</p>
                </div>

                {/* Mini product summaries */}
                <div className="p-3 border rounded-xl bg-neutral-50 flex gap-3 items-center mb-4 dark:bg-neutral-900 dark:border-neutral-800">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-extrabold text-neutral-950 dark:text-white">{selectedProduct.title}</h5>
                    <p className="text-[10px] text-orange-600 font-bold mt-0.5">Secure payment: ₹{selectedProduct.price}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Arjun Maiya"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g., arjun@example.com"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2.5 px-3.5 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>

                  {/* Payment Card Simulation */}
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Card Details (Simulated)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5"><CreditCard className="h-4 w-4 text-neutral-400" /></span>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        disabled
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-100 py-2.5 pl-10 pr-4 text-xs font-mono font-bold text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-gradient-to-r from-red-600 to-orange-600 py-3 text-xs font-extrabold text-white text-center shadow-md shadow-red-500/10 hover:opacity-90 transition"
                >
                  Pay ₹{selectedProduct.price} & Unlock
                </button>
              </form>
            ) : (
              // Success checkout screen
              <div className="text-center py-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white">Purchase Successful!</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Thank you, <span className="font-bold text-neutral-800 dark:text-white">{fullName}</span>. We emailed the transaction invoice and PDF access link to <span className="font-bold text-neutral-800 dark:text-white">{emailAddress}</span>.
                </p>

                <div className="mt-6 border border-dashed border-emerald-200 rounded-xl p-4 bg-emerald-50/50 dark:bg-emerald-950/15 dark:border-emerald-900 text-left">
                  <h5 className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Your Digital Downloads:</h5>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-neutral-900 dark:text-white">{selectedProduct.title}</span>
                    <button
                      onClick={() => handleDownloadDemo(selectedProduct.title)}
                      className="rounded bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 transition flex items-center gap-1.5"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="mt-6 w-full rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 py-2.5 text-xs font-bold transition dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
                >
                  Back to Resource Shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
