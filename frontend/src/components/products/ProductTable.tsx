import  { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'

import  { Check, X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent } from '../ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import ConfirmDialog from './ConfirmDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProductForAdminAPI } from '../../api/modules/admin.api'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'


export interface ProductProp{
  product_id:string,
  name:string,
  description:string,
  image: string,
  price: number,
isFree: boolean,            
isSold: boolean,
isExchangeEnabled: boolean,
  user: {
    user_id: string,
    name: string,
    email: string,
  }
  category:{
    category_name:string
  }

}

const ProductTable = ({data}:{data:ProductProp[]}) => {

    const[show,setShow]=useState(false)
    const[productId,setProductId]=useState<string|undefined>(undefined)
    let total=0
    const queryClient=useQueryClient()
    const {mutate,isPending}=useMutation({
        mutationFn:(product_id:string)=> deleteProductForAdminAPI(product_id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['allProducts']})
            toast.success("Deleted successfully")
        },
        onError:()=>toast.error("Something went wrong")
    })

    const handleDelete=()=>{
      if(!productId) return
      mutate(productId)

    }
    


  return (
    <div className='bg-white p-3 w-full overflow-x-auto rounded-lg shadow-sm '>
      {show && <ConfirmDialog open={show} setOpen={setShow} message="Are you sure to delete this product?." onConfirm={handleDelete}/>}
<Table className="mx-auto">
  <TableCaption>A list of complete products.</TableCaption>
  <TableHeader>
    <TableRow>
       
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm hidden lg:table-cell">SI.NO</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">name</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm hidden lg:table-cell">category</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">description</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm hidden lg:table-cell">image</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">price</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm hidden lg:table-cell">isFree</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm hidden lg:table-cell">isSold</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm hidden md:table-cell">User</TableHead>
             <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">Action</TableHead>
       
    </TableRow>
  </TableHeader>
  <TableBody>
        {data.map((product,index)=>{
          total=product.price+total
          return(
          <TableRow key={product.product_id} className='text-xs sm:text-sm'>
            <TableCell className='pl-4 hidden lg:table-cell'>
              <Tooltip>
                <TooltipTrigger asChild>
                <p className='text-center'>{index+1}</p> 
                </TooltipTrigger>
                <TooltipContent>
                  <p>Product-ID: {product.product_id}</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell className='capitalize'>{product.name}</TableCell>
            <TableCell className='capitalize hidden lg:table-cell'>{product.category.category_name}</TableCell>
            <TableCell className='capitalize'>{product.description}</TableCell>
            <TableCell className='hidden lg:table-cell'>
              <img className='w-15 h-15' src={product.image} alt={product.name} />
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className='hidden lg:table-cell'>{product.isFree===true?<Badge className='bg-emerald-600 uppercase'>Free</Badge>:<Badge className='bg-slate-300 uppercase' variant={'secondary'}>Priced</Badge>}</TableCell>
            <TableCell className='hidden lg:table-cell'>{product.isSold===true?<Check className='text-emerald-400'/>:<X className='text-red-600'/>}</TableCell>
            <TableCell className='hidden md:table-cell'>
              <div className='flex flex-col'>

              <span>{product.user.email}</span>
              <span className='capitalize'>{product.user.name}</span>
              </div>
              </TableCell>
            <TableCell>
                <div className='flex space-x-3 '>
                  <Button className='rounded-3xl text-xs font-medium px-2.5 bg-red-500 hover:bg-red-400' disabled={isPending} onClick={(e)=>{
                    e.stopPropagation()
                    setShow(true)
                    setProductId(product.product_id)
        
                  }}>{isPending?"Processing":"Delete"}</Button>
                </div>
            </TableCell>
          </TableRow>
        )})}
    
  </TableBody>
    <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="text-end font-semibold">Total: {total}</TableCell>
        </TableRow>
      </TableFooter>
</Table>
    </div>
  )
}

export default ProductTable