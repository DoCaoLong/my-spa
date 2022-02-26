import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function LoadingBox({...props}){
    return( 
        <Skeleton {...props}/>
    
)
}
export default LoadingBox;