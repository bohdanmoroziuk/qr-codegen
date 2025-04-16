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

export interface MailtoData {
  email: string
  subject: string
  body: string
}

export const createMailtoLink = (data: MailtoData) => {
  if (data.email === '') return ''

  const email = 'mailto:'.concat(encodeURIComponent(data.email))

  const params = new URLSearchParams()

  if (data.subject) params.append('subject', data.subject)
  if (data.body) params.append('body', data.body)

  const queryString = params.size === 0 ? '' : '?'.concat(params.toString())

  return email.concat(queryString)
}

export const parseMailtoLink = (link: string): MailtoData => {
  const data: MailtoData = {
    email: '',
    subject: '',
    body: '',
  }

  if (link === '') return data

  const [email, queryString] = link.split(':').at(1)!.split('?')

  if (email) {
    data.email = decodeURIComponent(email)
  }

  if (queryString) {
    const params = new URLSearchParams(queryString)
    const subject = params.get('subject')
    const body = params.get('body')

    if (subject) data.subject = subject
    if (body) data.body = body
  }

  return data
}
