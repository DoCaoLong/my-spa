import {useState} from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import serviceItem from './serviceItem';
const list=[
    {
        title: 'mini spa 1',
        img: 'asdasd'
    },
    {
        title: 'mini spa 1',
        img: 'asdasd'
    },
]
export default function Merchant(props){
    //console.log('props',props);
    const [checked, setChecked] = useState([false, false, true]);

    // const handleChange1 = (event) => {
    //     setChecked([event.target.checked, event.target.checked]);
    // };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };
    // const handleRootCheck = (event) => {
    //     var rs = false;
    //     return rs;
    // }
    function handleRootChange(event){
        // var rs = false;
        //console.log('event',event);
        return false;
    }
    // const children = (
    //     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    //       <FormControlLabel
    //         label=""
    //         control={<Checkbox classes="checkboxCustom" checked={checked[0]} onChange={handleChange2} />}
    //       />
    //       <FormControlLabel
    //         label=""
    //         control={<Checkbox classes="checkboxCustom" checked={checked[1]} onChange={handleChange3} />}
    //       />
    //     </Box>
    //   );
    return(
        <div className="Service-list-section">
            <FormControlLabel
                label={props.Name}
                control={
                <Checkbox
                    classes="checkboxCustom"
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0]!==checked[1]}
                    onChange={(e)=>handleRootChange(e)}
                />
                }
            />
             <hr className="purple-line" />
             <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                 {list?.map((value,index)=>(
                    <>
                    <FormControlLabel
                    label=""
                    control={<Checkbox classes="checkboxCustom" checked={checked[index]} onChange={handleChange2} />}
                    />
                    {serviceItem()}
                    </>
                 ))}
            </Box>

        </div>
    )
}