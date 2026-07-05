import { Component,type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-zinc-100">
          <div className="w-full max-w-md rounded-xl border border-zinc-900 bg-zinc-950 p-8 shadow-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              System Error
            </span>

            <h1 className="mt-3 text-2xl font-bold">
              Something went wrong
            </h1>

            <p className="mt-3 font-mono text-sm text-zinc-400">
              An unexpected error occurred while loading this page.
              Please refresh and try again.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg border border-zinc-800 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}