import React from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";

interface NavigateAddressProps {
  showAddressDialog: boolean;
  setShowAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
function NavigateAddress({
  showAddressDialog,
  setShowAddressDialog,
}: NavigateAddressProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>No Address Found</DialogTitle>
          <DialogDescription>
            You need to add your address before listing a product. Please update
            your profile to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              setShowAddressDialog(false);
              navigate("/profile");
            }}
          >
            Go to Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NavigateAddress;
