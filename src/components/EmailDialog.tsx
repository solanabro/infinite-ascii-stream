import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function EmailDialog({ onEmailSubmit }: { onEmailSubmit: (email: string) => void }) {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome aboard!",
        description: "Prepare for enlightenment.",
      });
      setOpen(false);
      onEmailSubmit(email);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md border border-white/20 bg-black/95 backdrop-blur-xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Welcome
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email to continue..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-white/20 text-white placeholder:text-white/50 pr-24 focus:ring-white/20 focus:border-white/30"
                required
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 transition-colors"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}