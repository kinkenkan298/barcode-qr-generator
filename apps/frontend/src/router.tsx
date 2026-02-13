import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundry } from "./components/default-catch-boundry";
import { NotFound } from "./components/not-found";
import { queryClient } from "./lib/query-client";

// Create a new router instance
export const getRouter = () => {
  const router = routerWithQueryClient(
    createRouter({
      routeTree,
      context: { queryClient },

      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      defaultStructuralSharing: true,
      scrollRestoration: true,
      defaultErrorComponent: DefaultCatchBoundry,
      defaultNotFoundComponent: () => <NotFound />,
    }),
    queryClient,
  );

  return router;
};
