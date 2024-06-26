import { NavLink } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { useSelector } from 'react-redux'

import styles from './toolbar.module.scss'
import { State } from '../../store'
import { joinClasses } from '../../util'

const Toolbar: React.FC = () => {
    const authUser = useSelector((state: State) => state.auth.user)

    const navigations = [
        {
            path: '/',
            label: 'Booking',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <g clip-path="url(#clip0_230_945)">
                        <path d="M39.9887 16.5404C41.5369 16.5404 42.7918 15.2843 42.7918 13.736C42.7918 12.1878 41.5369 10.9329 39.9887 10.9329C38.4392 10.9329 37.1843 12.1878 37.1843 13.736C37.1843 15.2843 38.4392 16.5404 39.9887 16.5404Z" fill="#A9A9A9" />
                        <path d="M50.9502 30.5613H46.5158L46.9601 22.0862C47.1136 19.9166 45.5753 17.9575 43.3872 17.6333C42.2783 17.4699 41.1422 17.382 39.9887 17.382C38.1855 17.382 36.4331 17.5912 34.7499 17.9835C34.568 18.0256 34.4195 18.1518 34.3428 18.3176L29.0731 29.6058H31.9938L34.7735 24.799L35.1806 30.5613H9.01398V32.4721H35.3143L36.464 48.7874H39.5098V32.8013H40.4652V48.7874H43.5122L44.657 32.4721H50.9502V30.5613Z" fill="#A9A9A9" />
                        <path d="M19.9432 16.5404C21.4927 16.5404 22.7489 15.2843 22.7489 13.736C22.7489 12.1878 21.4927 10.9329 19.9432 10.9329C18.3962 10.9329 17.1401 12.1878 17.1401 13.736C17.1401 15.2843 18.3962 16.5404 19.9432 16.5404Z" fill="#A9A9A9" />
                        <path d="M16.254 21.804L17.1537 25.6999C16.3146 26.9017 15.6129 28.2086 15.0696 29.5934L24.8194 29.5946C24.2761 28.2085 23.5744 26.9016 22.7341 25.6987L23.6338 21.8039L25.1709 24.4672C25.4456 24.9425 25.9592 25.2643 26.5483 25.2643C27.1882 25.2643 27.7364 24.8855 27.9914 24.3435L30.2352 19.528H27.8491L26.7736 21.5514L25.0805 18.497C24.9989 18.3498 24.8652 18.2322 24.7031 18.1777C23.2118 17.6629 21.6103 17.382 19.9433 17.382C18.7279 17.382 17.5473 17.5329 16.4173 17.8139C14.8654 18.2 13.7639 19.4624 13.5015 20.9425L11.9681 29.6058H14.1735L16.254 21.804Z" fill="#A9A9A9" />
                        <circle cx="30.3" cy="29.7" r="28.5" stroke="#A9A9A9" stroke-width="3" />
                    </g>
                    <defs>
                        <clipPath id="clip0_230_945">
                            <rect width="60" height="60" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )
        },
        {
            path: '/bookings',
            label: 'All bookings',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path d="M30 20V30L36.25 36.25" stroke="#A9A9A9" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.8446 17.1765L8.96965 17.186C8.9748 18.2141 9.80703 19.0463 10.8352 19.0515L10.8446 17.1765ZM17.1991 19.0835C18.2346 19.0887 19.0783 18.2534 19.0835 17.2179C19.0887 16.1824 18.2534 15.3387 17.2179 15.3335L17.1991 19.0835ZM12.6876 10.8032C12.6824 9.7677 11.8387 8.93245 10.8032 8.93765C9.7677 8.94287 8.93245 9.78655 8.93767 10.8221L12.6876 10.8032ZM9.375 30C9.375 28.9645 8.53553 28.125 7.5 28.125C6.46448 28.125 5.625 28.9645 5.625 30H9.375ZM42.1888 51.113C43.0853 50.5945 43.3915 49.4475 42.873 48.551C42.3545 47.6548 41.2075 47.3482 40.3112 47.867L42.1888 51.113ZM47.867 40.3112C47.3482 41.2075 47.6548 42.3545 48.551 42.873C49.4475 43.3915 50.5945 43.0853 51.113 42.1888L47.867 40.3112ZM12.8508 12.6782C12.1149 13.4067 12.109 14.5939 12.8376 15.3298C13.5662 16.0656 14.7534 16.0715 15.4892 15.343L12.8508 12.6782ZM47.1558 12.8446C37.6053 3.29415 22.1721 3.19745 12.6848 12.6848L15.3364 15.3364C23.3342 7.33863 36.393 7.3851 44.5042 15.4963L47.1558 12.8446ZM12.6848 12.6848L9.5188 15.8507L12.1704 18.5023L15.3364 15.3364L12.6848 12.6848ZM10.8352 19.0515L17.1991 19.0835L17.2179 15.3335L10.854 15.3015L10.8352 19.0515ZM12.7196 17.1671L12.6876 10.8032L8.93767 10.8221L8.96965 17.186L12.7196 17.1671ZM30 9.375C41.3908 9.375 50.625 18.6091 50.625 30H54.375C54.375 16.538 43.462 5.625 30 5.625V9.375ZM30 50.625C18.6091 50.625 9.375 41.3908 9.375 30H5.625C5.625 43.462 16.538 54.375 30 54.375V50.625ZM40.3112 47.867C37.2795 49.6207 33.7598 50.625 30 50.625V54.375C34.4368 54.375 38.6017 53.188 42.1888 51.113L40.3112 47.867ZM50.625 30C50.625 33.7598 49.6207 37.2795 47.867 40.3112L51.113 42.1888C53.188 38.6017 54.375 34.4368 54.375 30H50.625ZM15.4892 15.343C19.2177 11.6515 24.3412 9.375 30 9.375V5.625C23.3135 5.625 17.2528 8.31977 12.8508 12.6782L15.4892 15.343Z" fill="#A9A9A9" />
                </svg>
            )
        }
    ]

    return (
        <div className={styles.toolbar}>
            <div className={styles.navigation}>
                {navigations.map(nav => {
                    return (
                        <NavLink
                            to={nav.path}
                            className={({ isActive }) => joinClasses(styles.navItem, isActive && styles.active)}
                            key={nav.path}
                        >
                            <div className={styles.icon}>
                                {nav.icon}
                            </div>
                            <div className={styles.label}>
                                {nav.label}
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <Menu as='div' className={styles.userSection}>
                <a href='http://localhost/wordpress/?p=142' target='_blank' className={styles.helpLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20 36.6667C29.2047 36.6667 36.6666 29.2048 36.6666 20C36.6666 10.7953 29.2047 3.33334 20 3.33334C10.7952 3.33334 3.33331 10.7953 3.33331 20C3.33331 29.2048 10.7952 36.6667 20 36.6667Z" stroke="#A9A9A9" stroke-width="2" />
                        <path d="M16.875 14.7917C16.875 13.0658 18.2742 11.6667 20 11.6667C21.7258 11.6667 23.125 13.0658 23.125 14.7917C23.125 15.9374 22.5083 16.9392 21.589 17.4832C20.7967 17.9518 20 18.6628 20 19.5833V21.6667" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" />
                        <path d="M20 28.3333C20.9205 28.3333 21.6666 27.5871 21.6666 26.6667C21.6666 25.7462 20.9205 25 20 25C19.0795 25 18.3333 25.7462 18.3333 26.6667C18.3333 27.5871 19.0795 28.3333 20 28.3333Z" fill="#A9A9A9" />
                    </svg>
                </a>
                <Menu.Button as='div' className={styles.label}>
                    <div className='dimmed'> Hi, {authUser?.name}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                        <path d="M22.12 11.06L16 17.1667L9.88 11.06L8 12.94L16 20.94L24 12.94L22.12 11.06Z" fill="#A9A9A9" />
                    </svg>
                </Menu.Button>
                <Menu.Items className={styles.profileMenu}>
                    <Menu.Item
                        as='button'
                        className={styles.item}
                        onClick={() => {
                            localStorage.removeItem('token')
                            window.location.assign('/')
                        }}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default Toolbar