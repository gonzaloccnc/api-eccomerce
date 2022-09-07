import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const imageController = {
  async getImage(req, res) {
    const type = req.params.type
    const image = req.params.image
    const pathImage = path.resolve(
      __dirname,
      `../public/Images/${type}/${image}`
    )
    if (await fs.existsSync(pathImage)) {
      res.sendFile(pathImage)
    } else {
      res.status(404).json({ error: 'image not found' })
    }
  },
}

export default imageController
