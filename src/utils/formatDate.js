//2021-12-24 08:43:39
function formatDate(dateParams){
      const dateArr = dateParams?.split(' ');
      const date = dateArr[0]?.split('-')?.reverse().join('/')
      return date
}
export default formatDate;