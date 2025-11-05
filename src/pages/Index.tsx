import { useState } from "react";
import { ProductButton } from "@/components/ProductButton";
import { OrderItem } from "@/components/OrderItem";
import { PaymentSelector } from "@/components/PaymentSelector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Printer } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItemType {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Burger", price: 8.50 },
  { id: "2", name: "Hot Dog", price: 5.00 },
  { id: "3", name: "Fries", price: 4.00 },
  { id: "4", name: "Nachos", price: 6.50 },
  { id: "5", name: "Taco", price: 7.00 },
  { id: "6", name: "Pizza Slice", price: 5.50 },
  { id: "7", name: "Soda", price: 2.50 },
  { id: "8", name: "Water", price: 1.50 },
  { id: "9", name: "Lemonade", price: 3.00 },
  { id: "10", name: "Ice Cream", price: 4.50 },
  { id: "11", name: "Popcorn", price: 3.50 },
  { id: "12", name: "Cotton Candy", price: 4.00 },
];

const Index = () => {
  const [order, setOrder] = useState<OrderItemType[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const handleQuantityChange = (product: Product, quantity: number) => {
    setOrder((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      
      if (quantity === 0) {
        return prev.filter((item) => item.productId !== product.id);
      }
      
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity } : item
        );
      }
      
      return [...prev, {
        productId: product.id,
        name: product.name,
        quantity,
        price: product.price,
      }];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setOrder((prev) => prev.filter((item) => item.productId !== productId));
  };

  const total = order.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handlePrint = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    toast.success(`Order sent! Total: $${total.toFixed(2)} (${paymentMethod})`);
    
    // Reset order
    setOrder([]);
    setPaymentMethod(null);
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Festival Cashier
          </h1>
          <p className="text-muted-foreground">Select items to start an order</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
          {/* Product Grid */}
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {PRODUCTS.map((product) => {
                const orderItem = order.find(item => item.productId === product.id);
                return (
                  <ProductButton
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    currentQuantity={orderItem?.quantity ?? 0}
                    onQuantityChange={(qty) => handleQuantityChange(product, qty)}
                  />
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* Order Items */}
            <div className="flex-1 overflow-y-auto max-h-[400px] mb-4">
              {order.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No items yet
                </p>
              ) : (
                order.map((item) => (
                  <OrderItem
                    key={item.productId}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onRemove={() => handleRemoveItem(item.productId)}
                  />
                ))
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Order Notes (Optional)
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special instructions..."
                  className="resize-none h-20"
                />
              </div>

              {/* Payment Selector */}
              <PaymentSelector
                selected={paymentMethod}
                onSelect={setPaymentMethod}
              />
            </div>

            {/* Print Button */}
            <Button
              onClick={handlePrint}
              disabled={!paymentMethod || order.length === 0}
              size="lg"
              className="w-full h-14 text-lg font-bold"
            >
              <Printer className="mr-2 h-5 w-5" />
              Send Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
