/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import img from '../../../../constants/imageList';
import favorite from '../../../../apis/favoriteApi';
import organizationApi from '../../../../apis/organizationApi';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Favorites(props) {
      const params = useParams();
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';
      const [likeAnimate, setLikeAnimate] = useState(false)
      const [dataLike, setDataLike] = useState({
            like:false,
            faCount:0
      })


      async function handleGetOrg() {
            const response = await organizationApi.getById({ id: params.id, token: tk })
            setDataLike({
                  like:response.data.context.is_favorite,
                  faCount:response.data.context.favorites_count
            })
      }

      async function handleLikeApi(like) {
            if (dataLike.like === true) {
                  setDataLike({...dataLike, like:false})
                  try {
                        await favorite.orgDisLike(params.id, tk)
                  } catch (err) {
                        console.log(err)
                        setLikeAnimate(false);
                  }

            } else {
                  setLikeAnimate(true)
                  setDataLike({...dataLike, like:true})
                  try {
                        await favorite.orgLike(params.id, tk)
                  } catch (err) {
                        console.log(err);
                  }
            }
            handleGetOrg()
      }
      const handleLike = () => {
            setLikeAnimate(!dataLike.like)
            handleLikeApi()
      }
      useEffect(() => {
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            handleGetOrg()
            return () => {
                  source.cancel()
            }
      }, [])
      useEffect(() => {
            const heartAnimation = document.querySelector('.animation-heart');
            document.querySelector('.animation-heart__box');
            const heart = document.querySelector('.img-like img');
            if (likeAnimate === true) {
                  heartAnimation.classList.add('animation');
                  heart.src = img.heart;
                  setTimeout(() => {
                        document.querySelector('.animation-heart__box').classList.add('none');
                  }, [1200])
            } else {
                  heartAnimation.classList.remove('animation');
                  heart.src = img.unLike;
                  document.querySelector('.animation-heart__box').classList.remove('none')
            }
      }, [likeAnimate, tk])
      return (
            <div className="flex-row org-de-favorites">
                  <div className="flex-row img-like">
                        <img
                              onClick={handleLike}
                              src={dataLike.like === false ? img.unLike : img.heart}
                              alt="" />
                        <span className="text-black-color nunito-text-sm org-favorite__count">
                              {dataLike.faCount}
                        </span>
                        <div onDoubleClick={handleLike} className="animation-heart__box">
                              <div className="animation-heart"></div>
                        </div>
                  </div>
                  {/* <div className="flex-row img-share">
                        <img src={img.send} alt="" />
                  </div> */}
            </div>
            // <Error
            //       open={openError.openOther}
            //       setOpen={setOpenError}
            //       error={openError.error}
            // />
      );
}

export default Favorites;