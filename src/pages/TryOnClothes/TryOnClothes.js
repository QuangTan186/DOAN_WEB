import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./TryOnClothes";
import Model from "./Model";
import { Canvas, useFrame  } from '@react-three/fiber';
import { OrbitControls,Preload } from '@react-three/drei';
import React, { useEffect, useState, useMemo, useRef, Suspense } from 'react';
import { Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import {IconShoe, IconShirt, IconGlass, IconTrouser} from "../../assets/icons/list-Icon";
import Box from '@mui/material/Box';
import { product2 } from "../../assets/images";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import PantModel from "./PantModel";
import ShirtModel from "./ShirtModel";
import ShoeModel from "./ShoeModel";
import { Plane } from "@react-three/drei";
import ObjectControls from "./ObjectControls";
import { useDispatch } from "react-redux";
import ProductAction from "../../redux/product/action";
import CanvasLoader from "./CanvasLoader";
const RotatingObject = (props) => {
    const groupRef = useRef();
  
    // Rotation state
    const [rotation, setRotation] = useState(0);
  
    // Update rotation on each frame
    useFrame(() => {
      groupRef.current.rotation.y += 0.008; // Adjust the rotation speed as desired
    });
  
    return (
      <group ref={groupRef}>
        {/* Add your object components here */}
        <Model position={[0, -0.8, 0]} />
        {
            // setpant3DUrl("https://res.cloudinary.com/dfzxz7xsy/image/upload/v1686984275/Clothes/tal_woman_nrw_pant_dgl8sq.glb")
            (props.pant3DUrl !== '' && props.pant3DUrl !== null && props.pant3DUrl !== undefined) &&
            <PantModel srcModel={props.pant3DUrl} position={[0, -0.8, 0]}/>   
        }
        {
            (props.shirt3DUrl !== '' && props.shirt3DUrl !== null && props.shirt3DUrl !== undefined) &&
            <ShirtModel srcModel={props.shirt3DUrl} position={[0, -0.8, 0]}/>
        }
        {
            (props.shoe3DUrl !== '' && props.shoe3DUrl !== null && props.shoe3DUrl !== undefined) &&
            <ShoeModel srcModel={props.shoe3DUrl} position={[0, -0.8, 0]}/>
        }
      </group>
    );
  };

function TryOnClothes(){
    const dispatch = useDispatch();
    const [itemProduct, setItemProduct] = React.useState([]);
    const [pant3DUrl, setPant3DUrl] = useState('');
    const [shirt3DUrl, setShirt3DUrl] = useState('');
    const [shoe3DUrl, setShoe3DUrl] = useState('');
    const [glass3DUrl, setGlass3DUrl] = useState('');
    const [stateButton, setStateButton] = useState();

    const handleClickTryOn = (payload) => {
        dispatch({
            type: ProductAction.GET_LIST_PRODUCT_BY_TYPE,
            data: { type: payload        },
            onSuccess: (data) => {
                setItemProduct(data?.data?.result ?? []);
                setStateButton(payload);
            },
        })
    }

    const handleClickObject = (payload) => {
        
        dispatch({
            type: ProductAction.GET_OBJECT3D_PRODUCT_DETAIL,
            data: { idProduct: payload.idProduct, idSize: payload.idSize},
            onSuccess: (data) => {
                switch(stateButton){
                    case 1:
                        setShirt3DUrl(data?.data?.result?.object3D);
                        break;
                    case 2:
                        setPant3DUrl(data?.data?.result?.object3D);
                        break;
                    case 3:
                        setShoe3DUrl(data?.data?.result?.object3D);
                        break;
                    case 4:
                        setGlass3DUrl(data?.data?.result?.object3D);
                        break;
                }   
            },
        })
    }

    return(
        <>
        <Header />
        <Grid container style={{width: '100%', overflowX: "hidden"}}>
            <Grid item xs={8}>
                <Canvas
                        colorManagement
                        shadows  // highlight-line
                        camera={{ position: [4, 3, 10.25], fov: 15, zoom: 1.25 }}
                        style={{
                            background: 'rgb(5,67,70)',
                            background: 'linear-gradient(25deg, rgba(5,67,70,1) 0%, rgba(13,39,49,1) 67%, rgba(49,20,70,1) 100%)',
                            // width: '100%',
                            height: '100vh',
                        }}
                    >
                        
                        {/* <fog attach="fog" args={["white", 0, 40]} /> */}
                        <ambientLight intensity={0.85} />
                        <ambientLight intensity={0.1} />
                        <directionalLight
                            intensity={1.5}
                            castShadow // highlight-line 
                            shadow-mapSize-height={512}
                            shadow-mapSize-width={512}
                            position={[7, 10, 7]}
                        />
                        {/* <pointLight position={[-10,0,-20]} intensity={.5}/>
                        <pointLight position={[0,-10,0]} intensity={1.5}/> */}

                        <group>
                        <mesh receiveShadow rotation={[-Math.PI / 2 , 0 , 0]} position={[0,-0.8,0]}>
                            <planeBufferGeometry attach='geometry' args={[100,100]}/>
                            <shadowMaterial attach='material' opacity={0.5} color="black"/>
                        </mesh>
                        </group>
                        <Suspense fallback={<CanvasLoader />}>
                        <RotatingObject  pant3DUrl={pant3DUrl} shirt3DUrl={shirt3DUrl} shoe3DUrl={shoe3DUrl}></RotatingObject>
                        {/* <ObjectControls ></ObjectControls> */}
                        <OrbitControls

                            />
                        </Suspense>
                        
                        {/* <Plane
                                receiveShadow
                                rotation={[-Math.PI / 2, 0, 0]}
                                position={[-1, -1, 0]}
                                args={[1000, 1000]}
                            >
                                <meshStandardMaterial attach="material" receiveShadow  transparent opacity={1}  />
                            </Plane>
                        <Preload all /> */}
                        
                </Canvas>
            </Grid>
            <Grid item xs={3} style={{backgroundColor: "#151622"}}>
                <Box sx={{ flexGrow: 1 }} style={{height: '100vh', overflow: 'auto', marginLeft: '15px'}} className={styles.ItemProduct}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(itemProduct).map((itemProd, index) => (
                        <Grid item xs={2} sm={4} md={4} style={{marginTop: "20px"}}
                                        onClick={() => 
                                            handleClickObject({idProduct: itemProd.id, idSize: 2})
                                            // setPant3DUrl("https://res.cloudinary.com/dfzxz7xsy/image/upload/v1686984275/Clothes/tal_woman_nrw_pant_dgl8sq.glb")
                                        } >
                                        <Card key={index} sx={{}} style={{width: "110px", marginBottom: "10px"}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    img src={itemProd.avtImageUrl}
                                                    alt="green iguana"
                                                />
                                            </CardActionArea>
                                        </Card>
                                    </Grid>

                        ))}
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={1} style={{backgroundColor: "#2a2d44", width: '10px', gridColumn: '110px', boxShadow: '0px 10px 10px 1px #aaaaaa'}}>
                <Grid 
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{marginTop: "35px"}}
                    >
                    <Grid item className={styles.IconItem}>
                        <Button onClick={() => handleClickTryOn(1)}>
                            <IconShirt/>
                        </Button>
                    </Grid>
                    <Grid item className={styles.IconItem}>
                        <Button onClick={() => handleClickTryOn(3)}>
                            <IconShoe/>
                        </Button>
                    </Grid>
                    <Grid item className={styles.IconItem} >
                        <Button onClick={() => handleClickTryOn(2)}>
                            <IconTrouser/>
                        </Button>
                    </Grid>
                    <Grid item className={styles.IconItem}>
                        <Button onClick={() => handleClickTryOn(4)}>
                            <IconGlass/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Footer/>
        </>
        ) 
}

export default TryOnClothes;