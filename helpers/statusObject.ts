type FailReturnType = {
  error: {
    message?: string
    status?: number
  }
}

export type StatusObject<ReturnType> = (ReturnType | FailReturnType) & {
  success: boolean
}

export function StatusSuccess <ReturnType> (arg: ReturnType): ReturnType & {success: boolean} {
  return {
    ...arg,
    success: true
  }
}

export function StatusFail(error?: Error, errorCode?: number) {
  return {
    error: {
      message: error?.message,
      status: errorCode
    },
    success: false
  }
}
