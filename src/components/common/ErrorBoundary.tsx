import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorIcon } from "../../assets/Icons";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="alert alert-error">
            <ErrorIcon className="stroke-current shrink-0 h-6 w-6" />
            <div>
              <h3 className="font-bold">Error</h3>
              <div className="text-sm">
                {this.state.error?.message || "Something went wrong"}
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
