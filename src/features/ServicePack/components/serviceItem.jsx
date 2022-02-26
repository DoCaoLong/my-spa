// import Checkbox from '@mui/material/Checkbox';
export default function serviceItem(props){
    return(
      <>
      <div className="item flex-box-row">
        {/* <Checkbox
						checked={true}
						// onChange={}
						inputProps={{ 'aria-label': 'controlled' }}
					/> */}
        <div className="avatar-md">
          <img
            src={"https://picsum.photos/650/976?random="+1}
            alt="banner"
            className="image-size"
          />
        </div>
        <div className="service-info flex-box-col">
          <div className="padding-bottom-sm">
            <div className="address nunito-regular-text-bold-sm text-black-color font-weight-bold">
              Liệu trình trẻ hóa da công nghệ Thermage
            </div>
            <div className="name-spa nunito-text-sm mt-4 text-black-color">
              Kanessa Beayty &amp; Spa
            </div>
            <div className="rating flex-box-row">
              <div className="result flex-box-row align-item-center cus_service-pack-type service-time">
                <span className="text-black-color nunito-text-sm flex-box-row ">
                  Thời gian:
                  <div className="text-primary-color nunito-text-sm margin-left-sm">
                    2h
                  </div>
                </span>
                <div className="purple-dot" />
                <span className="text-black-color nunito-text-sm flex-box-row">
                  Số buổi:
                  <div className="text-primary-color nunito-text-sm margin-left-sm">
                    2h
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className="price flex-box-row">
            <span className="nunito-text-mmd text-primary-color">300.000đ</span>
          </div>
        </div>
      </div>
      <hr className="grey-line line-service-pack" />
    </>
    )
}