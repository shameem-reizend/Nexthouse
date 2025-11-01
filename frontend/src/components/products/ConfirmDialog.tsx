

import {
  Dialog,
  
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "../ui/dialog"

import { Button } from "../ui/button"
import {  AlertCircleIcon } from "lucide-react"
const ConfirmDialog = ({open,setOpen,message,onConfirm}:{open:boolean,message:string,setOpen:(open:boolean)=>void,onConfirm:()=>void}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>

      <DialogTitle>
        <div className="flex items-center space-x-2">
        <AlertCircleIcon/>
        <h3 className="pt-2 font-medium">
        Are you absolutely sure?
        </h3>
        </div>
        </DialogTitle>
      <DialogDescription>
        This action cannot be undone.{message} 
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={()=>{onConfirm()
      setOpen(false)
      }}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default ConfirmDialog