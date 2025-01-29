import { Input } from '../ui/input';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  handleEmailSubmit: (e: React.FormEvent) => void;
}

const EmailForm = ({ email, setEmail, handleEmailSubmit }: EmailFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the original handleEmailSubmit for local state management
    handleEmailSubmit(e);
    
    // Then submit the form to Mailchimp
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  return (
    <form 
      action="https://fun.us8.list-manage.com/subscribe/post?u=a22fa715a847ef252086188bd&amp;id=5512337691&amp;f_id=0019c2e2f0" 
      method="post" 
      id="mc-embedded-subscribe-form" 
      name="mc-embedded-subscribe-form" 
      className="space-y-4"
      target="_blank"
      onSubmit={handleSubmit}
    >
      <div className="text-left text-white/90 font-mono text-sm sm:text-base">
        {">"}{"  "}Enter your email to continue
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="toly@solana.com"
          className="bg-transparent text-white/90 border-white/20"
          required
        />
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
    </form>
  );
};

export default EmailForm;