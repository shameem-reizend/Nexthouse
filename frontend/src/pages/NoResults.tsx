import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty"

export function NoResults() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-14">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>No Results Found</EmptyTitle>
        <EmptyDescription>
          This user currently have no data related to this page.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
