
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

export default function PaginationContainer({page,count,searchBook}: {page: number, count: number, searchBook?: string}) {
    const range = 3;
    const startPage = Math.max(1, +page - range);
    const endPage = Math.min(count, +page + range);


 return (
<Pagination>
      <PaginationContent>
        {
          page > 1 &&
        <PaginationItem>
          <PaginationPrevious href={`?page=${page - 1}${ searchBook ? `&search-book=${searchBook}` : ""}`} />
        </PaginationItem>
        }

        {startPage > 1 && 
       <PaginationItem>
        <PaginationLink>...</PaginationLink>
      </PaginationItem>
      }
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <PaginationItem key={index} className={`${page == pageNumber ? "bg-gray-300 rounded" : ""}`}>

            <PaginationLink href={`?page=${pageNumber}${ searchBook ? `&search-book=${searchBook}` : ""}`}>{pageNumber}</PaginationLink>
  
          </PaginationItem>
        );
      })}
      {endPage < count &&
      <PaginationItem>
        <PaginationLink>...</PaginationLink>
      </PaginationItem>
      }

      {
        page < count &&
        <PaginationItem>
          <PaginationNext href={`?page=${page + 1}${ searchBook ? `&search-book=${searchBook}` : ""}`} />
        </PaginationItem>
        
      }

      </PaginationContent>
    </Pagination>
        )
}