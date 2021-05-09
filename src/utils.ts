export function joinClasses(...args: (string | undefined)[]) {
  return { className: [...args].join(" ") };
}
