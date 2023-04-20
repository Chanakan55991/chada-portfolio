import * as THREE from 'https://unpkg.com/three@0.151.3/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.138.0/examples/jsm/controls/OrbitControls.js'

const notyf = new Notyf()

const scene = new THREE.Scene()

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const initialCameraPosition = new THREE.Vector3(
  50 * Math.sin(0.2 * Math.PI),
  10,
  50 * Math.cos(0.2 * Math.PI)
)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#tbg-1')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.copy(initialCameraPosition)

const target = new THREE.Vector3(-0.5, 1.2, 0)
camera.lookAt(target)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const mat = new THREE.MeshStandardMaterial({
  color: 0xFF6347
})
const torus = new THREE.Mesh(geometry, mat)

const ambientLight = new THREE.AmbientLight(0xccccccc, 1)
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
controls.target = target
controls.enableZoom = false

const star = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFFFF })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300))

  star.position.set(x, y, z)
  scene.add(star)
}

let stars = Array(300).fill().forEach(star)

let frame = 0

const render = () => {
  requestAnimationFrame(render)

  frame = frame <= 100 ? frame + 1 : frame

  if (frame <= 100) {
    const p = initialCameraPosition
    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

    camera.position.y = 10
    camera.position.x =
      p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
    camera.position.z =
      p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
    camera.lookAt(target)
  } else {
    controls.update()
  }

  torus.rotateX(0.01)
  torus.rotateY(0.01)
  torus.rotateZ(0.01)
  renderer.render(scene, camera)
}

render()

notyf.success('yo mf')

