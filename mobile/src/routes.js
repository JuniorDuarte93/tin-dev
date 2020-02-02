import { createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from '../src/pages/Main'
import Login from '../src/pages/Login'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);
