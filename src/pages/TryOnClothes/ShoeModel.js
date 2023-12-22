
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ShoeModel(props) {
  const { nodes, materials } = useGLTF(props.srcModel)
  return (
    <group {...props} dispose={null} scale={0.01} >
      <mesh castShadow geometry={nodes.Component_Shoe.geometry} material={materials['Wolf3D_Outfit_Footwear.001']}/>
    </group>
  )
}

