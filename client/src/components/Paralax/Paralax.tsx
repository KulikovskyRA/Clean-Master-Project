import React from 'react';
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
          <div></div>
          <div className="title">
            <div className="title-item">Заказать уборку</div>
            <div className="title-item">О сервисе</div>
            <div className="title-item"> Личный кабинет</div>

            <h1></h1>
          </div>
        </section>

        <section>
          <div className="parallax-one">
            <h2>Clean Master </h2>
            <div className="sec-title">УБОРКА КВАРТИР В ТАШКЕНТЕ</div>
            <br />
            <div className="btn-box">
              <button className="btn-go">Заказать Уборку</button>
            </div>
          </div>
        </section>

        <section>
          <div className="block">
            <p className="text">
              <span className="first-character sc">I</span>{' '}
              <div className="text">ПОЧЕМУ СТОИТ ДОВЕРИТЬ УБОРКУ НАМ?</div>
            </p>
            <p className="line-break margin-top-10"></p>
            <p className="margin-top-10">
              <div className="box-top">
                <div className="top-item">
                  <p className="img-item">
                    <TeamOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">ОПЫТНЫЕ КЛИНЕРЫ</p>
                </div>
                <div className="top-item">
                  <p>
                    <SafetyOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">ГАРАНТИЯ КАЧЕСТВА</p>
                </div>
                <div className="top-item">
                  <p>
                    <DollarOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">ЧЕСТНАЯ ЦЕНА</p>
                </div>
                <div className="top-item">
                  <p>
                    <LikeOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">ОПЛАТА ПОСЛЕ УБОКИ</p>
                </div>
                <div className="top-item">
                  <p>
                    <UsergroupAddOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">ДОВЕРИЕ</p>
                </div>
                <div className="top-item">
                  <p>
                    <SmileOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">НАДЁЖНОСТЬ</p>
                </div>
                <div className="top-item">
                  <p>
                    <HeartOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">ЭКО СРЕДСТВА</p>
                </div>
                <div className="top-item">
                  <p>
                    <GiftOutlined
                      style={{ fontSize: '38px', color: 'rgb(228, 196, 56)' }}
                    />
                  </p>
                  <p className="top-item-text">СКИДКИ</p>
                </div>
              </div>
            </p>
          </div>
        </section>

        <section>
          <div className="parallax-two">
            <h2>ЗАНИМАЙТЕСЬ ЛЮБИМЫМ ДЕЛОМ, А УБОРКУ ДОВЕРЬТЕ НАМ</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p>
              <span className="first-character ny">I</span>{' '}
              <div className="text">Что входит в уборку?</div>
            </p>
          </div>
        </section>

        <section>
          <div className="parallax-three">
            <h2>Влажная уборка поверхностей и мытье пола</h2>
          </div>
        </section>
        <div className="block">
          <p>
            <span className="first-character ny">I</span>{' '}
            <div className="text">
              Прежде, чем приступить к выполнению заказа, клинеры выберут и
              согласуют с вами подходящие методы, а также средства для
              генеральной или экспресс-уборки. Мы применяем только
              сертифицированные препараты европейских марок.
            </div>
          </p>
        </div>
        <section>
          <div className="parallax-four">
            <h2>Чистка ковра и мебели</h2>
          </div>
        </section>
        <div className="block">
          <p>
            <span className="first-character ny">I</span>{' '}
            <div className="text">
              Подготовьте помещение к проведению работ. Перед прибытием CLEAN
              MASTER обеспечьте доступ к сети электропитания и к санузлу. Все
              необходимые материалы,оборудование и препараты специалисты
              привезут с собой.
            </div>
          </p>
        </div>

        <section>
          <div className="parallax-five">
            <h2>Уборка на кухне: помоем посуду, плиту и все поверхности</h2>
          </div>
        </section>

        <div className="block">
          <p>
            <span className="first-character ny">I</span>{' '}
            <div className="text">
              Персонал CLEAN MASTER будет работать, используя профессиональную
              технику, инвентарь, чистящие и моющие составы. Желательно, чтобы
              при этом не присутствовали маленькие дети и животные.
            </div>
          </p>
        </div>

        <section>
          <div className="parallax-six">
            <h2>Санузел: помоем и продезинфицируем сантехнику и зеркала</h2>
          </div>
        </section>

        <div className="block">
          <p>
            <span className="first-character ny">I</span>
            <div className="text">Сколько стоит уборка?</div>
            <ul>
              <li className="text1">Однокомнатная квартира: от 249 000 UZS</li>
              <li className="text1">Двухкомнатная квартира: от 299 000 UZS</li>
              <li className="text1">Трехкомнатная квартира: от 349 000 UZS</li>
            </ul>
            <div className="text">Дополнительные услуги</div>
            <ul>
              <li className="text1">Мытье окон: +25 000 UZS за одно окно</li>
              <li className="text1">Уборка балкона +30 000 UZS</li>
              <li className="text1">Помыть внутри холодильника +15 000 UZS</li>
              <li className="text1">Помыть духовку +15 000 UZS</li>
              <li className="text1">Помыть микроволновку +10 000 UZS</li>
              <li className="text1">Глажка: 40 000 UZS за час</li>
            </ul>
          </p>
        </div>

        <section>
          <div className="block">
            <p className="text">
              <span className="first-character sc">I</span>{' '}
              <div className="text">Наши Клинеры</div>
            </p>
            <p className="line-break margin-top-10"></p>
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
              <a className="link-footer" href="#">
                ссылка
              </a>
              <a className="link-footer" href="#">
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
