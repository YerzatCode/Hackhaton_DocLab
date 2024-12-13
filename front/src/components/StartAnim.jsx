import { Power1, TweenMax } from "gsap"
import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const RevealEffect = () => {
  const canvasRef = useRef()
  const [isVisible, setIsVisible] = useState(true) // Контролирует видимость компонента

  const conf = {
    color: 0xffffff,
    objectWidth: 12,
    objectThickness: 3,
    ambientColor: 0xffffff,
    light1Color: 0xffffff,
    shadow: false,
    perspective: 75,
    cameraZ: 75,
  }

  let renderer,
    scene,
    camera,
    objects = []
  let geometry, material
  let width, height, cx, cy, wWidth, wHeight, nx, ny

  useEffect(() => {
    if (isVisible) {
      init()
      window.addEventListener("resize", onResize)
      return () => {
        window.removeEventListener("resize", onResize)
      }
    }
  }, [isVisible])

  const init = () => {
    const canvas = canvasRef.current
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    camera = new THREE.PerspectiveCamera(
      conf.perspective,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = conf.cameraZ

    scene = new THREE.Scene()
    geometry = new THREE.BoxGeometry(
      conf.objectWidth,
      conf.objectWidth,
      conf.objectThickness
    )

    initScene()
    animate()
  }

  const initScene = () => {
    onResize()
    scene.clear()
    initLights()
    initObjects()
  }

  const initLights = () => {
    scene.add(new THREE.AmbientLight(conf.ambientColor))
    const light = new THREE.PointLight(conf.light1Color)
    light.position.z = 100
    scene.add(light)
  }

  const initObjects = () => {
    objects = []
    nx = Math.round(wWidth / conf.objectWidth) + 1
    ny = Math.round(wHeight / conf.objectWidth) + 1

    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        material = new THREE.MeshLambertMaterial({
          color: conf.color,
          transparent: true,
          opacity: 1,
        })
        const mesh = new THREE.Mesh(geometry, material)
        const x = -wWidth / 2 + i * conf.objectWidth
        const y = -wHeight / 2 + j * conf.objectWidth
        mesh.position.set(x, y, 0)
        objects.push(mesh)
        scene.add(mesh)
      }
    }
    startAnim()
  }

  const startAnim = () => {
    objects.forEach((mesh) => {
      mesh.rotation.set(0, 0, 0)
      mesh.material.opacity = 1
      mesh.position.z = 0

      const delay = THREE.MathUtils.randFloat(1, 2)
      const rx = THREE.MathUtils.randFloatSpread(2 * Math.PI)
      const ry = THREE.MathUtils.randFloatSpread(2 * Math.PI)
      const rz = THREE.MathUtils.randFloatSpread(2 * Math.PI)

      TweenMax.to(mesh.rotation, 2, { x: rx, y: ry, z: rz, delay })
      TweenMax.to(mesh.position, 2, {
        z: 80,
        delay: delay + 0.5,
        ease: Power1.easeOut,
      })
      TweenMax.to(mesh.material, 2, { opacity: 0, delay: delay + 0.5 })
    })

    // Устанавливаем таймер для скрытия компонента через 3 секунды
    setTimeout(() => {
      setIsVisible(false)
    }, 4100)
  }

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  const onResize = () => {
    width = window.innerWidth
    cx = width / 2
    height = window.innerHeight
    cy = height / 2

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)

    const size = getRendererSize()
    wWidth = size[0]
    wHeight = size[1]
  }

  const getRendererSize = () => {
    const cam = new THREE.PerspectiveCamera(conf.perspective, camera.aspect)
    const vFOV = (cam.fov * Math.PI) / 180
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ)
    const width = height * cam.aspect
    return [width, height]
  }

  // Если компонент не виден, ничего не рендерим
  if (!isVisible) return null

  return (
    <div className="reveal-effect-container absolute h-screen top-0 z-20">
      <canvas id="reveal-effect" ref={canvasRef}></canvas>
    </div>
  )
}

export default RevealEffect
