import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { TextLabel } from "@findxdn/erp-theme";
function Accessories(props)
{
    const { control, errors = null } = props
    return (
        <div>
            <div>
                <div>
                    <TextLabel>
                        Thương hiệu
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: {...rest } }) => (
                            <TextField
                                {...rest}
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="brand"
                    />
                    {errors?.Chip?.type === "required" && (
                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập thương hiệu sản phẩm! </p>)}
                </div>
                <div>
                    <TextLabel>
                        Xuất xứ
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                // label='Nhập cân nặng'
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="Origin"
                    />
                </div>
                <div>
                    <TextLabel>
                        Chất liệu
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                // label='Nhập cân nặng'
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="material"
                    />
                </div>
                <div>
                    <TextLabel>
                        Kiểu mẫu
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="type"
                    />
                </div>
                <div>
                    <TextLabel>
                        Mùa
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="season"
                    />
                </div>
                <div>
                    <TextLabel>
                        Phong cách
                    </TextLabel>
                    <Controller
                        control={control}
                        render={({ field: { ...rest } }) => (
                            <TextField
                                {...rest}
                                variant="outlined"
                                sx={{ width: '400px' }}
                                InputLabelProps={{ style: { fontSize: 13 } }}
                            />
                        )}
                        name="style"
                    />
                </div>
            </div>
        </div>    
    )
}

export default Accessories