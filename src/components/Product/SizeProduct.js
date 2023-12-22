import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const ColorToggleButton = React.forwardRef((props, _ref) => {
  const [alignment, setAlignment] = React.useState();
  const handleChange = (
    event,
    newAlignment
  ) => {
    setAlignment(newAlignment);
  };
  React.useImperativeHandle(_ref, () => ({
    getChildValue: ()=>{
      return alignment;
    }
  }));

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {
        props.listItem.map((item) => {return <ToggleButton value={item.id} style={{ width: 50, height: 30, marginRight: 10, fontSize: 10, fontWeight: 800, color: 'black'}}>{item.color ?? item.size}</ToggleButton> })
      }
    </ToggleButtonGroup>
  );
})  

export default React.memo(ColorToggleButton);