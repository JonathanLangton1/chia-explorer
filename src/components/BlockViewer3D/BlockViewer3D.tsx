import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

function BlockViewer3D(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    //   useFrame((state, delta) => (ref.current.rotation.x += delta))
      useFrame((state, delta) => (ref.current.rotation.x += delta/10))
      useFrame((state, delta) => (ref.current.rotation.z -= delta/10))



    return (
      <mesh
        {...props}
        ref={ref}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'#8cebaf'} />
      </mesh>
    )
}

export default BlockViewer3D;