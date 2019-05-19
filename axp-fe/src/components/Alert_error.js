import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const Error = (e, message) => {
    e.preventDefault();
    Alert.error(message, {
        position: 'top-right',
        effect: 'slide',
        beep: false,
        timeout: 5000,
        offset: 100
    });
}

export default Error;

