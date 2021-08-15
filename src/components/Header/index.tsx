
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.button}>
      <Link href="/">
        <img src="/images/logo.svg" alt="logo" />
      </Link>
    </div>
  );
}
