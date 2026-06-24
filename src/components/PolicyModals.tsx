import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-stone-900/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-stone-50 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-2xl relative rounded-sm"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors bg-white p-1 shadow-sm rounded-sm"
            >
              <X size={20} />
            </button>
            <div className="p-8 sm:p-12">
              <h2 className="font-serif text-3xl text-stone-900 mb-6 border-b border-stone-200 pb-4">{title}</h2>
              <div className="prose prose-stone prose-sm sm:prose-base max-w-none text-stone-600">
                {content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <PolicyModal
    isOpen={isOpen}
    onClose={onClose}
    title="Privacy Policy"
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>1. Information We Collect</h3>
        <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, or otherwise contact us. This includes your name, email address, phone number, and shipping address.</p>
        
        <h3>2. How We Use Your Information</h3>
        <p>We use personal information collected via our website for a variety of business purposes, including fulfilling your orders, managing your account, responding to inquiries, and sending you marketing and promotional communications (if you have opted in).</p>
        
        <h3>3. Will Your Information Be Shared?</h3>
        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors (like payment gateways and courier services) to process and deliver your orders.</p>
        
        <h3>4. Security of Your Information</h3>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
        
        <h3>5. Contact Us</h3>
        <p>If you have questions or comments about this notice, you may email us at info@akashcollection.pk or akashcollection.pk@gmail.com.</p>
      </>
    }
  />
);

export const RefundPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <PolicyModal
    isOpen={isOpen}
    onClose={onClose}
    title="Return & Refund Policy"
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>1. Returns</h3>
        <p>You have 7 days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and have the receipt or proof of purchase.</p>
        
        <h3>2. Refunds</h3>
        <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment (or via bank transfer/mobile wallet as applicable).</p>
        
        <h3>3. Shipping Returns</h3>
        <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
        
        <h3>4. Non-returnable Items</h3>
        <p>Certain items cannot be returned, including sale items, stitched customized clothing, and items that have been washed or worn.</p>
      </>
    }
  />
);

export const ShippingPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <PolicyModal
    isOpen={isOpen}
    onClose={onClose}
    title="Shipping & Service Policy"
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>1. Processing Time</h3>
        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>
        
        <h3>2. Shipping Rates & Delivery Estimates</h3>
        <p>Shipping charges for your order will be calculated and displayed at checkout. Standard delivery within Pakistan takes approximately 3-5 business days. Delivery times may vary depending on the destination city.</p>
        
        <h3>3. Shipment Confirmation & Order Tracking</h3>
        <p>You will receive a Shipment Confirmation email/SMS once your order has shipped containing your tracking number(s). You can track your order using the "Track Order" link on our website.</p>
        
        <h3>4. Services</h3>
        <p>We provide retail e-commerce services for ethnic wear, unstitched fabrics, and ready-to-wear clothing in Pakistan.</p>
      </>
    }
  />
);

export const TermsConditionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <PolicyModal
    isOpen={isOpen}
    onClose={onClose}
    title="Terms & Conditions"
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3>2. Products & Services</h3>
        <p>All products and services listed on the website are subject to availability. We reserve the right to modify or discontinue any product at any time. Prices for our products are subject to change without notice.</p>
        
        <h3>3. Payment & Billing</h3>
        <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. We accept payments via supported gateways (PayFast, Cards, Raast, Mobile Wallets) and Cash on Delivery (COD).</p>
        
        <h3>4. User Conduct</h3>
        <p>You agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, services, or general business of Akash Collection.</p>
        
        <h3>5. Governing Law</h3>
        <p>These terms and conditions are governed by and construed in accordance with the laws of Pakistan and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
      </>
    }
  />
);
