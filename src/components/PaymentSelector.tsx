import { Button } from "@/components/ui/button";
import { CreditCard, Banknote, Gift } from "lucide-react";

interface PaymentSelectorProps {
  selected: string | null;
  onSelect: (method: string) => void;
}

export const PaymentSelector = ({ selected, onSelect }: PaymentSelectorProps) => {
  const methods = [
    { id: "cash", label: "Cash", icon: Banknote },
    { id: "card", label: "Card", icon: CreditCard },
    { id: "free", label: "Free", icon: Gift },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        Payment Method
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selected === method.id;
          
          return (
            <Button
              key={method.id}
              onClick={() => onSelect(method.id)}
              variant={isSelected ? "default" : "outline"}
              className={`h-20 flex flex-col gap-2 ${
                isSelected ? "ring-2 ring-ring ring-offset-2" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-semibold">{method.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
