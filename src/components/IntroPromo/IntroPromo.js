/**
 * IntroPromo Component.
 * Placeholder fot the description
 * @module IntroPromo
 */
import React from 'react';
import PropTypes from 'prop-types';
import IntroPromoCard from './IntroPromoCard';

import iconOnline from './icon-online.svg';
import iconReliability from './icon-reliability.svg';
import iconSpeed from './icon-speed.svg';

import './IntroPromo.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  //prop: PropTypes.string,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const IntroPromo = ({ ...props }) => {


  const data = [
    {
      svg: iconOnline,
      title: 'Зручність!',
      text: 'Цілком інтернет-магазин із усіма його принадами: структурованим каталогом, кошиком, онлайн-оплатою і, звісно, доставкою. Прямо до Ваших родичів! Не треба турбуватися ні про що. Ви замовляєте, ми доставляємо.',
    },
    {
      svg: iconReliability,
      title: 'Надійність!',
      text: 'Не економте на надійності. Економте надійно. У нас – ніяких поштових кораблів. Хоча компанія 48 Ukraine – на території США, пакунок формують і доставляють всередині України. Значно певніше, чи не так? І тарифи, звісно, теж найкращі в Україні.',
    },
    {
      svg: iconSpeed,
      title: 'Швидкість!',
      text: 'За який час корабель долає Атлантичний океан? А літак? А тепло Вашого серця? Ми максимально наближаємося до швидкості доброї думки, доставляючи її втілення як найшвидше – від 48 годин.',
    },
  ];

  return (
    <div className="IntroPromo">
      <div className="IntroPromo__title">Заощаджуйте з нами! Ми гарантуємо до 50% економії !</div>
      {
        data.map(d => (
          <div className="IntroPromo__card" key={d.title}>
            <IntroPromoCard
              svg={d.svg}
              title={d.title}
              text={d.text}
            />
          </div>
        ))
      }
    </div>
  );
};

IntroPromo.propTypes = propTypes;
IntroPromo.defaultProps = defaultProps;

export default IntroPromo;
