import cx from "classix"

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

const Pagination = ({ page, pageContent }: { page: number; pageContent: number }) => {
  return (
    <PaginationRoot>
      <PaginationContent>
        {/* <>{console.log("pageContent", pageContent)}</> */}
        {page === 1 || page === 2 ? (
          <>
            {/* <PaginationItem>
                    <PaginationPrevious to='#' />
                  </PaginationItem> */}
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <PaginationItem key={i} className={cx(page === i + 1 && "rounded-lg border")}>
                  <PaginationLink href={`?page=${i + 1}`}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
            </>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          </>
        ) : (
          <>
            {page === pageContent ? (
              <>
                <PaginationItem>
                  <PaginationPrevious href={`?page=${page - 1}`} />
                </PaginationItem>
                <>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <PaginationItem
                      key={i}
                      className={cx(page === pageContent - 2 + i && "rounded-lg border")}
                    >
                      <PaginationLink href={`?page=${pageContent - 2 + i}`}>
                        {pageContent - 2 + i}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </>
              </>
            ) : (
              <>
                <PaginationItem>
                  <PaginationPrevious href={`?page=${Number(page) - 1}`} />
                </PaginationItem>
                <>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <PaginationItem
                      key={i}
                      className={cx(page === page - 1 + i && "rounded-lg border")}
                    >
                      <PaginationLink href={`?page=${Number(page) - 1 + i}`}>
                        {Number(page) - 1 + i}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href={`?page=${Number(page) + 1}`} />
                </PaginationItem>
              </>
            )}
          </>
        )}
        {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext to='#' />
              </PaginationItem> */}
      </PaginationContent>
    </PaginationRoot>
  )
}

export default Pagination
