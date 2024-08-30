"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addWishlist } from "@/lib/supabase/wishlist";

export default function Wishlist() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addWishlist(email);
    console.log("Subscribing email:", email);
    setIsOpen(true);
    setEmail("");
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          className="max-w-lg flex-1"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Subscribe</Button>
      </form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Subscription Successful!"}</DialogTitle>
            <DialogDescription>
              {
                "Thank you for subscribing to our newsletter. You'll receive updates and news from Stockwise."
              }
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
