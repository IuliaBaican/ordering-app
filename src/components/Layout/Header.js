import { Fragment } from 'react'
import classes from './Header.module.css';
import foodImage from '../../assets/food.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1> ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={foodImage} alt='a table full of delicious food' />
        </div>
    </Fragment>
};

export default Header;
