import { TextureLoader } from 'three'

export function getTexture(url: string) {
  const loader = new TextureLoader()

  return loader.load(url, undefined, undefined, function (err) {
    console.error('CANNOT LOAD TEXTURE', err)
  })
}
