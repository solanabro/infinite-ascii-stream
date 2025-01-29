import React from 'react';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  handleEmailSubmit: (e: React.FormEvent) => void;
}

const EmailForm = ({ email, setEmail }: EmailFormProps) => {
  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup" className="bg-black">
        <form 
          action="https://fun.us8.list-manage.com/subscribe/post?u=a22fa715a847ef252086188bd&amp;id=5512337691&amp;f_id=0019c2e2f0" 
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form" 
          className="space-y-4" 
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <div className="text-left text-white/90 font-mono text-sm sm:text-base mb-4">
              {">"}{"  "}Enter your email to continue
            </div>
            
            <div className="mc-field-group space-y-2">
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="toly@solana.com"
                className="bg-transparent text-white/90 border-white/20 w-full px-4 py-2 rounded"
                required
              />
            </div>
            
            <div id="mce-responses" className="clear">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div>
            
            {/* Mailchimp required hidden field */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input 
                type="text" 
                name="b_a22fa715a847ef252086188bd_5512337691" 
                tabIndex={-1} 
                value="" 
                readOnly
              />
            </div>
            
            <button
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white/90 rounded transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;