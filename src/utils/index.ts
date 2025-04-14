export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = () => {
      reject(new Error(reader.error?.message))
    }

    reader.readAsDataURL(file)
  })
}

export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    return error.message
  }

  return defaultMessage
}
