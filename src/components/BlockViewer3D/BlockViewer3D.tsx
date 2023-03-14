import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, ThreeElements } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function BlockViewer3D(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
      'images/Tiles107_1K_Color.jpg',
      'images/Tiles107_1K_Displacement.jpg',
      'images/Tiles107_1K_NormalDX.jpg',
      'images/Tiles107_1K_Roughness.jpg',
      'images/Tiles107_1K_AmbientOcclusion.jpg'
    ])
    //   useFrame((state, delta) => (ref.current.rotation.x += delta))
      useFrame((state, delta) => (ref.current.rotation.x += delta/10))



    return (
      <mesh
        {...props}
        ref={ref}
        rotation={[2, 1, 0]}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshStandardMaterial color={'#8cebaf'} transparent={true} opacity={0.2} /> */}
        <meshStandardMaterial
        displacementScale={0}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
      </mesh>
    )
}

export default BlockViewer3D;