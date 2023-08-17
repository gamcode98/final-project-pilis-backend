import qrcode from 'qrcode'

export async function generateQR (text: string) {
  return await new Promise<string>((resolve, reject) => {
    qrcode.toDataURL(text, (err, url) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}
