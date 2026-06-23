import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  XSquare, 
  Loader2, 
  ShieldAlert, 
  Info, 
  ExternalLink, 
  X, 
  Send, 
  Terminal, 
  Check,
  RefreshCw
} from 'lucide-react';

interface SmtpDiagnosticModalProps {
  onClose: () => void;
}

interface SmtpConfig {
  configured: boolean;
  host: string;
  port: string;
  user: string;
  adminEmail: string;
  hasSmtpUser: boolean;
  hasSmtpPass: boolean;
}

export default function SmtpDiagnosticModal({ onClose }: SmtpDiagnosticModalProps) {
  const [config, setConfig] = useState<SmtpConfig | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  
  // Test execution state
  const [testState, setTestState] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testResult, setTestResult] = useState<{
    message: string;
    errorDetails?: string;
    errorCode?: string;
    recommendations?: string;
    recipient?: string;
  } | null>(null);

  // Fetch current environment variables presence
  const fetchSmtpConfig = async () => {
    setLoadingConfig(true);
    try {
      const res = await fetch('/api/smtp-status');
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      console.error('Failed to query SMTP configs status:', err);
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    fetchSmtpConfig();
  }, []);

  // Run the SMTP dispatch diagnostic action
  const handleRunDiagnostic = async () => {
    setTestState('testing');
    setTestResult(null);

    try {
      const res = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setTestState('success');
        setTestResult({
          message: data.message,
          recipient: data.recipient
        });
        // recheck config parameters too
        fetchSmtpConfig();
      } else {
        setTestState('failed');
        setTestResult({
          message: data.message,
          errorDetails: data.errorDetails,
          errorCode: data.errorCode,
          recommendations: data.recommendations
        });
      }
    } catch (err: any) {
      setTestState('failed');
      setTestResult({
        message: err.message || 'Verification client network exception',
        recommendations: 'Are you sure the backend web application has booted completely? Ensure the container server is healthy.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm" id="smtp-diagnostic-overlay">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200" id="smtp-diagnostic-dialog">
        
        {/* Header decoration */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800" id="smtp-modal-head">
          <div className="flex items-center gap-2.5">
            <Mail className="text-amber-500" size={18} />
            <div>
              <h3 className="font-serif text-base font-bold tracking-wide">SMTP Email Mailer Diagnostics</h3>
              <p className="text-[10px] uppercase tracking-widest font-mono text-gray-400">Back-office integration check</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-stone-800 focus:outline-none"
            id="smtp-close-top-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content body with overflow custom scrollbar */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm" id="smtp-modal-body">
          
          {/* Section 1: Detected SMTP Parameters */}
          <div className="space-y-3" id="smtp-config-section">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 flex items-center gap-2">
                <Terminal size={15} className="text-stone-500" />
                <span>Detected Workspace Parameters</span>
              </h4>
              <button 
                onClick={fetchSmtpConfig}
                disabled={loadingConfig}
                className="text-stone-600 hover:text-stone-900 text-xs font-mono flex items-center gap-1 cursor-pointer"
                title="Refresh Environment Settings"
                id="smtp-refresh-variable-btn"
              >
                <RefreshCw size={11} className={loadingConfig ? 'animate-spin' : ''} />
                <span>Sync Variables</span>
              </button>
            </div>

            {loadingConfig ? (
              <div className="border border-stone-100 rounded-xl p-5 bg-stone-50 flex items-center justify-center gap-2 text-stone-500">
                <Loader2 className="animate-spin text-stone-600" size={16} />
                <span className="font-mono text-xs">Querying container environment variables...</span>
              </div>
            ) : (
              <div className="border border-stone-150 rounded-xl overflow-hidden bg-stone-50/50" id="smtp-params-grid">
                <table className="w-full text-xs font-mono text-stone-700 divide-y divide-stone-100">
                  <tbody>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-stone-900 w-1/3">SMTP_HOST</td>
                      <td className="px-4 py-2.5 select-all text-stone-700">{config?.host || 'smtp.gmail.com'}</td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-stone-900">SMTP_PORT</td>
                      <td className="px-4 py-2.5 select-all text-stone-700">{config?.port || '587'}</td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-stone-900">SMTP_USER</td>
                      <td className="px-4 py-2.5 flex items-center justify-between">
                        <span className="select-all text-stone-700">{config?.user || 'Missing'}</span>
                        {config?.hasSmtpUser ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-emerald-200">Set</span>
                        ) : (
                          <span className="bg-amber-50 text-amber-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-amber-200">Empty</span>
                        )}
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-stone-900">SMTP_PASS</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-between w-full flex-row">
                          <span className="tracking-widest text-[11px] text-stone-400">••••••••••••••••</span>
                          {config?.hasSmtpPass ? (
                            <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-emerald-200 ml-auto">Detected</span>
                          ) : (
                            <span className="bg-amber-50 text-amber-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-amber-200 ml-auto">Empty</span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-stone-900">ADMIN_EMAIL</td>
                      <td className="px-4 py-2.5 select-all text-stone-700">{config?.adminEmail || 'rangingfx@gmail.com'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 2: Interactive Testing Panel */}
          <div className="space-y-3" id="smtp-test-panel">
            <h4 className="font-bold text-stone-900 flex items-center gap-2">
              <Mail size={15} className="text-stone-500" />
              <span>Real-time Connection Test</span>
            </h4>

            {testState === 'idle' && (
              <div className="border border-dashed border-stone-250 rounded-xl p-6 text-center space-y-4" id="smtp-state-idle">
                <p className="text-stone-500 text-xs leading-relaxed max-w-sm mx-auto">
                  Click below to dispatch an automated diagnostic test email using the credentials in your Workspace Settings secrets database.
                </p>
                <button
                  type="button"
                  onClick={handleRunDiagnostic}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs tracking-wider uppercase font-semibold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all shadow-md active:scale-98"
                  id="smtp-trigger-test-btn"
                >
                  <Send size={13} />
                  <span>Execute Diagnostic Routine</span>
                </button>
              </div>
            )}

            {testState === 'testing' && (
              <div className="border border-stone-200 rounded-xl p-8 bg-stone-50 flex flex-col items-center justify-center text-center space-y-3 animate-pulse" id="smtp-state-testing">
                <Loader2 className="animate-spin text-stone-900" size={32} />
                <p className="font-serif font-bold text-stone-900">Securing SMTP Transport...</p>
                <p className="text-stone-500 text-xs max-w-xs leading-relaxed">
                  Attempting network connection, DNS lookup, secure handshake authorization, and dispatching verification HTML markup...
                </p>
              </div>
            )}

            {testState === 'success' && (
              <div className="border border-emerald-150 rounded-xl p-5 bg-emerald-50/60 space-y-3" id="smtp-state-success">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold text-emerald-900 text-sm">{testResult?.message}</p>
                    <p className="text-emerald-800 text-xs">
                      A beautifully responsive diagnostic HTML test notification was emailed to <strong className="underline select-all">{testResult?.recipient}</strong>. Check your inbox (including Spam/Junk folders) to confirm reception!
                    </p>
                  </div>
                </div>
                <div className="border-t border-emerald-200/50 pt-3 flex justify-between items-center flex-wrap gap-2 text-xs">
                  <span className="text-emerald-800 font-medium">Status: Connection Authenticated</span>
                  <button 
                    onClick={handleRunDiagnostic}
                    className="text-emerald-900 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    id="smtp-retry-success-btn"
                  >
                    <span>Send Another Test</span>
                    <Send size={10} />
                  </button>
                </div>
              </div>
            )}

            {testState === 'failed' && (
              <div className="border border-red-150 rounded-xl p-5 bg-red-50/50 space-y-4" id="smtp-state-failed">
                <div className="flex items-start gap-3">
                  <XSquare size={22} className="text-red-700 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold text-red-900 text-sm">Mailer Diagnostic Error</p>
                    <p className="text-red-800 text-xs select-all">
                      {testResult?.message}
                    </p>
                  </div>
                </div>

                {testResult?.errorDetails && (
                  <div className="bg-stone-900 text-stone-300 rounded-lg p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-[100px] select-all border border-stone-850">
                    <strong className="text-red-400">Node Error:</strong> {testResult.errorDetails} {testResult.errorCode ? `(Code: ${testResult.errorCode})` : ''}
                  </div>
                )}

                {testResult?.recommendations && (
                  <div className="bg-white border border-red-200 rounded-lg p-3.5 space-y-2 text-xs text-red-800 leading-relaxed shadow-sm">
                    <p className="font-bold text-red-950 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                      <ShieldAlert size={12} className="text-red-700" />
                      <span>Troubleshooting Recommendations:</span>
                    </p>
                    <p className="font-sans">{testResult.recommendations}</p>
                  </div>
                )}

                <div className="border-t border-red-200/50 pt-3 flex justify-between items-center text-xs">
                  <span className="text-red-800 font-semibold font-mono">CODE: {testResult?.errorCode || 'UNKNOWN'}</span>
                  <button 
                    onClick={handleRunDiagnostic}
                    className="text-red-900 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    id="smtp-retry-failed-btn"
                  >
                    <span>Retry Diagnostic</span>
                    <RefreshCw size={11} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Google App Password helpful context block */}
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 space-y-2.5 leading-relaxed text-stone-800" id="smtp-app-password-helper">
            <h5 className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-amber-900 uppercase tracking-widest">
              <Info size={13} className="text-amber-700" />
              <span>How To Configure Gmail App Passwords</span>
            </h5>
            <ol className="list-decimal list-inside text-xs space-y-1.5 text-stone-700 pl-0.5">
              <li>Log into your <strong>{config?.user && config.user !== 'Not Mocked / Not Configured' ? config.user : 'Google Admin Account'}</strong>.</li>
              <li>Go to <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer" className="text-stone-900 font-semibold underline inline-flex items-center gap-0.5">My Google Account <ExternalLink size={10} /></a>.</li>
              <li>Navigate to the <strong>Security</strong> panel on the left navigation menu.</li>
              <li>Verify that <strong>2-Step Verification</strong> is enabled (if not, enable it first).</li>
              <li>Type <code className="bg-amber-100 px-1 py-0.5 rounded font-bold font-mono">App Passwords</code> inside the top search bar.</li>
              <li>Select <strong>Other (Custom Name)</strong> from the select drop-downs, type <code className="bg-amber-100 px-1 py-0.5 rounded font-bold font-mono">Akash-CartMailer</code>, and click <strong>Generate</strong>.</li>
              <li>Copy the secure <strong>16-digit passcode</strong> (no spaces) and paste it directly into your <code className="bg-stone-150 px-1 py-0.5 rounded font-bold font-mono">SMTP_PASS</code> Workspace secret key!</li>
            </ol>
          </div>

        </div>

        {/* Foot lock */}
        <div className="bg-stone-50 border-t border-stone-150 px-6 py-3.5 flex items-center justify-end" id="smtp-modal-foot">
          <button 
            type="button" 
            onClick={onClose}
            className="border border-stone-300 hover:border-stone-500 text-stone-700 font-sans text-xs tracking-wider uppercase font-semibold px-5 py-2.5 rounded-lg transition-all hover:bg-stone-100 cursor-pointer"
            id="smtp-close-btn"
          >
            Close Diagnostics
          </button>
        </div>

      </div>
    </div>
  );
}
