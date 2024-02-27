export default function allNotNull (...args: any[]): boolean {
  return args.every(Boolean)
}
