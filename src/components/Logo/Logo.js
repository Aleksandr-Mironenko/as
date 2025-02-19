import React from 'react'

import logo from './Logo.png'
import styles from './index.module.scss'

const Logo = () => {
  return (
    <header className={styles.logoG}>
      <img src={logo} alt="logo" />
    </header>
  )
}
export default Logo
