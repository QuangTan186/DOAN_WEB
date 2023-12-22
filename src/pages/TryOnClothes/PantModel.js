import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function PantModel(props) {
  const { nodes, materials } = useGLTF(props.srcModel)
  return (
    <group {...props} dispose={null} scale={0.01}>
      <mesh castShadow geometry={nodes.Component_Pant.geometry} material={materials['Wolf3D_Outfit_Bottom.001']} />
    </group>
  )
}