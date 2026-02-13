import {
  ErrorComponent,
  Link,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Button } from "./ui/button";

export function DefaultCatchBoundry({ error }: ErrorComponentProps) {
  console.error("DefaultCatchBoundary Error:", error);
  return (
    <div>
      <ErrorComponent error={error} />

      <Button variant="destructive" asChild>
        <Link to="/">Try Again</Link>
      </Button>
    </div>
  );
}
