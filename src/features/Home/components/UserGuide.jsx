
function UserGuide({
    item,
    slide,
    setSlide,
    setSlideIndex,
    goTosilide,
    step
}) {
    return (
        <div className="guided-section-step">
            <div className="step-content">
                <div className="step">
                    Bước {step + 1}
                </div>
                <div className="step-desc">
                    <span>{item.title}</span>
                </div>
            </div>
            <div className="step-slide">
                {/* <Slider {...settings}>
                        {
                            item.img.map((value, index) => (
                                <div
                                    key={index}
                                >
                                    <div className="step-img">
                                        <img src={value.url} alt={"step" + item.step + index} />
                                    </div>
                                    <div className="step-img-desc">
                                        <span>{value.desc}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider> */}
                {
                    item.img.map((value, index) => (
                        <div
                            key={index}
                        >
                            <div className="step-img">
                                <img src={value.url} alt={"step" + item.step + index} />
                            </div>
                            {/* <div className="step-img-desc">
                                    <span>{value.desc}</span>
                                </div> */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default UserGuide;