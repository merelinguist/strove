import "tailwindcss/tailwind.css"

import LoginPage from "app/pages/login"
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import Inspx from "inspx"
import { Suspense } from "react"

const RootErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  if (error instanceof AuthenticationError) {
    return <LoginPage resetErrorBoundary={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}

const Fallback = () => (
  <svg
    className="animate-spin absolute h-10 w-10 text-blue-600"
    style={{ top: "50%", left: "50%" }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Inspx>
    <div className="antialiased text-gray-900">
      <Suspense fallback={Fallback}>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          onReset={useQueryErrorResetBoundary().reset}
        >
          <Component {...pageProps} />
        </ErrorBoundary>
      </Suspense>
    </div>
  </Inspx>
)

export default MyApp
