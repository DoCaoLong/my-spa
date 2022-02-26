import React from 'react';
import img from '../../constants/imageList';

function PageNullResult(props) {
      const {title, text} = props;
      return (
            <div className="cus-page_no">
                  <span dangerouslySetInnerHTML={{__html: title}}>
                  </span>
                  <p style={{whiteSpace:'pre-line'}} dangerouslySetInnerHTML={{__html: text}}>
                  </p>
                  <img src={img.imageNullResult} alt=""/>
            </div>
      );
}

export default PageNullResult;