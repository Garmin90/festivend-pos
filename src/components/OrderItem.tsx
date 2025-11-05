import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OrderItemProps {
  name: string;
  quantity: number;
  price: number;
  onRemove: () => void;
}

export const OrderItem = ({ name, quantity, price, onRemove }: OrderItemProps) => {
  const total = quantity * price;
  
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg mb-2 hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm md:text-base">{name}</span>
          <span className="text-muted-foreground text-sm">×{quantity}</span>
        </div>
        <span className="text-xs text-muted-foreground">${price.toFixed(2)} each</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-lg">${total.toFixed(2)}</span>
        <Button
          onClick={onRemove}
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
