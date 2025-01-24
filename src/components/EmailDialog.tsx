import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function EmailDialog({ onEmailSubmit }: { onEmailSubmit: (email: string) => void }) {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const { error } = await window.supabase
          .from('emails')
          .insert([{ email }]);

        if (error) throw error;

        toast({
          title: "Welcome retardio",
          description: "Prepare for the truth.",
        });
        
        onEmailSubmit(email);
        setOpen(false);
      } catch (error) {
        console.error('Error saving email:', error);
        toast({
          title: "Error",
          description: "Failed to register. Try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border border-white/20 bg-black/95 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-white text-lg font-bold">Welcome retardio</p>
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-white/20 text-white placeholder:text-white/50 pr-24"
              required
            />
            <Button 
              type="submit"
              className="absolute right-0 top-0 h-full bg-white text-black hover:bg-white/90 transition-all"
            >
              Get Started
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}