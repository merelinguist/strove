import { render as defaultRender } from "@testing-library/react"
import { renderHook as defaultRenderHook } from "@testing-library/react-hooks"
import { BlitzProvider, BlitzRouter, RouterContext } from "blitz"

type DefaultParams = Parameters<typeof defaultRender>
type RenderUI = DefaultParams[0]
type RenderOptions = DefaultParams[1] & { router?: Partial<BlitzRouter>; dehydratedState?: unknown }

type DefaultHookParams = Parameters<typeof defaultRenderHook>
type RenderHook = DefaultHookParams[0]
type RenderHookOptions = DefaultHookParams[1] & {
  router?: Partial<BlitzRouter>
  dehydratedState?: unknown
}

export const render = (
  ui: RenderUI,
  { wrapper, router, dehydratedState, ...options }: RenderOptions = {}
) => {
  if (!wrapper) {
    wrapper = ({ children }) => (
      <BlitzProvider dehydratedState={dehydratedState}>
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
          {children}
        </RouterContext.Provider>
      </BlitzProvider>
    )
  }

  return defaultRender(ui, { wrapper, ...options })
}

export const renderHook = (
  hook: RenderHook,
  { wrapper, router, dehydratedState, ...options }: RenderHookOptions = {}
) => {
  if (!wrapper) {
    wrapper = ({ children }) => (
      <BlitzProvider dehydratedState={dehydratedState}>
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
          {children}
        </RouterContext.Provider>
      </BlitzProvider>
    )
  }

  return defaultRenderHook(hook, { wrapper, ...options })
}

export const mockRouter: BlitzRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  params: {},
  query: {},
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}
