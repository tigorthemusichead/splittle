export default function allNotNull (...args: any[]): boolean {
  return args.every((item) => item != null)
}
