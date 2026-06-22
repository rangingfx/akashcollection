import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorName('');

    if (!email) {
      setErrorName('Please enter your email address.');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorName('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate standard server subscription timeout
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 850);
  };

  return (
    <section 
      className="bg-white border-t border-b border-stone-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
      id="newsletter-subscription-section"
    >
      <div className="absolute inset-0 bg-[#fbfaf8]/50 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8" id="newsletter-inner-container">
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 block">
            STAY IN THE KNOW
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
            Join the <span className="italic">Akash Wholesale Club</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto font-sans">
            Subscribe to be the first to know about new catalog releases, luxury lookbook previews, weekly styling edits, and exclusive member-only collections in Pakistan.
          </p>
        </div>

        {!success ? (
          <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto space-y-3" 
            id="newsletter-form" 
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-2" id="newsletter-form-fields-row">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  id="newsletter-email-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorName) setErrorName('');
                  }}
                  className="w-full pl-9 pr-4 py-3 bg-stone-50/50 border border-stone-200 text-stone-900 placeholder-stone-400 text-xs focus:ring-1 focus:ring-stone-900 focus:border-stone-900 focus:bg-white outline-none rounded-md transition-all font-sans"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                id="newsletter-submit-btn"
                disabled={loading}
                className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase py-3 px-8 rounded-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 min-h-[44px]"
              >
                <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                {!loading && <ArrowRight size={14} />}
              </button>
            </div>

            {errorName && (
              <p className="text-red-600 text-left text-xs font-sans tracking-wide mt-1.5 animate-fadeIn" id="newsletter-error-msg">
                {errorName}
              </p>
            )}
            
            <p className="text-[10px] text-stone-400 leading-normal" id="newsletter-privacy-disavow">
              By subscribing, you agree to our privacy policy. We protect your data and only dispatch meaningful collections. Opt-out at any time instantly.
            </p>
          </form>
        ) : (
          <div 
            className="max-w-md mx-auto bg-stone-50 border border-stone-200/50 p-6 sm:p-8 rounded-xl text-center space-y-4 animate-scaleIn shadow-sm" 
            id="newsletter-success-box"
          >
            <div className="flex justify-center text-emerald-700" id="newsletter-success-icon-box">
              <CheckCircle size={44} strokeWidth={1.5} className="animate-bounce" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                You're officially on the list!
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed font-sans">
                Thank you for subscribing with <strong className="text-stone-900">{email}</strong>. 
                Keep an eye on your inbox — your official welcome guide and <strong className="text-emerald-700">10% OFF discount voucher code</strong> is on its way.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
