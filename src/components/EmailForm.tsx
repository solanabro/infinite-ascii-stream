import { Input } from './ui/input';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EmailForm = ({ email, setEmail, onSubmit }: EmailFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-left text-white/90 font-mono text-sm sm:text-base">
        {">"}{"  "}Enter your email to continue
      </div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="toly@solana.com"
        className="bg-transparent text-white/90 border-white/20"
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white/90 rounded transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default EmailForm;