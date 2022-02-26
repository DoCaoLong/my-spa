function Dayth({index, day, crDate, setactiveDate, setDayObj}) {
    function handleClick(){
        //console.log('date',crDate.day(index).format("YYYY-MM-DD"));
        setactiveDate(crDate.day(index));
        setDayObj(crDate.day(index));
    }
    const weekdaysShort = [
        "T2", "T3", "T4", "T5", "T6",
        "T7","CN"
    ];
    
    return(
        <div className={((day === crDate.format("D"))?"active ":"") + "flex-box-col date text-black-color"} onClick={handleClick}>
            
            <div className="text-grey-color nunito-text-md">{(weekdaysShort[index-1])||"CN"}</div>
            <div className="nunito-text-md">{day}</div>
            
        </div>
    )
}
export default Dayth;