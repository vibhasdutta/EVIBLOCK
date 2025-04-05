export function Dialog({ children }) {
  return <div className="dialog">{children}</div>;
}

export function DialogContent({ children }) {
  return <div className="dialog-content">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="dialog-header">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="dialog-title">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="dialog-description">{children}</p>;
}