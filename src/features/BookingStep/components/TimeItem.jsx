function TimeItem({
    Time,
    handleClick,
    Now,
    activeDate,
    activeTime
}){
    let className= "flex-box-row time-item nunito-text-md";
    let d = activeDate.format("D") - Time.get("D");
    let m = activeDate.format("M") - Time.format("M");
    let y = activeDate.get("y") - Time.get("y");
    // //console.log('time',activeTime);
    if((activeTime)&&Time.format('HH:mm:ss') === activeTime.format('HH:mm:ss')){
        className = className+" active ";
    }
    const removeActiveTime = () => {
        className = className+" disable ";
                handleClick();
    }
    if(y < 0){
        removeActiveTime()
        //console.log("y: "+ y);
    }
    //check active year with cr year
    else if (y === 0 ){
        if( m < 0 ){
            removeActiveTime()
        }
        else if( m === 0 ){
            if( d < 0){
                removeActiveTime()
            }
            else if(
                Time.format("D") === activeDate.format("D") &&
                Time.format('HH:mm:ss') <= Now.format('HH:mm:ss')
            ){
                className = className+" disable ";
            }
        }
    }
    
    return(
        <div className={className} onClick={()=>handleClick(Time)}>
            {Time.format('HH:mm')}
        </div>
    )
}
export default TimeItem;