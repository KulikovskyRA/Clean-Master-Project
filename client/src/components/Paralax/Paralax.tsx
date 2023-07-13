import React from 'react';
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

const Paralax = () => {
  return (
    <>
      <div id="parallax-world-of-ugg">
        <section>
          <div className="parallax-one">
            <div className="main-title">CLEAN MASTER </div>
            <div className="sec-title">УБОРКА КВАРТИР В ТАШКЕНТЕ</div>
            <br />
            <div className="btn-box">
              <button className="btn-go">ЗАКАЗАТЬ УБОРКУ</button>
            </div>
          </div>
        </section>

        <section>
          <div className="block">
            <p className="text">
              <span className="first-character ">I</span>{' '}
              <div className="text">ПОЧЕМУ СТОИТ ДОВЕРИТЬ УБОРКУ НАМ?</div>
            </p>

            <p className="margin-top-10">
              <div className="box-top">
                <div className="top-item">
                  <p className="img-item">
                    <TeamOutlined
                      style={{
                        fontSize: '38px',
                        color: 'rgb(30, 61, 119)',
                      }}
                    />
                  </p>
                  <div className="top-item-text">ОПЫТНЫЕ КЛИНЕРЫ</div>
                  <br />
                  <div>
                    Все наши сотрудники <br /> прошли обучение и соблюдают
                    стандарты уборки
                  </div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <SafetyOutlined
                      style={{ fontSize: '42px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">ГАРАНТИЯ КАЧЕСТВА</div>
                  <br />
                  <div>
                    Клинер исправит недочёты, если вам не понравится результат
                  </div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <DollarOutlined
                      style={{ fontSize: '38px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">ЧЕСТНАЯ ЦЕНА</div>
                  <br />
                  <div>
                    Стоимость уборки зависит <br /> от количества комнат <br />и
                    наличия доп. услуг
                  </div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <LikeOutlined
                      style={{ fontSize: '38px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">БЕЗ ПРЕДОПЛАТЫ</div>
                  <br />
                  <div>Вы платите за услугу только после завершения уборки</div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <UsergroupAddOutlined
                      style={{ fontSize: '38px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">ДОВЕРИЕ</div>
                  <br />

                  <div>
                    Клинер может взять ключи <br /> и сделать уборку без вашего
                    присутсвия
                  </div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <SmileOutlined
                      style={{ fontSize: '38px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">НАДЁЖНОСТЬ</div>
                  <br />
                  <div>
                    Компенсируем ущерб, <br /> если что-то пойдет не так
                  </div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <HeartOutlined
                      style={{ fontSize: '38px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">БЕЗОПАСНОСТЬ</div>
                  <br />
                  <div>
                    Гипоаллергенны <br /> и не вредят питомцам
                  </div>
                </div>
                <div className="top-item">
                  <p className="img-item">
                    <GiftOutlined
                      style={{ fontSize: '38px', color: 'rgb(30, 61, 119)' }}
                    />
                  </p>
                  <div className="top-item-text">СИСТЕМА ЛОЯЛЬНОСТИ</div>
                  <br />
                  <div>Для постоянных клиентов скидки</div>
                </div>
              </div>
            </p>
          </div>
        </section>

        <section>
          <div className="parallax-two">
            <h2>
              ЗАНИМАЙТЕСЬ ЛЮБИМЫМ ДЕЛОМ, <br /> А УБОРКУ ДОВЕРЬТЕ НАМ
            </h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p>
              <span className="first-character ny">I</span>{' '}
              <div className="text">ЧТО ВХОДИТ В УБОРКУ?</div>
            </p>
          </div>

          <div className="photo-box">
            <div className="oneCard">
              <div className="block-block"></div>
              <img className="photo-use" src="/public/1.jpeg" alt="" />
              <div className="text1">Влажная уборка поверхностей</div>
            </div>

            <div className="oneCard">
              <img className="photo-use" src="/public/2.jpeg" alt="" />

              <div className="text1">Чистка ковра и мебели</div>
            </div>

            <div className="oneCard">
              <img className="photo-use" src="/public/3.jpeg" alt="" />
              <div className="text1">Уборка кухни</div>
            </div>

            <div className="oneCard">
              <img className="photo-use" src="/public/4.jpeg" alt="" />
              <div className="block-block2"></div>
              <div className="text1">Дезинфекция сантехники и зеркал</div>
            </div>
          </div>
        </section>

        <div className="block">
          <p>
            <span className="first-character ny">I</span>
            <div className="text">СКОЛЬКО СТОИТ УБОРКА?</div>

            <ul className="list">
              <li className="text2">
                <div className="room">1 комната:</div>
                <div className="price-room"> от 249 000 UZS</div>
              </li>
              <li className="text2">
                <div className="room">2 комнаты:</div>
                <div className="price-room"> от 299 000 UZS</div>
              </li>
              <li className="text2">
                <div className="room">3 комнаты:</div>
                <div className="price-room">от 349 000 UZS</div>
              </li>
            </ul>
            <br />
            <br />
            <div className="text">Дополнительные услуги:</div>
            <ul>
              <li className="text3">Мытье окон +25 000 UZS за одно окно</li>
              <li className="text3">Уборка балкона +30 000 UZS</li>
              <li className="text3">Помыть внутри холодильника +15 000 UZS</li>
              <li className="text3">Помыть духовку +15 000 UZS</li>
              <li className="text3">Помыть микроволновку +10 000 UZS</li>
              <li className="text3">Глажка 40 000 UZS за час</li>
            </ul>
          </p>
        </div>

        <section>
          <div className="block">
            <p className="text">
              <span className="first-character sc">I</span>{' '}
              <div className="text">НАШИ КЛИНЕРЫ</div>
            </p>

            <p className="margin-top-10">
              <div className="box-top">
                <div className="top-item">
                  <p className="img-item">
                    <img className="photo" src="/public/l.jpg" alt="" />
                  </p>
                  <p className="top-item-text">Лера</p>
                </div>

                <div className="top-item">
                  <p className="img-item">
                    <img className="photo" src="/public/a.jpg" alt="" />
                  </p>
                  <p className="top-item-text">Артем</p>
                </div>

                <div className="top-item">
                  <p className="img-item">
                    <img className="photo" src="/public/v.jpg" alt="" />
                  </p>
                  <p className="top-item-text">Влад</p>
                </div>

                <div className="top-item">
                  <p className="img-item">
                    <img className="photo" src="/public/r.jpg" alt="" />
                  </p>
                  <p className="top-item-text">Рома</p>
                </div>

                <div className="top-item">
                  <p className="img-item">
                    <img className="photo" src="/public/s.jpg" alt="" />
                  </p>
                  <p className="top-item-text">Сергей</p>
                </div>

                <div className="top-item">
                  <p className="img-item">
                    <img className="photo" src="/public/an.jpg" alt="" />
                  </p>
                  <p className="top-item-text">Антон</p>
                </div>
              </div>
            </p>
          </div>
        </section>

        <section className="footer">
          <p className="line-break "></p>
          <p className="margin-top-10"></p>
          <p className="margin-top-10">
            <div className="first-box">
              <p className="link-title">Clean Master</p>
              <Link className="footer-link" to="/cleaner">
                Cleaner
              </Link>
              <Link className="footer-link" to="/admin">
                Admin
              </Link>
              <a className="footer-footer" href="#">
                ссылка
              </a>
              <a className="link-footer" href="#">
                ссылка
              </a>
            </div>
          </p>
        </section>
      </div>
    </>
  );
};

export default Paralax;
