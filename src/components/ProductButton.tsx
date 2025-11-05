import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface ProductButtonProps {
  name: string;
  price: number;
  currentQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export const ProductButton = ({ name, price, currentQuantity = 0, onQuantityChange }: ProductButtonProps) => {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [showControls, setShowControls] = useState(currentQuantity > 0);

  useEffect(() => {
    setQuantity(currentQuantity);
    setShowControls(currentQuantity > 0);
  }, [currentQuantity]);

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(newQty);
  };

  const handleDecrement = () => {
    const newQty = Math.max(0, quantity - 1);
    setQuantity(newQty);
    onQuantityChange(newQty);
    if (newQty === 0) setShowControls(false);
  };

  const handleProductClick = () => {
    if (!showControls) {
      setShowControls(true);
      const newQty = 1;
      setQuantity(newQty);
      onQuantityChange(newQty);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleProductClick}
        className="h-28 w-full flex flex-col items-center justify-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        variant={showControls ? "secondary" : "default"}
      >
        <span className="text-base md:text-lg">{name}</span>
        <span className="text-xl md:text-2xl font-bold">${price.toFixed(2)}</span>
      </Button>
      
      {showControls && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-3 shadow-xl p-2">
          <span className="text-sm font-semibold text-center line-clamp-1">{name}</span>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleDecrement}
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-3xl font-bold min-w-[3rem] text-center">{quantity}</span>
            <Button
              onClick={handleIncrement}
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
