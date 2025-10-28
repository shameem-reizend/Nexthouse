import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

interface ExchangePolicyProps {
  showPolicyDialog: boolean;
  setShowPolicyDialog: (open: boolean) => void; // 👈 this was missing
  confirmExchangePolicy: () => void; // 👈 you also used this function but didn’t pass it
}

function ExchangePolicy({showPolicyDialog,setShowPolicyDialog,confirmExchangePolicy}:ExchangePolicyProps) {
  return (
   <Dialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Exchange Policy</DialogTitle>
            <DialogDescription>
              By enabling Exchange, you agree to allow other users to offer their
              products in exchange for yours. Once enabled:
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                <li>Exchanges are subject to mutual approval.</li>
                <li>You can disable exchange anytime before an offer is made.</li>
                <li>After a successful barter, the product will be marked as unavailable.</li>
              </ul>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setShowPolicyDialog(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={confirmExchangePolicy}>I Agree & Enable</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default ExchangePolicy