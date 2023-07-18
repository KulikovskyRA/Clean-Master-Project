import React, { useEffect, useState } from 'react';
import { Element, scroller } from 'react-scroll';
import { Link } from 'react-router-dom';
import {
  TeamOutlined,
  SafetyOutlined,
  DollarOutlined,
  LikeOutlined,
  UsergroupAddOutlined,
  SmileOutlined,
  HeartOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import video from '../../../public/vid2.webm';
import { Button, Space, ConfigProvider, Divider } from 'antd';
import UserOrdersTabs from '../../components/UserOrdersTabs/UserOrdersTabs';
import Navbar from '../../components/Navbar/Navbar';
import { Typography } from 'antd';

const Paralax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll('.top-item');
      const windowHeight = window.innerHeight;

      items.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        if (itemPosition < windowHeight * 0.75) {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
          item.style.transitionDelay = `${index * 0.2}s`;
        } else {
          item.style.opacity = 0;
          item.style.transform = 'translateY(30px)';
          item.style.transitionDelay = '0s';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBlock = () => {
    scroller.scrollTo('block', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const handleSliderMove = (event) => {
      const container = document.getElementById('sliderContainer');
      const containerWidth = container.offsetWidth;
      const xPos = event.clientX - container.getBoundingClientRect().left;
      const percentage = (xPos / containerWidth) * 100;
      setSliderPosition(percentage);
    };

    const handleSliderRelease = () => {
      window.removeEventListener('mousemove', handleSliderMove);
      window.removeEventListener('mouseup', handleSliderRelease);
    };

    const handleSliderClick = (event) => {
      window.addEventListener('mousemove', handleSliderMove);
      window.addEventListener('mouseup', handleSliderRelease);
    };

    const sliderContainer = document.getElementById('sliderContainer');
    sliderContainer.addEventListener('mousedown', handleSliderClick);

    return () => {
      sliderContainer.removeEventListener('mousedown', handleSliderClick);
      window.removeEventListener('mousemove', handleSliderMove);
      window.removeEventListener('mouseup', handleSliderRelease);
    };
  }, []);

  const [isPlanRoomVisible, setIsPlanRoomVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const planRoom = document.querySelector('.plan-room-img');
      const planRoomPosition = planRoom.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (planRoomPosition < windowHeight * 0.2) {
        setIsPlanRoomVisible(true);
      } else {
        setIsPlanRoomVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [isPlanRoom2Visible, setIsPlanRoom2Visible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const planRoom2 = document.querySelector('.plan-room-img2');
      const planRoom2Position = planRoom2.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (planRoom2Position < windowHeight * 0.7) {
        setIsPlanRoom2Visible(true);
      } else {
        setIsPlanRoom2Visible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div id="parallax-world-of-ugg">
        <section>
          <div className="parallax-one">
            <div className="main-title">CLEAN MASTER </div>
            <div className="sec-title">УБОРКА КВАРТИР В ТАШКЕНТЕ</div>
            <br />
            <div className="btn-box">
              <button className="btn-go" onClick={scrollToBlock}>
                Заказать уборку
              </button>
            </div>
          </div>
        </section>
        <section className="clining-contanier">
          <div id="cleaning-block" className="block">
            <p>
              <span className="first-character ny">I</span>{' '}
              <div className="text">ЧТО ВХОДИТ В УБОРКУ?</div>
            </p>
          </div>

          <div className="photo-box">
            <div className="oneCard">
              <img className="photo-use" src="/1.jpeg" alt="" />
              <div className="text1">Влажная уборка </div>
            </div>

            <div className="oneCard">
              <img className="photo-use" src="/2.jpeg" alt="" />

              <div className="text1">Чистка ковра и мебели</div>
            </div>

            <div className="oneCard">
              <img className="photo-use" src="/3.jpeg" alt="" />
              <div className="text1">Уборка кухни</div>
            </div>

            <div className="oneCard">
              <img className="photo-use" src="/4.jpeg" alt="" />
              <div className="text1">
                Дезинфекция <br /> сантехники и зеркал
              </div>
            </div>
          </div>
          <div className="before">РЕЗУЛЬТАТ ДО И ПОСЛЕ</div>
          <br />
          <div className="slider-container" id="sliderContainer">
            <img
              src="./nenorm.jpg"
              className="image"
              id="imageBefore"
              alt="Before"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />
            <div className="slider">
              <div
                className="slider-handle"
                id="sliderHandle"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="title-slider">CLEAN MASTER</div>
              </div>
            </div>
            <img
              src="./norm.jpg"
              className="image"
              id="imageAfter"
              alt="After"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            />
          </div>
        </section>

        {/*  */}

        <div className="border"></div>

        <div className="border"></div>
        <div className="video-container">
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              zIndex: '-1',
              border: '1px red solid',
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
          <section className="section">
            <div className="block">
              <p className="text">
                <span className="first-character " style={{ color: 'white' }}>
                  I
                </span>{' '}
                <div id="plus" className="text" style={{ color: 'white' }}>
                  ПОЧЕМУ СТОИТ ДОВЕРИТЬ УБОРКУ НАМ?
                </div>
              </p>

              <p className="margin-top-10">
                <div className="box-top">
                  <Element name="item1">
                    <div className="top-item animate">
                      <p className="img-item">
                        <TeamOutlined
                          style={{
                            fontSize: '38px',
                            color: 'black',
                          }}
                        />
                      </p>
                      <div className="top-item-text">ОПЫТНЫЕ КЛИНЕРЫ</div>
                      <br />
                      <div className="pluses">
                        Все наши сотрудники <br /> прошли обучение и соблюдают
                        стандарты уборки
                      </div>
                    </div>
                  </Element>
                  <Element name="item2">
                    <div className="top-item">
                      <p className="img-item">
                        <SafetyOutlined
                          style={{
                            fontSize: '42px',
                            color: 'black',
                          }}
                        />
                      </p>
                      <div className="top-item-text">ГАРАНТИЯ КАЧЕСТВА</div>
                      <br />
                      <div className="pluses">
                        Клинер исправит недочёты, если вам не понравится
                        результат
                      </div>
                    </div>
                  </Element>
                  <div className="top-item ">
                    <p className="img-item">
                      <DollarOutlined
                        style={{
                          fontSize: '38px',
                          color: 'black',
                        }}
                      />
                    </p>
                    <div className="top-item-text">ЧЕСТНАЯ ЦЕНА</div>
                    <br />
                    <div className="pluses">
                      Стоимость уборки зависит <br /> от количества комнат{' '}
                      <br />и количества услуг
                    </div>
                  </div>
                  <div className="top-item ">
                    <p className="img-item">
                      <LikeOutlined
                        style={{
                          fontSize: '38px',
                          color: 'black',
                        }}
                      />
                    </p>
                    <div className="top-item-text">БЕЗ ПРЕДОПЛАТЫ</div>
                    <br />
                    <div className="pluses">
                      Вы платите за услугу только после завершения уборки
                    </div>
                  </div>
                  <div className="top-item">
                    <p className="img-item">
                      <UsergroupAddOutlined
                        style={{
                          fontSize: '38px',
                          color: 'black',
                        }}
                      />
                    </p>
                    <div className="top-item-text">ДОВЕРИЕ</div>
                    <br />

                    <div className="pluses">
                      Клинер может взять ключи <br /> и сделать уборку без
                      вашего присутствия
                    </div>
                  </div>
                  <div className="top-item">
                    <p className="img-item">
                      <SmileOutlined
                        style={{
                          fontSize: '38px',
                          color: 'black',
                        }}
                      />
                    </p>
                    <div className="top-item-text">НАДЁЖНОСТЬ</div>
                    <br />
                    <div className="pluses">
                      Компенсируем ущерб, <br /> если что-то пойдет не так
                    </div>
                  </div>
                  <div className="top-item">
                    <p className="img-item">
                      <HeartOutlined
                        style={{
                          fontSize: '38px',
                          color: 'black',
                        }}
                      />
                    </p>
                    <div className="top-item-text">БЕЗОПАСНОСТЬ</div>
                    <br />
                    <div className="pluses">
                      Гипоаллергенны <br /> и не вредят питомцам
                    </div>
                  </div>
                  <div className="top-item">
                    <p className="img-item">
                      <GiftOutlined
                        style={{
                          fontSize: '38px',
                          color: 'black',
                        }}
                      />
                    </p>
                    <div className="top-item-text">СИСТЕМА ЛОЯЛЬНОСТИ</div>
                    <br />
                    <div className="pluses">Для постоянных клиентов скидки</div>
                  </div>
                </div>
              </p>
            </div>
          </section>
        </div>
        <div className="border"></div>

        <section style={{ background: 'none' }}>
          <Element name="block" className="block">
            <div id="price" className="block">
              <div
                className={`plan-room-img ${isPlanRoomVisible ? 'show' : ''}`}
                style={{
                  backgroundImage:
                    "url('https://www.pngkit.com/png/full/17-178368_view-more-ouf-ourprojects-construction-house-drawing-png.png')",
                }}
              ></div>
              <p>
                <span className="first-character ny">I</span>
                <div className="text">СКОЛЬКО СТОИТ УБОРКА?</div>

                <ul className="list">
                  <li className="text2">
                    <div className="room">1 комната</div>
                    <div className="price-room"> от 249 000 UZS</div>
                  </li>
                  <li className="text2">
                    <div className="room">2 комнаты</div>
                    <div className="price-room"> от 299 000 UZS</div>
                  </li>
                  <li className="text2">
                    <div className="room">3 комнаты</div>
                    <div className="price-room">от 349 000 UZS</div>
                  </li>
                  <li className="text2">
                    <div className="room">4+ комнаты</div>
                    <div className="price-room">от 399 000 UZS</div>
                  </li>
                </ul>
                <br />
                <br />

                <ul style={{ marginTop: '-50px' }}>
                  <div
                    className="text"
                    style={{
                      marginLeft: '-15px',
                      fontWeight: 600,
                      fontSize: '28px',
                    }}
                  >
                    Дополнительные услуги:
                  </div>
                  <li className="text3">Мытье окон +25 000 UZS за одно окно</li>
                  <li className="text3">Уборка балкона +30 000 UZS</li>
                  <li className="text3">
                    Помыть внутри холодильника +15 000 UZS
                  </li>
                  <li className="text3">Помыть духовку +15 000 UZS</li>
                  <li className="text3">Помыть микроволновку +10 000 UZS</li>
                  <li className="text3">Глажка 40 000 UZS за час</li>
                </ul>
              </p>
              <div
                className={`plan-room-img2 ${isPlanRoom2Visible ? 'show' : ''}`}
                style={{
                  backgroundImage: "url('room4.png')",
                }}
              ></div>
            </div>
          </Element>
          <div className="border"></div>
          <div className="parallax-two">
            <h2>
              ЗАНИМАЙТЕСЬ ЛЮБИМЫМ ДЕЛОМ, <br /> А УБОРКУ ДОВЕРЬТЕ НАМ
            </h2>
          </div>
        </section>

        {/* ФУТЕР */}

        <section className="footer">
          <div className="first-box">
            <div className="link-title">Меню</div>
            <a className="link-footer" href="/">
              Главная
            </a>
            <a className="link-footer" href="#plus">
              О компании
            </a>

            <Link className="link-footer" to="/jobs">
              Вакансии
            </Link>

            <a className="link-footer" href="#price">
              Цены
            </a>
          </div>

          <div className="contact-box">
            <div className="link-title">Контакты</div>
            <a className="link-footer" href="tel:8 800-2222-945">
              8 800-2222-945
            </a>
            <a className="link-footer" href="tel:8 (921) 928-72-58">
              8 (921) 928-72-58
            </a>
            <a className="link-footer" href="mailto:info@clean-master.com">
              info@clean-master.com
            </a>
            <div className="social">
              <a href="https://www.instagram.com/cleanmastergt/">
                <img className="soc-png" src="./s1.png" alt="" />
              </a>
              <a href="https://vk.com/club134865736">
                <img className="soc-png" src="./s2.png" alt="" />
              </a>
              <a href="https://web.telegram.org/a/#-1751514282">
                <img className="soc-png" src="./s4.png" alt="" />
              </a>
              <a className="link-footer" href="https://web.whatsapp.com/">
                <img className="soc-png" src="./s5.png" alt="" />
              </a>
            </div>
          </div>

          <div className="three-box">
            <div className="link-title">Способы оплаты</div>
            <div className="pays-box">
              <img className="pay1" src="./p1.png" alt="" />
              <img className="pay" src="./p2.png" alt="" />
              <img className="pay" src="./p3.png" alt="" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Paralax;
