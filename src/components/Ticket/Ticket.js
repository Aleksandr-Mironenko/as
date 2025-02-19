import React from 'react'

import styles from './index.module.scss'

const Ticket = ({
  formatPrice,
  carrier,
  stopsThereString,
  stopsBackString,
  routeThere,
  routeBack,
  timeThere,
  timeBack,
  timeDurationThere,
  timeDurationBack,
  numberOfTransfersThere,
  numberOfTransfersBack,
}) => {
  return (
    <div className={styles.once}>
      <div className={styles.ticket}>
        <div className={styles.upper}>
          <div className={styles.price}>{formatPrice}</div>
          <img
            className={styles.logo}
            src={`https://images.daisycon.io/airline/?width=300&height=150&color=ffffff&iata=${carrier}`}
            alt="logoCompany"
          />
        </div>
        <div className={styles.lower}>
          <div className={styles.where}>
            <div className={styles.route}>
              <div className={styles.chapter}>{routeThere}</div>
              <div className={styles.text}>{timeThere} </div>
            </div>
            <div className={styles.lenght}>
              <div className={styles.chapter}>В ПУТИ</div>
              <div className={styles.text}>{timeDurationThere} </div>
            </div>
            <div className={styles.stops}>
              <div className={styles.chapter}>{numberOfTransfersThere}</div>
              <div className={styles.text}>{stopsThereString} </div>
            </div>
          </div>
          <div className={styles.back}>
            <div className={styles.route}>
              <div className={styles.chapter}>{routeBack} </div>
              <div className={styles.text}>{timeBack} </div>
            </div>
            <div className={styles.lenght}>
              <div className={styles.chapter}>В ПУТИ</div>
              <div className={styles.text}>{timeDurationBack} </div>
            </div>
            <div className={styles.stops}>
              <div className={styles.chapter}>{numberOfTransfersBack}</div>
              <div className={styles.text}>{stopsBackString} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
